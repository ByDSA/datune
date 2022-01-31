import path from "path";
import Params from "./Params";
import { loadTsconfig, makeString } from "./utils";

export default function replaceAlias({url, origType, file, config}: Params): string | null {

  const tsconfig = loadTsconfig(config.configDir);
  const tsconfigPaths = tsconfig.compilerOptions.paths;

  if (!tsconfigPaths)
    return null;
  const paths = Object.entries(tsconfigPaths);

  for (const p of paths) {
    const keyRegex = new RegExp(`^${p[0]}`);
    const valueRaw = ((p[1] as string[])[0] as string);
    const value = valueRaw.replace(/\*$/, "");

    if (keyRegex.test(url)) {
      const baseUrl = config.outPath;
      const fileFolder = path.dirname(file);
      const relativeToDist = path.relative(fileFolder, baseUrl);
      const fullRelativePath = path.join(
        relativeToDist,
        url.replace(keyRegex, value),
      );

      return makeString(fullRelativePath, origType);
    }
  }

  return null;
}