import Options, { getLangFromOptions } from "lang/Options";
import { ET12, LIMIT_5_SYMMETRIC_N1, LIMIT_5_SYMMETRIC_N2, PYTHAGOREAN, Temperament } from "@datune/core/temperaments/chromatic";

export default function stringify(obj: Temperament, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (obj) {
    case ET12: return lang.temperaments.ET12;
    case LIMIT_5_SYMMETRIC_N1: return lang.temperaments.LIMIT_5_SYMMETRIC_N1;
    case LIMIT_5_SYMMETRIC_N2: return lang.temperaments.LIMIT_5_SYMMETRIC_N2;
    case PYTHAGOREAN: return lang.temperaments.PYTHAGOREAN;
    default: throw new Error();
  }
}
