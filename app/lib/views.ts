import { Redis } from "@upstash/redis";

/**
 * Redis is optional. When the Upstash env vars are missing (or the call fails)
 * view counts fall back to 0 instead of throwing — a page must never fail to
 * render because an analytics counter is unavailable.
 */
const hasRedisEnv = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

export const redis = hasRedisEnv
  ? Redis.fromEnv({ retry: { retries: 1, backoff: () => 50 } })
  : null;

/**
 * An unreachable Redis would otherwise hold the response open for seconds
 * while the client retries, which wrecks LCP. A view count is not worth
 * delaying HTML for: give up quickly and render zeros.
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

export async function getViews(
  namespace: ViewNamespace,
  slugs: string[],
): Promise<Record<string, number>> {
  const empty: Record<string, number> = {};
  if (!redis || slugs.length === 0) return empty;

  const read = async () => {
    try {
      const values = await redis.mget<number[]>(
        ...slugs.map((slug) => ["pageviews", namespace, slug].join(":")),
      );
      return slugs.reduce((acc, slug, i) => {
        acc[slug] = values?.[i] ?? 0;
        return acc;
      }, {} as Record<string, number>);
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
  if (!redis) return 0;

  const read = async () => {
    try {
      return (
        (await redis.get<number>(["pageviews", namespace, slug].join(":"))) ?? 0
      );
    } catch (error) {
      console.error("failed to read view count", error);
      return 0;
    }
  };

  return withTimeout(read(), 0);
}
