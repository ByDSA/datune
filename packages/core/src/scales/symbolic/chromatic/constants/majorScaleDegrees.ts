import type { Degree } from "chromatic";
import type { NonEmptyArray } from "datils/datatypes/arrays";

export const MAJOR_SCALE_DEGREES = Object.freeze(
  [0, 2, 4, 5, 7, 9, 11] as NonEmptyArray<Degree>,
);
