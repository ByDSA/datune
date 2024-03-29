import { Interval } from "intervals/chromatic";

export default function fromString(str: string): Interval | null {
  const ret = +str;

  if (Number.isNaN(ret))
    return null;

  return ret;
}
