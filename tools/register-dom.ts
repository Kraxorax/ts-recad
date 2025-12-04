import { JSDOM } from 'jsdom';

// Ensure DOMParser exists in Node environments (ts-node / Jest watch runs).
if (typeof DOMParser === 'undefined') {
  const { window } = new JSDOM();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore DOMParser is provided by the DOM lib at compile time
  global.DOMParser = window.DOMParser;
  global.Node = window.Node
  global.TextDecoder = window.TextDecoder
}

export { };
