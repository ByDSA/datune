import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import type { Quality } from "../Quality";

export function fromInt(int: number, isMain: boolean): Quality | null {
  if (isMain) {
    switch (int) {
      case 0: return PERFECT;
      case 1: return AUGMENTED;
      case -1: return DIMINISHED;
      case 2: return DOUBLY_AUGMENTED;
      case -2: return DOUBLY_DIMINISHED;
      default: return null;
    }
  }

  switch (int) {
    case 0: return MAJOR;
    case -1: return MINOR;
    case 1: return AUGMENTED;
    case -2: return DIMINISHED;
    case 2: return DOUBLY_AUGMENTED;
    case -3: return DOUBLY_DIMINISHED;
    default: return null;
  }
}
