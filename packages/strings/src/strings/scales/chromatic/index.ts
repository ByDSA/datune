import { Scale } from "@datune/core/scales/chromatic";
import { stringifyIntervals } from "../../intervals/chromatic/array";
import { getName } from "./name";
import { Options } from "parsing";

export function stringifyScale(scale: Scale, options?: Options): string {
  const name = getName(scale, options);

  if (name)
    return name;

  return stringifyIntervals(scale.rootIntervals);
}
