import fs from "fs";
import path from "path";
import OrigType from "./OrigType";

export function loadTsconfig(dir: string) {
  const tsconfigPath = path.join(dir, "tsconfig.json");
  const txt = fs.readFileSync(tsconfigPath, "utf8");
  const tsconfig = JSON.parse(txt);

  return tsconfig;
}

const fromPattern = /^from "(.*)"$/;
const requirePattern = /^require\("(.*)"\)$/;

export function isRequireType(url: string): boolean {
  return requirePattern.test(url);
}

export function isFromType(url: string): boolean {
  return fromPattern.test(url);
}

export function getOrigType(url: string): OrigType | undefined {
  if (isRequireType(url))
    return OrigType.REQUIRE;

  if (isFromType(url))
    return OrigType.FROM;

  return undefined;
}

export function getOnlyUrl(url: string, origType: OrigType): string {
  if (origType === OrigType.FROM)
    return url.replace(fromPattern, "$1");

  if (origType === OrigType.REQUIRE)
    return url.replace(requirePattern, "$1");

  throw new Error(`Unknown origType: ${origType}`);
}


export function makeString(url: string, origType: OrigType): string {
  switch (origType) {
    case OrigType.REQUIRE:
      return `require("${url}")`;
    case OrigType.FROM:
      return `from "${url}"`;
    default: return "";
  }
}