import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const hasRedisEnv = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);
const redis = hasRedisEnv ? Redis.fromEnv() : null;

export const config = {
  runtime: "edge",
};

const namespaces = ["projects", "blogs"] as const;
type Namespace = (typeof namespaces)[number];

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  // View counting is optional: without Redis configured, do nothing quietly.
  if (!redis) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await req.json();
  const slug: string | undefined =
    typeof body?.slug === "string" ? body.slug : undefined;
  const namespace: Namespace = namespaces.includes(body?.namespace)
    ? body.namespace
    : "projects";

  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  if (req.nextUrl.hostname === "localhost") {
    return new NextResponse(null, { status: 200 });
  }

  try {
    const ip = req.ip;
    if (ip) {
      // Hash the IP in order to not store it directly in your db.
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip),
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // deduplicate the ip for each slug
      const isNew = await redis.set(
        ["deduplicate", hash, namespace, slug].join(":"),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        },
      );
      if (!isNew) {
        return new NextResponse(null, { status: 202 });
      }
    }

    await redis.incr(["pageviews", namespace, slug].join(":"));
  } catch (error) {
    console.error("failed to increment view count", error);
  }

  return new NextResponse(null, { status: 204 });
}
