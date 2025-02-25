import { Quality } from "@datune/core/intervals/quality";
import { Options } from "lang";
import longName from "./longName";
import shortName from "./shortName";

export default function f(input: string, options?: Options): Quality | null {
  let quality: Quality | null;

  quality = longName(input, options);

  if (quality)
    return quality;

  quality = shortName(input);

  return quality;
}
