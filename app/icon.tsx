import { brandIcon } from "./lib/brand-icon";

// Google Search shows a site's favicon next to its results. Its guidelines
// ask for a square icon, larger than 48x48; 192 is a multiple of 48, which
// older versions of the guideline required.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return brandIcon(size.width);
}
