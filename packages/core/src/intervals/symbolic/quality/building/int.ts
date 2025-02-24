import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import Quality from "../Quality";

export default function int2Quality(int: number, isMain: boolean): Quality | null {
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
