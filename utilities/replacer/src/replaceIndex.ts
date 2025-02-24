import Params from "./Params";
import { makeString } from "./utils";

export default function replaceIndex({url, origType}: Params): string | null {
  if (url === "." || url === "..")
    return makeString(`${url}/index.js`, origType);

  if (url === "./" || url === "../")
    return makeString(`${url}index.js`, origType);

  return null;
}
