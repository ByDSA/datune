import { Scale } from "@datune/core/scales/alt";
import { Options } from "parsing";
import { stringifyArray } from "../../intervals/alt/array";
import { toStringName } from "./name";

export function stringifyScale(scale: Scale, options?: Options): string {
  const name = toStringName(scale, options);

  if (name)
    return name;

  return stringifyArray(scale.rootIntervals);
}
