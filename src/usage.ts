import path from "node:path";
import { parseRecadXml, RecadElementNode, RecadNode, RecadTextNode } from "./parser";
import { loadRecadFile } from "./util";
import { RecadElementType, RecadRoot, WallType } from './recadTypes';
import { RecadTypeMap } from "./RecadTypeMap";


const main = async () => {
  const recadPath = path.join(__dirname, "recads", "response.recad");
  const recadString = await loadRecadFile(recadPath);
  const parsed = parseRecadXml(recadString);

  const typed = assignTypes(parsed.root)

  // console.log(parsed.root);

  console.log('typed -', typed)
};


const isRecadElementNode = (x: unknown): x is RecadElementNode => {
  return !!(x as RecadElementNode).children
}


export function foldTree(
  node: RecadNode,
  handlers: {
    N: (node: RecadElementNode, children: RecadElementType[]) => RecadElementType;
    L: (node: RecadTextNode, children: RecadElementType[]) => RecadElementType;
  }
): RecadElementType {
  if (isRecadElementNode(node)) {
    const mappedChildren = node.children.map((child) =>
      foldTree(child, handlers)
    );
    return handlers.N(node, mappedChildren);
  }
  return handlers.L(node, []);
}


const assignTypes = (root: RecadElementNode) => {
  const something = foldTree(root, {
    N: (n, cs): RecadElementType => {
      console.log('N', n, cs)

      switch (n.tag) {
        case 'Version':
          return { version: cs[0] }
        default:
          return { wtf: cs }
      }

    },
    L: (n, cs): RecadElementType => {
      console.log('L', n)
      return n.content
    }
  });

  console.log(something)

  return something
}


main();
