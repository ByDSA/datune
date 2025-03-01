import { DegreeArray } from "@datune/core/degrees/alt";
import { stringifyDegree } from ".";

export function stringifyArray(degrees: DegreeArray): string {
  let first = true;
  let ret: string = "";

  degrees.forEach((degree) => {
    if (first)
      first = false;
    else
      ret += "-";

    ret += stringifyDegree(degree);
  } );

  return ret;
}
