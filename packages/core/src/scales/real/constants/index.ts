import type { Scale } from "../Scale";
import * as I from "intervals/real/constants";
import { fromIntervals } from "../building";

export function initialize() {
  if (ET12_MAJOR)
    throw new Error("Already initialized");

  if (!I.UNISON)
    I.initialize();

  // eslint-disable-next-line max-len
  const { ET12_M2, ET12_M7, ET12_M6, ET12_M3, ET12_P5, ET12_P4, PT_M2, PT_M7, PT_M6, PT_M3, PT_P5, PT_P4, UNISON } = I;

  ET12_MAJOR = fromIntervals(
    UNISON,
    ET12_M2,
    ET12_M3,
    ET12_P4,
    ET12_P5,
    ET12_M6,
    ET12_M7,
  );
  PT_MAJOR = fromIntervals(
    UNISON,
    PT_M2,
    PT_M3,
    PT_P4,
    PT_P5,
    PT_M6,
    PT_M7,
  );
}

export let ET12_MAJOR: Scale;

export let PT_MAJOR: Scale;
