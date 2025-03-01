import { Quality } from "@datune/core/intervals/quality";
import { parseLongName } from "./longName";
import { parseShortName } from "./shortName";
import { Options } from "lang";

export function parseQuality(input: string, options?: Options): Quality | null {
  let quality: Quality | null;

  quality = parseLongName(input, options);

  if (quality)
    return quality;

  quality = parseShortName(input);

  return quality;
}
