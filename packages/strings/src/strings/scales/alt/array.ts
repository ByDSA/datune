import { Options } from "parsing";
import { Array } from "scales/alt";
import stringify from ".";

export default function stringifyArray(array: Array, options?: Options): string {
  return array.map((s) => stringify(s, options)).join("-");
}
