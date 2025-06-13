import type { Interval } from "../Interval";
import { freeze } from "datils/datatypes/objects";
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
  ) as typeof d1;
  freeze(d1);
  P1 = fromIntervalQuality(
    UNISON,
    P,
  ) as typeof P1;
  freeze(P1);

  d2 = fromIntervalQuality(
    SECOND,
    d,
  ) as typeof d2;
  freeze(d2);

  m2 = fromIntervalQuality(
    SECOND,
    m,
  ) as typeof m2;
  freeze(m2);

  a1 = fromIntervalQuality(
    UNISON,
    a,
  ) as typeof a1;
  freeze(a1);

  da1 = fromIntervalQuality(
    UNISON,
    da,
  ) as typeof da1;
  freeze(da1);

  M2 = fromIntervalQuality(
    SECOND,
    M,
  ) as typeof M2;
  freeze(M2);

  d3 = fromIntervalQuality(
    THIRD,
    d,
  ) as typeof d3;
  freeze(d3);

  dd3 = fromIntervalQuality(
    THIRD,
    dd,
  ) as typeof dd3;
  freeze(dd3);

  m3 = fromIntervalQuality(
    THIRD,
    m,
  ) as typeof m3;
  freeze(m3);

  a2 = fromIntervalQuality(
    SECOND,
    a,
  ) as typeof a2;
  freeze(a2);

  da2 = fromIntervalQuality(
    SECOND,
    da,
  ) as typeof da2;
  freeze(da2);

  M3 = fromIntervalQuality(
    THIRD,
    M,
  ) as typeof M3;
  freeze(M3);

  d4 = fromIntervalQuality(
    FOURTH,
    d,
  ) as typeof d4;
  freeze(d4);

  dd4 = fromIntervalQuality(
    FOURTH,
    dd,
  ) as typeof dd4;
  freeze(dd4);

  P4 = fromIntervalQuality(
    FOURTH,
    P,
  ) as typeof P4;
  freeze(P4);

  a3 = fromIntervalQuality(
    THIRD,
    a,
  ) as typeof a3;
  freeze(a3);

  da3 = fromIntervalQuality(
    THIRD,
    da,
  ) as typeof da3;
  freeze(da3);

  d5 = fromIntervalQuality(
    FIFTH,
    d,
  ) as typeof d5;
  freeze(d5);

  dd5 = fromIntervalQuality(
    FIFTH,
    dd,
  ) as typeof dd5;
  freeze(dd5);

  a4 = fromIntervalQuality(
    FOURTH,
    a,
  ) as typeof a4;
  freeze(a4);

  da4 = fromIntervalQuality(
    FOURTH,
    da,
  ) as typeof da4;
  freeze(da4);

  P5 = fromIntervalQuality(
    FIFTH,
    P,
  ) as typeof P5;
  freeze(P5);

  d6 = fromIntervalQuality(
    SIXTH,
    d,
  ) as typeof d6;
  freeze(d6);

  dd6 = fromIntervalQuality(
    SIXTH,
    dd,
  ) as typeof dd6;
  freeze(dd6);

  m6 = fromIntervalQuality(
    SIXTH,
    m,
  ) as typeof m6;
  freeze(m6);

  a5 = fromIntervalQuality(
    FIFTH,
    a,
  ) as typeof a5;
  freeze(a5);

  da5 = fromIntervalQuality(
    FIFTH,
    da,
  ) as typeof da5;
  freeze(da5);

  M6 = fromIntervalQuality(
    SIXTH,
    M,
  ) as typeof M6;
  freeze(M6);

  d7 = fromIntervalQuality(
    SEVENTH,
    d,
  ) as typeof d7;
  freeze(d7);

  dd7 = fromIntervalQuality(
    SEVENTH,
    dd,
  ) as typeof dd7;
  freeze(dd7);

  m7 = fromIntervalQuality(
    SEVENTH,
    m,
  ) as typeof m7;
  freeze(m7);

  a6 = fromIntervalQuality(
    SIXTH,
    a,
  ) as typeof a6;
  freeze(a6);

  da6 = fromIntervalQuality(
    SIXTH,
    da,
  ) as typeof da6;
  freeze(da6);

  M7 = fromIntervalQuality(
    SEVENTH,
    M,
  ) as typeof M7;
  freeze(M7);

  d8 = fromIntervalQuality(
    OCTAVE,
    d,
  ) as typeof d8;
  freeze(d8);

  dd8 = fromIntervalQuality(
    OCTAVE,
    dd,
  ) as typeof dd8;
  freeze(dd8);

  P8 = fromIntervalQuality(
    OCTAVE,
    P,
  ) as typeof P8;
  freeze(P8);

  a7 = fromIntervalQuality(
    SEVENTH,
    a,
  ) as typeof a7;

  da7 = fromIntervalQuality(
    SEVENTH,
    da,
  ) as typeof da7;

  d9 = fromIntervalQuality(
    NINTH,
    d,
  ) as typeof d9;

  dd9 = fromIntervalQuality(
    NINTH,
    dd,
  ) as typeof dd9;

  m9 = fromIntervalQuality(
    NINTH,
    m,
  ) as typeof m9;

  a8 = fromIntervalQuality(
    OCTAVE,
    a,
  ) as typeof a8;

  M9 = fromIntervalQuality(
    NINTH,
    M,
  ) as typeof M9;

  d10 = fromIntervalQuality(
    TENTH,
    d,
  ) as typeof d10;

  dd10 = fromIntervalQuality(
    TENTH,
    dd,
  ) as typeof dd10;

  m10 = fromIntervalQuality(
    TENTH,
    m,
  ) as typeof m10;

  a9 = fromIntervalQuality(
    NINTH,
    a,
  ) as typeof a9;

  da9 = fromIntervalQuality(
    NINTH,
    da,
  ) as typeof da9;

  M10 = fromIntervalQuality(
    TENTH,
    M,
  ) as typeof M10;

  d11 = fromIntervalQuality(
    ELEVENTH,
    d,
  ) as typeof d11;

  dd11 = fromIntervalQuality(
    ELEVENTH,
    dd,
  ) as typeof dd11;

  P11 = fromIntervalQuality(
    ELEVENTH,
    P,
  ) as typeof P11;

  a10 = fromIntervalQuality(
    TENTH,
    a,
  ) as typeof a10;

  da10 = fromIntervalQuality(
    TENTH,
    da,
  ) as typeof da10;

  d12 = fromIntervalQuality(
    TWELFTH,
    d,
  ) as typeof d12;

  dd12 = fromIntervalQuality(
    TWELFTH,
    dd,
  ) as typeof dd12;

  a11 = fromIntervalQuality(
    ELEVENTH,
    a,
  ) as typeof a11;

  da11 = fromIntervalQuality(
    ELEVENTH,
    da,
  ) as typeof da11;

  P12 = fromIntervalQuality(
    TWELFTH,
    P,
  ) as typeof P12;

  d13 = fromIntervalQuality(
    THIRTEENTH,
    d,
  ) as typeof d13;

  dd13 = fromIntervalQuality(
    THIRTEENTH,
    dd,
  ) as typeof dd13;

  m13 = fromIntervalQuality(
    THIRTEENTH,
    m,
  ) as typeof m13;

  a12 = fromIntervalQuality(
    TWELFTH,
    a,
  ) as typeof a12;

  da12 = fromIntervalQuality(
    TWELFTH,
    da,
  ) as typeof da12;

  M13 = fromIntervalQuality(
    THIRTEENTH,
    M,
  ) as typeof M13;

  d14 = fromIntervalQuality(
    FOURTEENTH,
    d,
  ) as typeof d14;

  dd14 = fromIntervalQuality(
    FOURTEENTH,
    dd,
  ) as typeof dd14;

  m14 = fromIntervalQuality(
    FOURTEENTH,
    m,
  ) as typeof m14;

  a13 = fromIntervalQuality(
    THIRTEENTH,
    a,
  ) as typeof a13;

  da13 = fromIntervalQuality(
    THIRTEENTH,
    da,
  ) as typeof da13;

  M14 = fromIntervalQuality(
    FOURTEENTH,
    M,
  ) as typeof M14;

  d15 = fromIntervalQuality(
    FIFTEENTH,
    d,
  ) as typeof d15;

  dd15 = fromIntervalQuality(
    FIFTEENTH,
    dd,
  ) as typeof dd15;

  P15 = fromIntervalQuality(
    FIFTEENTH,
    P,
  ) as typeof P15;

  a14 = fromIntervalQuality(
    FOURTEENTH,
    a,
  ) as typeof a14;

  da14 = fromIntervalQuality(
    FOURTEENTH,
    da,
  ) as typeof da14;

  a15 = fromIntervalQuality(
    FIFTEENTH,
    a,
  ) as typeof a15;

  da15 = fromIntervalQuality(
    FIFTEENTH,
    da,
  ) as typeof da15;
}

