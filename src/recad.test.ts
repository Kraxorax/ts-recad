import { parseRecadXml, recadToXml } from "./parser";
import { globRecadUrls, loadRecadFile } from "./util";

const recadFixtures = globRecadUrls()

/**
 * Very simple XML normalizer for testing.
 * Removes insignificant whitespace between tags and collapses spaces.
 * For real work you might want a proper XML canonicalizer,
 * but this is enough to assert logical equivalence.
 */
function normalizeXml(xml: string): string {
  return xml
    .trim()
    // remove newlines and indentation between tags
    .replace(/>\s+</g, "><")
    // collapse runs of whitespace into a single space
    .replace(/\s+/g, " ");
}

describe("Recad XML <-> TS round-trip", () => {
  test("round-trips all recad fixtures in src/recads", async () => {
    const entries = Object.entries(recadFixtures);
    expect(entries.length).toBeGreaterThan(0);

    for (const [path, url] of Object.entries(recadFixtures)) {
      const xml = await loadRecadFile(url);
      try {
        const parsed = parseRecadXml(xml);
        const reserialized = recadToXml(parsed);

        expect(normalizeXml(reserialized)).toBe(normalizeXml(xml));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Fixture ${path}: ${message}`);
      }
    }
  });

  test("handles text nodes and preserves them", () => {
    const xmlWithText = `<?xml version="1.0"?>
      <RecadProject>
        <Meta>Some descriptive text here.</Meta>
      </RecadProject>
    `;

    const doc = parseRecadXml(xmlWithText);
    const reserialized = recadToXml(doc);

    const originalNorm = normalizeXml(xmlWithText);
    const roundTripNorm = normalizeXml(reserialized);

    expect(roundTripNorm).toBe(originalNorm);
  });
});
