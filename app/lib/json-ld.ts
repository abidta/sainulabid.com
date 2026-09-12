const HTML_ESCAPES: Record<string, string> = {
  "<": String.raw`\u003c`,
  ">": String.raw`\u003e`,
  "&": String.raw`\u0026`,
};

/**
 * Serialize a JSON-LD object for embedding in a <script> tag.
 *
 * JSON.stringify does not escape "<", so any string value containing
 * "</script>" would close the tag early and let the rest of the value be
 * parsed as HTML. Escaping the three HTML-significant characters keeps the
 * JSON valid and makes the breakout impossible regardless of where the
 * content came from.
 */
export const jsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/[<>&]/g, (char) => HTML_ESCAPES[char]);
