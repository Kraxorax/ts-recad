
import fs from "node:fs";
import { promises as fsp } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { TextDecoder } from 'node:util'

function stripBom(xml: string): string {
  return xml.replace(/^\uFEFF/, "");
}

function decodeRecadBuffer(buffer: ArrayBuffer | Buffer): string {
  // Buffer extends Uint8Array; normalize to a view we can inspect.
  const bytes =
    buffer instanceof ArrayBuffer
      ? new Uint8Array(buffer)
      : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  if (bytes.length >= 2) {
    // Detect UTF-16 BOM so UTF-16 fixture files round-trip correctly.
    const [b0, b1] = bytes;
    if (b0 === 0xff && b1 === 0xfe) {
      return stripBom(new TextDecoder("utf-16le").decode(buffer));
    }
    if (b0 === 0xfe && b1 === 0xff) {
      return stripBom(new TextDecoder("utf-16be").decode(buffer));
    }
  }

  return stripBom(new TextDecoder("utf-8").decode(buffer));
}

/**
 * Replacement for Vite's import.meta.glob("./recads/*.recad", { as: "url", eager: true }).
 * Returns a map of relative paths (e.g. "./recads/foo.recad") to file:// URLs.
 */
export function globRecadUrls(
  baseDir = path.join(__dirname, "recads")
): Record<string, string> {
  const fixtures: Record<string, string> = {};

  if (!fs.existsSync(baseDir)) {
    return fixtures;
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".recad")) continue;

    const filePath = path.join(baseDir, entry.name);
    const relativeToModule = path
      .relative(__dirname, filePath)
      .split(path.sep)
      .join("/");
    const relPath = `./${relativeToModule}`;
    fixtures[relPath] = pathToFileURL(filePath).toString();
  }

  return fixtures;
}

export async function loadRecadFile(url: string): Promise<string> {
  // Prefer file reads when given file:// URLs or bare paths so tests can run without a bundler.
  if (url.startsWith("file://")) {
    const filePath = fileURLToPath(url);
    const buffer = await fsp.readFile(filePath);
    return decodeRecadBuffer(buffer);
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    const resolvedPath = path.isAbsolute(url)
      ? url
      : path.resolve(process.cwd(), url);
    const buffer = await fsp.readFile(resolvedPath);
    return decodeRecadBuffer(buffer);
  }

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return decodeRecadBuffer(buffer);
}
