import type { Interval } from "../Interval";
import { lock } from "datils/datatypes";
import * as DI from "../../diatonic/constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import { a, d, da, dd, M, m, P } from "../quality/constants";

export function initialize() {
  if (P1)
    throw new Error("Already initialized");

  if (!DI.UNISON)
    DI.initialize();

  // eslint-disable-next-line max-len
  const { ELEVENTH, FIFTEENTH, FIFTH, FOURTEENTH, FOURTH, NINTH, OCTAVE, SECOND, SEVENTH, SIXTH, TENTH, THIRD, THIRTEENTH, TWELFTH, UNISON } = DI;

  d1 = fromIntervalQuality(
    UNISON,
    d,
  ) as Interval;
  lock(d1);
  P1 = fromIntervalQuality(
    UNISON,
    P,
  ) as Interval;
  lock(P1);

  d2 = fromIntervalQuality(
    SECOND,
    d,
  ) as Interval;
  lock(d2);

  m2 = fromIntervalQuality(
    SECOND,
    m,
  ) as Interval;
  lock(m2);

  a1 = fromIntervalQuality(
    UNISON,
    a,
  ) as Interval;
  lock(a1);

  da1 = fromIntervalQuality(
    UNISON,
    da,
  ) as Interval;
  lock(da1);

  M2 = fromIntervalQuality(
    SECOND,
    M,
  ) as Interval;
  lock(M2);

  d3 = fromIntervalQuality(
    THIRD,
    d,
  ) as Interval;
  lock(d3);

  dd3 = fromIntervalQuality(
    THIRD,
    dd,
  ) as Interval;
  lock(dd3);

  m3 = fromIntervalQuality(
    THIRD,
    m,
  ) as Interval;
  lock(m3);

  a2 = fromIntervalQuality(
    SECOND,
    a,
  ) as Interval;
  lock(a2);

  da2 = fromIntervalQuality(
    SECOND,
    da,
  ) as Interval;
  lock(da2);

  M3 = fromIntervalQuality(
    THIRD,
    M,
  ) as Interval;
  lock(M3);

  d4 = fromIntervalQuality(
    FOURTH,
    d,
  ) as Interval;
  lock(d4);

  dd4 = fromIntervalQuality(
    FOURTH,
    dd,
  ) as Interval;
  lock(dd4);

  P4 = fromIntervalQuality(
    FOURTH,
    P,
  ) as Interval;
  lock(P4);

  a3 = fromIntervalQuality(
    THIRD,
    a,
  ) as Interval;
  lock(a3);

  da3 = fromIntervalQuality(
    THIRD,
    da,
  ) as Interval;
  lock(da3);

  d5 = fromIntervalQuality(
    FIFTH,
    d,
  ) as Interval;
  lock(d5);

  dd5 = fromIntervalQuality(
    FIFTH,
    dd,
  ) as Interval;
  lock(dd5);

  a4 = fromIntervalQuality(
    FOURTH,
    a,
  ) as Interval;
  lock(a4);

  da4 = fromIntervalQuality(
    FOURTH,
    da,
  ) as Interval;
  lock(da4);

  P5 = fromIntervalQuality(
    FIFTH,
    P,
  ) as Interval;
  lock(P5);

  d6 = fromIntervalQuality(
    SIXTH,
    d,
  ) as Interval;
  lock(d6);

  dd6 = fromIntervalQuality(
    SIXTH,
    dd,
  ) as Interval;
  lock(dd6);

  m6 = fromIntervalQuality(
    SIXTH,
    m,
  ) as Interval;
  lock(m6);

  a5 = fromIntervalQuality(
    FIFTH,
    a,
  ) as Interval;
  lock(a5);

  da5 = fromIntervalQuality(
    FIFTH,
    da,
  ) as Interval;
  lock(da5);

  M6 = fromIntervalQuality(
    SIXTH,
    M,
  ) as Interval;
  lock(M6);

  d7 = fromIntervalQuality(
    SEVENTH,
    d,
  ) as Interval;
  lock(d7);

  dd7 = fromIntervalQuality(
    SEVENTH,
    dd,
  ) as Interval;
  lock(dd7);

  m7 = fromIntervalQuality(
    SEVENTH,
    m,
  ) as Interval;
  lock(m7);

  a6 = fromIntervalQuality(
    SIXTH,
    a,
  ) as Interval;
  lock(a6);

  da6 = fromIntervalQuality(
    SIXTH,
    da,
  ) as Interval;
  lock(da6);

  M7 = fromIntervalQuality(
    SEVENTH,
    M,
  ) as Interval;
  lock(M7);

  d8 = fromIntervalQuality(
    OCTAVE,
    d,
  ) as Interval;
  lock(d8);

  dd8 = fromIntervalQuality(
    OCTAVE,
    dd,
  ) as Interval;
  lock(dd8);

  P8 = fromIntervalQuality(
    OCTAVE,
    P,
  ) as Interval;
  lock(P8);

  a7 = fromIntervalQuality(
    SEVENTH,
    a,
  ) as Interval;

  da7 = fromIntervalQuality(
    SEVENTH,
    da,
  ) as Interval;

  d9 = fromIntervalQuality(
    NINTH,
    d,
  ) as Interval;

  dd9 = fromIntervalQuality(
    NINTH,
    dd,
  ) as Interval;

  m9 = fromIntervalQuality(
    NINTH,
    m,
  ) as Interval;

  a8 = fromIntervalQuality(
    OCTAVE,
    a,
  ) as Interval;

  M9 = fromIntervalQuality(
    NINTH,
    M,
  ) as Interval;

  d10 = fromIntervalQuality(
    TENTH,
    d,
  ) as Interval;

  dd10 = fromIntervalQuality(
    TENTH,
    dd,
  ) as Interval;

  m10 = fromIntervalQuality(
    TENTH,
    m,
  ) as Interval;

  a9 = fromIntervalQuality(
    NINTH,
    a,
  ) as Interval;

  da9 = fromIntervalQuality(
    NINTH,
    da,
  ) as Interval;

  M10 = fromIntervalQuality(
    TENTH,
    M,
  ) as Interval;

  d11 = fromIntervalQuality(
    ELEVENTH,
    d,
  ) as Interval;

  dd11 = fromIntervalQuality(
    ELEVENTH,
    dd,
  ) as Interval;

  P11 = fromIntervalQuality(
    ELEVENTH,
    P,
  ) as Interval;

  a10 = fromIntervalQuality(
    TENTH,
    a,
  ) as Interval;

  da10 = fromIntervalQuality(
    TENTH,
    da,
  ) as Interval;

  d12 = fromIntervalQuality(
    TWELFTH,
    d,
  ) as Interval;

  dd12 = fromIntervalQuality(
    TWELFTH,
    dd,
  ) as Interval;

  a11 = fromIntervalQuality(
    ELEVENTH,
    a,
  ) as Interval;

  da11 = fromIntervalQuality(
    ELEVENTH,
    da,
  ) as Interval;

  P12 = fromIntervalQuality(
    TWELFTH,
    P,
  ) as Interval;

  d13 = fromIntervalQuality(
    THIRTEENTH,
    d,
  ) as Interval;

  dd13 = fromIntervalQuality(
    THIRTEENTH,
    dd,
  ) as Interval;

  m13 = fromIntervalQuality(
    THIRTEENTH,
    m,
  ) as Interval;

  a12 = fromIntervalQuality(
    TWELFTH,
    a,
  ) as Interval;

  da12 = fromIntervalQuality(
    TWELFTH,
    da,
  ) as Interval;

  M13 = fromIntervalQuality(
    THIRTEENTH,
    M,
  ) as Interval;

  d14 = fromIntervalQuality(
    FOURTEENTH,
    d,
  ) as Interval;

  dd14 = fromIntervalQuality(
    FOURTEENTH,
    dd,
  ) as Interval;

  m14 = fromIntervalQuality(
    FOURTEENTH,
    m,
  ) as Interval;

  a13 = fromIntervalQuality(
    THIRTEENTH,
    a,
  ) as Interval;

  da13 = fromIntervalQuality(
    THIRTEENTH,
    da,
  ) as Interval;

  M14 = fromIntervalQuality(
    FOURTEENTH,
    M,
  ) as Interval;

  d15 = fromIntervalQuality(
    FIFTEENTH,
    d,
  ) as Interval;

  dd15 = fromIntervalQuality(
    FIFTEENTH,
    dd,
  ) as Interval;

  P15 = fromIntervalQuality(
    FIFTEENTH,
    P,
  ) as Interval;

  a14 = fromIntervalQuality(
    FOURTEENTH,
    a,
  ) as Interval;

  da14 = fromIntervalQuality(
    FOURTEENTH,
    da,
  ) as Interval;

  a15 = fromIntervalQuality(
    FIFTEENTH,
    a,
  ) as Interval;

  da15 = fromIntervalQuality(
    FIFTEENTH,
    da,
  ) as Interval;
}

