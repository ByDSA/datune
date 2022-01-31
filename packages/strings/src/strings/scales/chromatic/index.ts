/* eslint-disable camelcase */
import { Options } from "parsing";
import { Scale } from "scales/chromatic";
import arrayStringify from "../../intervals/chromatic/array";
import toStringName from "./name";

export default function toString(scale: Scale, options?: Options): string {
  const name = toStringName(scale, options);

  if (name)
    return name;

  return arrayStringify(scale.rootIntervals);
}
