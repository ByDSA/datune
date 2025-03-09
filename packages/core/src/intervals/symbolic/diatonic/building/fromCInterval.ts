import type { Interval as CInterval } from "chromatic";
import type { Interval } from "diatonic";
import * as CI from "intervals/symbolic/chromatic/constants";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { Intervals as I } from "..";
import { Direction } from "../Direction";
import { fromInt } from "./int";

;

export function fromChromaticInterval(cInterval: CInterval): Interval {
  map ??= new Map([
    [CI.P1, I.UNISON],
    [CI.m2, I.SECOND],
    [CI.M2, I.SECOND],
    [CI.m3, I.THIRD],
    [CI.M3, I.THIRD],
    [CI.P4, I.FOURTH],
    [CI.d5, I.FIFTH],
    [CI.P5, I.FIFTH],
    [CI.m6, I.SIXTH],
    [CI.M6, I.SIXTH],
    [CI.m7, I.SEVENTH],
    [CI.M7, I.SEVENTH],
  ]);
  const octaves = Math.trunc(cInterval / CNUMBER);
  const key = Math.abs(cInterval) % CNUMBER;
  let gotInterval = map.get(key);

  if (gotInterval === undefined)
    throw new Error();

  let retInt = +gotInterval;
  const direction = cInterval >= 0 ? Direction.ASCENDENT : Direction.DESCENDENT;

  if (direction === Direction.DESCENDENT)
    retInt = -retInt;

  retInt += octaves * DNUMBER;

  return fromInt(retInt, direction);
}

let map: Map<CInterval, Interval>;
