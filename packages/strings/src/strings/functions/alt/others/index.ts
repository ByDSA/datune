import { HarmonicFunction, V7ALT } from "functions/alt";

export default function stringify(obj: HarmonicFunction): string {
  switch (obj) {
    case V7ALT: return "V7Alt";
    default: return "undefined name";
  }
}
