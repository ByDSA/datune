import type { Quality } from "@datune/core/intervals/symbolic/alt/quality/Quality";
import { a as AUGMENTED, d as DIMINISHED, da as DOUBLY_AUGMENTED, dd as DOUBLY_DIMINISHED, M as MAJOR, m as MINOR, P as PERFECT } from "@datune/core/intervals/symbolic/alt/quality/constants";
import { getLangFromOptions, Options } from "lang";
import { toPascalCase } from "parsing/utils";

export function stringifyQuality(obj: Quality, options?: Options): string {
  const name = getName(obj, options);

  if (name)
    return toPascalCase(name);

  return "[Quality]";
}

function getName(obj: Quality, options?: Options) {
  const lang = getLangFromOptions(options);

  switch (obj) {
    case MAJOR: return lang.quality.major;
    case MINOR: return lang.quality.minor;
    case PERFECT: return lang.quality.perfect;
    case DIMINISHED: return lang.quality.diminished;
    case AUGMENTED: return lang.quality.augmented;
    case DOUBLY_AUGMENTED: return lang.quality.doublyAugmented;
    case DOUBLY_DIMINISHED: return lang.quality.doublyDiminished;
    default: return "[Quality]";
  }
}
