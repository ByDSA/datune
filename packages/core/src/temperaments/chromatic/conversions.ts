/* eslint-disable import/prefer-default-export */
import { ET12, LIMIT_5_SYMMETRIC_N1, LIMIT_5_SYMMETRIC_N2, PYTHAGOREAN } from "./constants";
import Temperament from "./Temperament";

export function hashCode(obj: Temperament): string {
  switch (obj) {
    case ET12: return "ET12";
    case LIMIT_5_SYMMETRIC_N1: return "LIMIT_5_SYMMETRIC_N1";
    case LIMIT_5_SYMMETRIC_N2: return "LIMIT_5_SYMMETRIC_N2";
    case PYTHAGOREAN: return "PYTHAGOREAN";
    default: throw new Error();
  }
}
