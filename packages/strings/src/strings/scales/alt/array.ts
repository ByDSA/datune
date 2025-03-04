import { ScaleArray } from "@datune/core/scales/alt";
import { Options } from "parsing";
import { stringifyScale } from ".";

export function stringifyArray(array: ScaleArray, options?: Options): string {
  return array.map((s) => stringifyScale(s, options)).join("-");
}
