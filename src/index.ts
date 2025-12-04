export function parseTitle(html: string): string {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.title ?? '';
}

if (require.main === module) {
  const title = parseTitle('<html><head><title>Hello TS</title></head></html>');
  console.log(`Parsed title: ${title}`);
}
