import { Scale } from "@datune/core/scales/alt";
import { COMMON, DORIAN, LOCRIAN, LYDIAN, MAJOR, MINOR, MIXOLYDIAN, PHRYGIAN } from "@datune/core/scales/symbolic/alt/constants";
import { Options } from "lang";
import { stringifyScale } from "strings/scales/alt";
import { normalizeInputName } from "../normalizeNameInput";

export function parseFromName(input: string, options?: Options): Scale | null {
  const normalizedInput = normalizeInputName(input);

  return parseRaw(normalizedInput, options);
}

function parseRaw(str: string, options?: Options): Scale | null {
  switch (str) {
    case "":
    case stringifyScale(MAJOR, options).toLowerCase(): return MAJOR;
    case "m":
    case stringifyScale(MINOR, options).toLowerCase(): return MINOR;
    case stringifyScale(DORIAN, options).toLowerCase(): return DORIAN;
    case stringifyScale(PHRYGIAN, options).toLowerCase(): return PHRYGIAN;
    case stringifyScale(LYDIAN, options).toLowerCase(): return LYDIAN;
    case stringifyScale(MIXOLYDIAN, options).toLowerCase(): return MIXOLYDIAN;
    case stringifyScale(LOCRIAN, options).toLowerCase(): return LOCRIAN;
    default:
      for (const scale of COMMON) {
        const name = stringifyScale(scale, options);

        if (name !== null && str === normalizeInputName(name))
          return scale;
      }
  }

  return null;
}
