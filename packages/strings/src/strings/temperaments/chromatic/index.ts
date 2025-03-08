import { Temperament, Temperaments as TE } from "@datune/core/temperaments/chromatic";
import { Options, getLangFromOptions } from "lang/Options";

export function stringifyTemperament(obj: Temperament, options?: Options): string {
  if (!obj)
    throw new Error("Temperament is undefined");

  const lang = getLangFromOptions(options);
  const { ET12, LIMIT_5_SYMMETRIC_N1, LIMIT_5_SYMMETRIC_N2, PYTHAGOREAN } = TE;

  switch (obj) {
    case ET12: return lang.temperaments.ET12;
    case LIMIT_5_SYMMETRIC_N1: return lang.temperaments.LIMIT_5_SYMMETRIC_N1;
    case LIMIT_5_SYMMETRIC_N2: return lang.temperaments.LIMIT_5_SYMMETRIC_N2;
    case PYTHAGOREAN: return lang.temperaments.PYTHAGOREAN;
    default: return "[Temperament]";
  }
}
