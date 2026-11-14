"use client";
import { usePathname } from "next/navigation";

/** The failed request, shown like a log line: `GET /path → 404 Not Found`. */
export function RequestLine() {
  const pathname = usePathname() ?? "/";

  return (
    <p className="max-w-full px-4 py-2 font-mono text-xs border rounded-md sm:text-sm text-zinc-400 border-zinc-800 bg-zinc-900/50 break-all">
      <span className="text-zinc-500">GET</span>{" "}
      <span className="text-zinc-200">{pathname}</span>{" "}
      <span className="text-zinc-600">→</span>{" "}
      <span className="text-red-400">404 Not Found</span>
    </p>
  );
}
