import { Voicing } from "@datune/core/voicings/chromatic";
import { Options } from "parsing";
import { toPascalCase } from "parsing/utils";
import { stringifyIntervalArray } from "strings/intervals/chromatic/array";
import { stringifyLongName } from "./longName";

export function stringifyVoicing(obj: Voicing, options?: Options): string {
  const name = stringifyLongName(obj, options);

  if (name)
    return toPascalCase(name);

  return stringifyIntervalArray(obj.rootIntervals);
}
