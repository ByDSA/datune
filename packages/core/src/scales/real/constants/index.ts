import { fromIntervals } from "../building";
import { Scale } from "../Scale";
import { Intervals } from "intervals/real";

export function initialize() {
  if (ET12_MAJOR)
    throw new Error("Already initialized");

  // eslint-disable-next-line max-len
  const { ET12_MAJOR_SECOND, ET12_MAJOR_SEVENTH, ET12_MAJOR_SIXTH, ET12_MAJOR_THIRD, ET12_PERFECT_FIFTH, ET12_PERFECT_FOURTH, PT_MAJOR_SECOND, PT_MAJOR_SEVENTH, PT_MAJOR_SIXTH, PT_MAJOR_THIRD, PT_PERFECT_FIFTH, PT_PERFECT_FOURTH, UNISON } = Intervals;

  ET12_MAJOR = fromIntervals(
    UNISON,
    ET12_MAJOR_SECOND,
    ET12_MAJOR_THIRD,
    ET12_PERFECT_FOURTH,
    ET12_PERFECT_FIFTH,
    ET12_MAJOR_SIXTH,
    ET12_MAJOR_SEVENTH,
  );
  PT_MAJOR = fromIntervals(
    UNISON,
    PT_MAJOR_SECOND,
    PT_MAJOR_THIRD,
    PT_PERFECT_FOURTH,
    PT_PERFECT_FIFTH,
    PT_MAJOR_SIXTH,
    PT_MAJOR_SEVENTH,
  );
}

export let ET12_MAJOR: Scale;

export let PT_MAJOR: Scale;
