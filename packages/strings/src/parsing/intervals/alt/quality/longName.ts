import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "@datune/core/intervals/symbolic/alt/quality/constants";
import type { Quality } from "@datune/core/intervals/symbolic/alt/quality/Quality";
import { Options } from "lang";
import { stringifyQuality } from "strings/intervals/alt/quality";

export function parseLongName(str: string, options?: Options): Quality | null {
  switch (str) {
    case stringifyQuality(MAJOR, options):
      return MAJOR;
    case stringifyQuality(MINOR, options):
      return MINOR;
    case stringifyQuality(PERFECT, options):
      return PERFECT;
    case stringifyQuality(DIMINISHED, options):
      return DIMINISHED;
    case stringifyQuality(AUGMENTED, options):
      return AUGMENTED;
    case stringifyQuality(DOUBLY_AUGMENTED, options):
      return DOUBLY_AUGMENTED;
    case stringifyQuality(DOUBLY_DIMINISHED, options):
      return DOUBLY_DIMINISHED;
    default: return null;
  }
}
