import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT, Quality } from "@datune/core/intervals/quality";

export default function f(str: string): Quality | null {
  switch (str) {
    case MAJOR.toString():
      return MAJOR;
    case MINOR.toString():
      return MINOR;
    case PERFECT.toString():
      return PERFECT;
    case DIMINISHED.toString():
      return DIMINISHED;
    case AUGMENTED.toString():
      return AUGMENTED;
    case DOUBLY_AUGMENTED.toString():
      return DOUBLY_AUGMENTED;
    case DOUBLY_DIMINISHED.toString():
      return DOUBLY_DIMINISHED;
    default: return null;
  }
}