export let d1: Interval;

export let P1: Interval;

export let d2: Interval;

export let m2: Interval;

export let a1: Interval;

export let da1: Interval;

export let M2: Interval;

export let d3: Interval;

export let dd3: Interval;

export let m3: Interval;

export let a2: Interval;

export let da2: Interval;

export let M3: Interval;

export let d4: Interval;

export let dd4: Interval;

export let P4: Interval;

export let a3: Interval;

export let da3: Interval;

export let d5: Interval;

export let dd5: Interval;

export let a4: Interval;

export let da4: Interval;

export let P5: Interval;

export let d6: Interval;

export let dd6: Interval;

export let m6: Interval;

export let a5: Interval;

export let da5: Interval;

export let M6: Interval;

export let d7: Interval;

export let dd7: Interval;

export let m7: Interval;

export let a6: Interval;

export let da6: Interval;

export let M7: Interval;

export let d8: Interval;

export let dd8: Interval;

export let P8: Interval;

export let a7: Interval;

export let da7: Interval;

export let d9: Interval;

export let dd9: Interval;

export let m9: Interval;

export let a8: Interval;

export let M9: Interval;

export let d10: Interval;

export let dd10: Interval;

export let m10: Interval;

export let a9: Interval;

export let da9: Interval;

export let M10: Interval;

export let d11: Interval;

export let dd11: Interval;

export let P11: Interval;

export let a10: Interval;

export let da10: Interval;

export let d12: Interval;

export let dd12: Interval;

export let a11: Interval;

export let da11: Interval;

export let P12: Interval;

export let d13: Interval;

export let dd13: Interval;

export let m13: Interval;

export let a12: Interval;

export let da12: Interval;

export let M13: Interval;

export let d14: Interval;

export let dd14: Interval;

export let m14: Interval;

export let a13: Interval;

export let da13: Interval;

export let M14: Interval;

export let d15: Interval;

export let dd15: Interval;

export let P15: Interval;

export let a14: Interval;

export let da14: Interval;

export let a15: Interval;

export let da15: Interval;
