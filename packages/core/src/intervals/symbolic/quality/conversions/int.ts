import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "../constants";
import Quality from "../Quality";

export default function toInt(quality: Quality, isMain: boolean): number | null {
  if (isMain) {
    switch (quality) {
      case PERFECT: return 0;
      case DIMINISHED: return -1;
      case AUGMENTED: return 1;
      case DOUBLY_DIMINISHED: return -2;
      case DOUBLY_AUGMENTED: return 2;
      default: return null;
    }
  }

  switch (quality) {
    case MAJOR: return 0;
    case MINOR: return -1;
    case AUGMENTED: return 1;
    case DIMINISHED: return -2;
    case DOUBLY_DIMINISHED: return -3;
    case DOUBLY_AUGMENTED: return 2;
    default: return null;
  }
}
