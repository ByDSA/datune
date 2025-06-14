import { type IntervalArray, Intervals } from "intervals/alt";

export function deltaToRootIntervals(...deltaIntervals: IntervalArray): IntervalArray {
  const rootIntervals: IntervalArray = [Intervals.P1];

  for (let i = 0; i < deltaIntervals.length - 1; i++) {
    const baseIntervalI = Intervals.shift(
      rootIntervals[rootIntervals.length - 1],
      deltaIntervals[i],
    );

    rootIntervals.push(baseIntervalI);
  }

  return rootIntervals;
}

export function sortedRootToDeltaIntervals(
  ...sortedRootIntervals: IntervalArray
): IntervalArray {
  const deltaIntervals = new Array(sortedRootIntervals.length - 1) as IntervalArray;

  for (let i = 1; i < sortedRootIntervals.length; i++) {
    const deltaInterval = Intervals.shiftDown(
      sortedRootIntervals[i],
      sortedRootIntervals[i - 1],
    );

    deltaIntervals[i - 1] = deltaInterval;
  }

  return deltaIntervals;
}
