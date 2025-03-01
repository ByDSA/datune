import { Interval } from "@datune/core/intervals/chromatic";

export function parseFromNumber(str: string): Interval | null {
  const ret = +str;

  if (Number.isNaN(ret))
    return null;

  return ret;
}
