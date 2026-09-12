import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Load the display font used by the generated icon and OG card.
 *
 * This MUST stay lazy. Next imports the icon/opengraph-image modules while
 * resolving metadata for every page, so a module-scope read runs inside the
 * serverless function at request time — where public/ is not bundled, and the
 * ENOENT takes the whole page down with a 500. Reading inside the handler keeps
 * the filesystem access on the build-time path that actually generates the
 * image, and the fallback keeps a missing file from ever being fatal.
 */
export function loadDisplayFont(): ArrayBuffer | null {
  try {
    const file = readFileSync(
      join(process.cwd(), "public/fonts/CalSans-SemiBold.ttf"),
    );
    return Uint8Array.from(file).buffer;
  } catch (error) {
    console.error("display font unavailable, falling back to default", error);
    return null;
  }
}

export const displayFontName = "Cal Sans";

export const fontOptions = (data: ArrayBuffer | null) =>
  data
    ? [{ name: displayFontName, data, style: "normal" as const }]
    : undefined;
