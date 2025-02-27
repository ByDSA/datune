import { Scale } from "../Scale";
import { mode } from "./mode";

export function modes(
  obj: Scale,
): Scale[] {
  let scaleTmp: Scale = obj;
  const ret: Scale[] = [obj];

  while (true) {
    scaleTmp = mode(scaleTmp, 2);

    if (scaleTmp === obj)
      break;

    ret.push(scaleTmp);
  }

  return ret;
}