export let d1: Interval & { readonly __brand: "d1" };

export let P1: Interval & { readonly __brand: "P1" };

export let d2: Interval & { readonly __brand: "d2" };

export let m2: Interval & { readonly __brand: "m2" };

export let a1: Interval & { readonly __brand: "a1" };

export let da1: Interval & { readonly __brand: "da1" };

export let M2: Interval & { readonly __brand: "M2" };

export let d3: Interval & { readonly __brand: "d3" };

export let dd3: Interval & { readonly __brand: "dd3" };

export let m3: Interval & { readonly __brand: "m3" };

export let a2: Interval & { readonly __brand: "a2" };

export let da2: Interval & { readonly __brand: "da2" };

export let M3: Interval & { readonly __brand: "M3" };

export let d4: Interval & { readonly __brand: "d4" };

export let dd4: Interval & { readonly __brand: "dd4" };

export let P4: Interval & { readonly __brand: "P4" };

export let a3: Interval & { readonly __brand: "a3" };

export let da3: Interval & { readonly __brand: "da3" };

export let d5: Interval & { readonly __brand: "d5" };

export let dd5: Interval & { readonly __brand: "dd5" };

export let a4: Interval & { readonly __brand: "a4" };

export let da4: Interval & { readonly __brand: "da4" };

