import { NonEmptyArray } from "datils";
import { SingleStep } from "./SingleStep";

export type SingleStepArray = NonEmptyArray<SingleStep>;

export function singleStepsSortByIndex(a: SingleStep | null, b: SingleStep | null) {
  if (a === null)
    return -1;

  if (b === null)
    return 1;

  return a.index - b.index;
}
