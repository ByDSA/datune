import { HarmonicFunction, V7ALT } from "functions/chromatic";

export default function stringify(obj: HarmonicFunction): string {
  switch (obj) {
    case V7ALT: return "V7Alt";
    default: return String(obj);
  }
}
