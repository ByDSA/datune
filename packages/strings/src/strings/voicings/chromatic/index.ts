import { Voicing } from "@datune/core/voicings/chromatic";
import { stringifyLongName } from "./longName";
import { Options } from "parsing";
import { toPascalCase } from "parsing/utils";
import { stringifyIntervals } from "strings/intervals/chromatic/array";

export function stringifyVoicing(obj: Voicing, options?: Options): string {
  const name = stringifyLongName(obj, options);

  if (name)
    return toPascalCase(name);

  return stringifyIntervals(obj.rootIntervals);
}