export let P5: Interval & { readonly __brand: "P5" };

export let d6: Interval & { readonly __brand: "d6" };

export let dd6: Interval & { readonly __brand: "dd6" };

export let m6: Interval & { readonly __brand: "m6" };

export let a5: Interval & { readonly __brand: "a5" };

export let da5: Interval & { readonly __brand: "da5" };

export let M6: Interval & { readonly __brand: "M6" };

export let d7: Interval & { readonly __brand: "d7" };

export let dd7: Interval & { readonly __brand: "dd7" };

export let m7: Interval & { readonly __brand: "m7" };

export let a6: Interval & { readonly __brand: "a6" };

export let da6: Interval & { readonly __brand: "da6" };

export let M7: Interval & { readonly __brand: "M7" };

export let d8: Interval & { readonly __brand: "d8" };

export let dd8: Interval & { readonly __brand: "dd8" };

export let P8: Interval & { readonly __brand: "P8" };

export let a7: Interval & { readonly __brand: "a7" };

export let da7: Interval & { readonly __brand: "da7" };

export let d9: Interval & { readonly __brand: "d9" };

export let dd9: Interval & { readonly __brand: "dd9" };

export let m9: Interval & { readonly __brand: "m9" };

export let a8: Interval & { readonly __brand: "a8" };

export let M9: Interval & { readonly __brand: "M9" };

export let d10: Interval & { readonly __brand: "d10" };

export let dd10: Interval & { readonly __brand: "dd10" };

export let m10: Interval & { readonly __brand: "m10" };

export let a9: Interval & { readonly __brand: "a9" };

export let da9: Interval & { readonly __brand: "da9" };

export let M10: Interval & { readonly __brand: "M10" };

export let d11: Interval & { readonly __brand: "d11" };

export let dd11: Interval & { readonly __brand: "dd11" };

export let P11: Interval & { readonly __brand: "P11" };

export let a10: Interval & { readonly __brand: "a10" };

export let da10: Interval & { readonly __brand: "da10" };

export let d12: Interval & { readonly __brand: "d12" };

export let dd12: Interval & { readonly __brand: "dd12" };

export let a11: Interval & { readonly __brand: "a11" };

export let da11: Interval & { readonly __brand: "da11" };

export let P12: Interval & { readonly __brand: "P12" };

export let d13: Interval & { readonly __brand: "d13" };

export let dd13: Interval & { readonly __brand: "dd13" };

export let m13: Interval & { readonly __brand: "m13" };

export let a12: Interval & { readonly __brand: "a12" };

export let da12: Interval & { readonly __brand: "da12" };

export let M13: Interval & { readonly __brand: "M13" };

export let d14: Interval & { readonly __brand: "d14" };

export let dd14: Interval & { readonly __brand: "dd14" };

export let m14: Interval & { readonly __brand: "m14" };

export let a13: Interval & { readonly __brand: "a13" };

export let da13: Interval & { readonly __brand: "da13" };

export let M14: Interval & { readonly __brand: "M14" };

export let d15: Interval & { readonly __brand: "d15" };

export let dd15: Interval & { readonly __brand: "dd15" };

export let P15: Interval & { readonly __brand: "P15" };

export let a14: Interval & { readonly __brand: "a14" };

export let da14: Interval & { readonly __brand: "da14" };

export let a15: Interval & { readonly __brand: "a15" };

export let da15: Interval & { readonly __brand: "da15" };
