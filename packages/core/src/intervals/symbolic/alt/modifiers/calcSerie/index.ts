import Interval from "../../Interval";
import mult from "../mult";

type InputPartialPart = {
  startIndex: number;
  length: number;
};

type Input = Partial<InputPartialPart> & {
  interval: Interval;
};

export default function f( { interval, startIndex = 1, length = 1 }: Input): Interval[] | null {
  const ret = [];

  for (let i = startIndex; i < startIndex + length; i++) {
    const current = mult(interval, i);

    if (!current)
      return null;

    ret.push(current);
  }

  return ret;
}
