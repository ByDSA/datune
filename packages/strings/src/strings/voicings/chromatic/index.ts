/* eslint-disable camelcase */
import { Options } from "parsing";
import { toPascalCase } from "parsing/utils";
import arrayStringify from "strings/intervals/chromatic/array";
import { Voicing } from "voicings/chromatic";
import getName from "./longName";

export default function stringify(obj: Voicing, options?: Options): string {
  const name = getName(obj, options);

  if (name)
    return toPascalCase(name);

  return arrayStringify(obj.rootIntervals);
}
