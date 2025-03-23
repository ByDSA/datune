import type { Scale } from "@datune/core/scales/chromatic";
import { Scales as S } from "@datune/core";
import { Options } from "lang";
import { stringifyScale } from "strings/scales/chromatic";
import { normalizeInputName } from "../normalizeNameInput";

export function parseFromName(input: string, options?: Options): Scale | null {
  const normalizedInput = normalizeInputName(input);

  return parseRaw(normalizedInput, options);
}

function parseRaw(str: string, options?: Options): Scale | null {
  switch (str) {
    case "":
    case stringifyScale(S.MAJOR, options).toLowerCase(): return S.MAJOR;
    case "m":
    case stringifyScale(S.MINOR, options).toLowerCase(): return S.MINOR;
    case stringifyScale(S.DORIAN, options).toLowerCase(): return S.DORIAN;
    case stringifyScale(S.PHRYGIAN, options).toLowerCase(): return S.PHRYGIAN;
    case stringifyScale(S.LYDIAN, options).toLowerCase(): return S.LYDIAN;
    case stringifyScale(S.MIXOLYDIAN, options).toLowerCase(): return S.MIXOLYDIAN;
    case stringifyScale(S.LOCRIAN, options).toLowerCase(): return S.LOCRIAN;
    default:
      for (const scale of S.COMMON) {
        const name = stringifyScale(scale, options);

        if (name !== null && str === normalizeInputName(name))
          return scale;
      }
  }

  return null;
}
