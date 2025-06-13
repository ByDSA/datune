import type { Scale } from "../Scale";
import type { Degree, DegreeArray } from "alt";
import { Intervals } from "intervals/alt";
import { fromIntraIntervals } from "./intraIntervals";

export function fromDegrees(...degrees: DegreeArray | Readonly<DegreeArray>): Scale {
  const sortedDegrees: Readonly<DegreeArray> = [...degrees].sort((a, b)=>+a - +b) as DegreeArray;
  const intraIntervals: DegreeArray = [] as any;

  for (let i = 1; i < sortedDegrees.length; i++) {
    const intraIntervalsI = Intervals.shiftDown(sortedDegrees[i], sortedDegrees[i - 1]).toDegree();

    intraIntervals.push(intraIntervalsI);
  }

  const lastIntraInterval = getLastIntraInterval(sortedDegrees);

  intraIntervals.push(lastIntraInterval);

  return fromIntraIntervals(...intraIntervals);
}

function getLastIntraInterval(degrees: DegreeArray | Readonly<DegreeArray>): Degree {
  return Intervals.shiftDown(
    Intervals.P8,
    degrees.at(-1)!,
  ).toDegree();
}
