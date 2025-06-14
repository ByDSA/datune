import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { Options } from "parsing";
import { toPascalCase } from "parsing/utils";
import { stringifyIntervalArray } from "strings/intervals/chromatic/array";
import { stringifyLongName } from "./longName";

export function stringifyIntervalSet(obj: IntervalSet, options?: Options): string {
  const name = stringifyLongName(obj, options);

  if (name)
    return toPascalCase(name);

  return stringifyIntervalArray(obj.rootIntervals);
}
