import { Scale } from "@datune/core/scales/alt";
import { stringifyArray } from "../../intervals/alt/array";
import { toStringName } from "./name";
import { Options } from "parsing";

export function stringifyScale(scale: Scale, options?: Options): string {
  const name = toStringName(scale, options);

  if (name)
    return name;

  return stringifyArray(scale.rootIntervals);
}
