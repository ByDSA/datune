import { Options } from "lang";
import { COMMON, DORIAN, LOCRIAN, LYDIAN, MAJOR, MINOR, MIXOLYDIAN, PHRYGIAN, Scale } from "scales/chromatic";
import stringify from "strings/scales/chromatic";
import normalizeInputName from "../normalizeNameInput";

export default function parse(input: string, options?: Options): Scale | null {
  const normalizedInput = normalizeInputName(input);

  return parseRaw(normalizedInput, options);
}

function parseRaw(str: string, options?: Options): Scale | null {
  switch (str) {
    case "":
    case stringify(MAJOR, options).toLowerCase(): return MAJOR;
    case "m":
    case stringify(MINOR, options).toLowerCase(): return MINOR;
    case stringify(DORIAN, options).toLowerCase(): return DORIAN;
    case stringify(PHRYGIAN, options).toLowerCase(): return PHRYGIAN;
    case stringify(LYDIAN, options).toLowerCase(): return LYDIAN;
    case stringify(MIXOLYDIAN, options).toLowerCase(): return MIXOLYDIAN;
    case stringify(LOCRIAN, options).toLowerCase(): return LOCRIAN;
    default:
      for (const scale of COMMON) {
        const name = stringify(scale, options);

        if (name !== null && str === normalizeInputName(name))
          return scale;
      }
  }

  return null;
}
