import path from "node:path";
import { parseRecadXml } from "./parser";
import { loadRecadFile } from "./util";

const main = async () => {
  const recadPath = path.join(__dirname, "recads", "response.recad");
  const recadString = await loadRecadFile(recadPath);
  const parsed = parseRecadXml(recadString);

  console.log(parsed);
};

main();