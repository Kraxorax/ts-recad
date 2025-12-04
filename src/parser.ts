export interface RecadTextNode {
  type: "text";
  content: string;
}

export interface RecadElementNode {
  type: "element";
  tag: string;
  attributes: Record<string, string>;
  children: RecadNode[];
}

export type RecadNode = RecadTextNode | RecadElementNode;

export interface RecadDeclaration {
  version: string;
  encoding?: string;
  standalone?: string;
}

export interface RecadDocument {
  declaration?: RecadDeclaration;
  root: RecadElementNode;
}

/**
 * Parse the XML declaration (<?xml ...?>) if present.
 * This is optional but useful if you want to preserve it.
 */
function parseXmlDeclaration(xml: string): { decl?: RecadDeclaration; body: string } {
  const declMatch = xml.match(/^<\?xml\s+([^?>]+)\?>/i);
  if (!declMatch) {
    return { body: xml };
  }

  const attrsPart = declMatch[1];
  const attrs: Record<string, string> = {};
  const attrRegex = /(\w+)\s*=\s*"(.*?)"/g;
  let m: RegExpExecArray | null;
  while ((m = attrRegex.exec(attrsPart))) {
    attrs[m[1]] = m[2];
  }

  const decl: RecadDeclaration = {
    version: attrs["version"] ?? "1.0",
    encoding: attrs["encoding"],
    standalone: attrs["standalone"],
  };

  const body = xml.slice(declMatch[0].length);
  return { decl, body };
}

/**
 * Convert a DOM Element to our RecadElementNode recursively.
 * Keeps ALL attributes and ALL child nodes (elements + text).
 */
function elementToRecadNode(el: Element): RecadElementNode {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes.item(i)!;
    attrs[attr.name] = attr.value;
  }

  const children: RecadNode[] = [];
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes.item(i);
    if (child.nodeType === Node.ELEMENT_NODE) {
      children.push(elementToRecadNode(child as Element));
    } else if (
      child.nodeType === Node.TEXT_NODE ||
      child.nodeType === Node.CDATA_SECTION_NODE
    ) {
      const val = child.nodeValue ? child.nodeValue.trim() : ""
      const text = val ?? "";
      if (text.length > 0) {
        children.push({ type: "text", content: text });
      }
    }
  }

  return {
    type: "element",
    tag: el.tagName,
    attributes: attrs,
    children,
  };
}

/**
 * Parse Recad XML into a RecadDocument tree.
 * Browser: uses DOMParser. In Node, use jsdom/@xmldom or run tests in jsdom env.
 */
export function parseRecadXml(xml: string): RecadDocument {
  const { decl, body } = parseXmlDeclaration(xml.trim());

  if (typeof DOMParser === "undefined") {
    throw new Error(
      "DOMParser is not available. In Node, use a DOM implementation like jsdom or @xmldom/xmldom and expose DOMParser globally."
    );
  }

  const parser = new DOMParser();
  const dom = parser.parseFromString(body, "application/xml");

  // crude error check
  const parserError = dom.getElementsByTagName("parsererror")[0];
  if (parserError) {
    throw new Error("Invalid XML: " + parserError.textContent);
  }

  const rootEl = dom.documentElement;
  const rootNode = elementToRecadNode(rootEl);

  return {
    declaration: decl,
    root: rootNode,
  };
}

/**
 * Escape characters in attribute values.
 */
function escapeAttributeValue(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escape characters in text nodes.
 */
function escapeTextContent(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Convert our RecadElementNode back to XML string.
 * This will produce canonical, but not necessarily byte-identical, XML.
 */
function elementToXml(node: RecadElementNode): string {
  const attrs = Object.entries(node.attributes)
    .map(([k, v]) => ` ${k}="${escapeAttributeValue(v)}"`)
    .join("");

  if (node.children.length === 0) {
    return `<${node.tag}${attrs}/>`;
  }

  const childrenXml = node.children
    .map((child) => {
      if (child.type === "text") {
        return escapeTextContent(child.content);
      }
      return elementToXml(child);
    })
    .join("");

  return `<${node.tag}${attrs}>${childrenXml}</${node.tag}>`;
}

/**
 * Serialize a RecadDocument back to XML string.
 */
export function recadToXml(doc: RecadDocument): string {
  const decl = doc.declaration
    ? `<?xml version="${doc.declaration.version}"` +
    (doc.declaration.encoding ? ` encoding="${doc.declaration.encoding}"` : "") +
    (doc.declaration.standalone ? ` standalone="${doc.declaration.standalone}"` : "") +
    "?>"
    : "";

  const rootXml = elementToXml(doc.root);
  return decl ? `${decl}\n${rootXml}` : rootXml;
}
