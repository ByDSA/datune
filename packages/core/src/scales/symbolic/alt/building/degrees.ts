import type { Scale } from "../Scale";
import type { Degree, DegreeArray } from "alt";
import { Intervals } from "intervals/alt";
import { fromDeltaIntervals } from "./deltaIntervals";

export function fromDegrees(...degrees: DegreeArray | Readonly<DegreeArray>): Scale {
  const sortedDegrees: Readonly<DegreeArray> = [...degrees].sort((a, b)=>+a - +b) as DegreeArray;
  const deltaIntervals: DegreeArray = [] as any;

  for (let i = 1; i < sortedDegrees.length; i++) {
    const deltaIntervalsI = Intervals.shiftDown(sortedDegrees[i], sortedDegrees[i - 1]).toDegree();

    deltaIntervals.push(deltaIntervalsI);
  }

  const lastDeltaInterval = getLastDeltaInterval(sortedDegrees);

  deltaIntervals.push(lastDeltaInterval);

  return fromDeltaIntervals(...deltaIntervals);
}

function getLastDeltaInterval(degrees: DegreeArray | Readonly<DegreeArray>): Degree {
  return Intervals.shiftDown(
    Intervals.P8,
    degrees.at(-1)!,
  ).toDegree();
}
