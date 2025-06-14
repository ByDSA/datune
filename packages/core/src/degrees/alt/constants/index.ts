import type { Degree } from "../Degree";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { Intervals } from "intervals/symbolic/alt";

export function initialize() {
  assertNotInitialized(I);

  I = Intervals.P1;
  aI = Intervals.a1;
  aaI = Intervals.da1;

  bbII = Intervals.d2;
  bII = Intervals.m2;
  II = Intervals.M2;
  aII = Intervals.a2;
  aaII = Intervals.da2;

  bbIII = Intervals.d3;
  bIII = Intervals.m3;
  III = Intervals.M3;
  aIII = Intervals.a3;
  aaIII = Intervals.da3;
  bbbIII = Intervals.dd3;

  bIV = Intervals.d4;
  IV = Intervals.P4;
  aIV = Intervals.a4;
  aaIV = Intervals.da4;
  bbIV = Intervals.dd4;

  bV = Intervals.d5;
  V = Intervals.P5;
  aV = Intervals.a5;
  aaV = Intervals.da5;
  bbV = Intervals.dd5;

  bbVI = Intervals.d6;
  bVI = Intervals.m6;
  VI = Intervals.M6;
  aVI = Intervals.a6;
  aaVI = Intervals.da6;
  bbbVI = Intervals.dd6;

  bbVII = Intervals.d7;
  bVII = Intervals.m7;
  VII = Intervals.M7;
  bbbVII = Intervals.dd7;
}

// Grado I
export let I: Degree;

export let aI: Degree;

export let aaI: Degree;

// Grado II
export let bbII: Degree;

export let bII: Degree;

export let II: Degree;

export let aII: Degree;

export let aaII: Degree;

// Grado III
export let bbIII: Degree;

export let bIII: Degree;

export let III: Degree;

export let aIII: Degree;

export let aaIII: Degree;

export let bbbIII: Degree;

// Grado IV
export let bIV: Degree;

export let IV: Degree;

export let aIV: Degree;

export let aaIV: Degree;

export let bbIV: Degree;

// Grado V
export let bV: Degree;

export let V: Degree;

export let aV: Degree;

export let aaV: Degree;

export let bbV: Degree;

// Grado VI
export let bbVI: Degree;

export let bVI: Degree;

export let VI: Degree;

export let aVI: Degree;

export let aaVI: Degree;

export let bbbVI: Degree;

// Grado VII
export let bbVII: Degree;

export let bVII: Degree;

export let VII: Degree;

export let bbbVII: Degree;
