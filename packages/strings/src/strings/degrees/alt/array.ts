import { Array } from "@datune/core/degrees/alt";
import stringify from ".";

export default function stringifyArray(degrees: Array): string {
  let first = true;
  let ret: string = "";

  degrees.forEach((degree) => {
    if (first)
      first = false;
    else
      ret += "-";

    ret += stringify(degree);
  } );

  return ret;
}
