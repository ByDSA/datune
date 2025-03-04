import type { Quality } from "@datune/core/intervals/symbolic/alt/quality/Quality";
import { Options } from "lang";
import { parseLongName } from "./longName";
import { parseShortName } from "./shortName";

export function parseQuality(input: string, options?: Options): Quality | null {
  let quality: Quality | null;

  quality = parseLongName(input, options);

  if (quality)
    return quality;

  quality = parseShortName(input);

  return quality;
}
