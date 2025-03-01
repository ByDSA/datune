import { ScaleArray } from "@datune/core/scales/alt";
import { stringifyScale } from ".";
import { Options } from "parsing";

export function stringifyArray(array: ScaleArray, options?: Options): string {
  return array.map((s) => stringifyScale(s, options)).join("-");
}
