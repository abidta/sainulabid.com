/**
 * Read-side view counts.
 *
 * Reads go straight to the Upstash REST API with a plain GET `fetch` instead
 * of the @upstash/redis client. The client sends every request with
 * `cache: "no-store"`, which turns any page that renders a view count into a
 * fully dynamic page: no CDN cache, a cold function on every request. A GET
 * with `next.revalidate` lands in Next's data cache instead, so the pages stay
 * static and refresh their counts in the background (ISR).
 *
 * Writes (the per-visit increment) still go through pages/api/incr.ts.
 *
 * Redis is optional. When the Upstash env vars are missing, or a read fails or
 * is slow, view counts fall back to 0 — a page must never fail to render
 * because an analytics counter is unavailable.
 */
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

/** How long a cached count may be served before it is refreshed. */
const VIEW_REVALIDATE_SECONDS = 60;

/**
 * An unreachable Redis would otherwise hold the response open for seconds,
 * which wrecks LCP. A view count is not worth delaying HTML for: give up
 * quickly and render zeros.
 */
const VIEW_TIMEOUT_MS = 400;

async function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), VIEW_TIMEOUT_MS);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export type ViewNamespace = "projects" | "blogs";

const viewKey = (namespace: ViewNamespace, slug: string) =>
  ["pageviews", namespace, slug].join(":");

/** Run a read-only Redis command over the REST API, cached by Next. */
async function redisGet<T>(command: string, args: string[]): Promise<T> {
  const path = [command, ...args].map(encodeURIComponent).join("/");
  const res = await fetch(`${REDIS_URL}/${path}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    next: { revalidate: VIEW_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`upstash ${command} failed: ${res.status}`);
  }
  const body = (await res.json()) as { result: T };
  return body.result;
}

/** Redis returns counters as strings ("12"); missing keys as null. */
const toCount = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN);

export async function getViews(
  namespace: ViewNamespace,
  slugs: string[],
): Promise<Record<string, number>> {
  const empty: Record<string, number> = {};
  if (!hasRedis || slugs.length === 0) return empty;

  const read = async () => {
    try {
      const values = await redisGet<unknown[]>(
        "mget",
        slugs.map((slug) => viewKey(namespace, slug)),
      );
      return slugs.reduce(
        (acc, slug, i) => {
          acc[slug] = toCount(values?.[i]);
          return acc;
        },
        {} as Record<string, number>,
      );
    } catch (error) {
      console.error("failed to read view counts", error);
      return empty;
    }
  };

  return withTimeout(read(), empty);
}

export async function getView(
  namespace: ViewNamespace,
  slug: string,
): Promise<number> {
  if (!hasRedis) return 0;

  const read = async () => {
    try {
      return toCount(
        await redisGet<unknown>("get", [viewKey(namespace, slug)]),
      );
    } catch (error) {
      console.error("failed to read view count", error);
      return 0;
    }
  };

  return withTimeout(read(), 0);
}
