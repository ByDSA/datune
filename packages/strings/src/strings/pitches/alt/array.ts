import { Options } from "parsing";
import { Array } from "pitches/alt";
import stringify from ".";

export default function arrayStringify(pitches: Array, options?: Options): string {
  return pitches.map((p) => stringify(p, options)).join("-");
}
