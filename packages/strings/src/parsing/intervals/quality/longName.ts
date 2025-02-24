import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT, Quality } from "@datune/core/intervals/quality";
import { Options } from "lang";
import stringify from "strings/intervals/quality";

export default function f(str: string, options?: Options): Quality | null {
  switch (str) {
    case stringify(MAJOR, options):
      return MAJOR;
    case stringify(MINOR, options):
      return MINOR;
    case stringify(PERFECT, options):
      return PERFECT;
    case stringify(DIMINISHED, options):
      return DIMINISHED;
    case stringify(AUGMENTED, options):
      return AUGMENTED;
    case stringify(DOUBLY_AUGMENTED, options):
      return DOUBLY_AUGMENTED;
    case stringify(DOUBLY_DIMINISHED, options):
      return DOUBLY_DIMINISHED;
    default: return null;
  }
}
