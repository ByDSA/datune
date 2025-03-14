import type { Arrays } from "@datune/utils";
import { SingleStep } from "./SingleStep";

export type SingleStepArray = Arrays.NonEmpty<SingleStep>;

export function sortByIndex(a: SingleStep | null, b: SingleStep | null) {
  if (a === null)
    return -1;

  if (b === null)
    return 1;

  return a.index - b.index;
}
