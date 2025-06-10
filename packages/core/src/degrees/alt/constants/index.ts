import type { Degree } from "../Degree";
import { Intervals } from "intervals/symbolic/alt";

export function initialize() {
  if (I)
    throw new Error("Already initialized");

  I = Intervals.P1;
  aI = Intervals.a1;
  bII = Intervals.m2;
  II = Intervals.M2;
  aII = Intervals.a2;
  bIII = Intervals.m3;
  III = Intervals.M3;
  aIII = Intervals.a3;
  IV = Intervals.P4;
  aIV = Intervals.a4;
  bV = Intervals.d5;
  V = Intervals.P5;
  aV = Intervals.a5;
  bVI = Intervals.m6;
  VI = Intervals.M6;
  aVI = Intervals.a6;
  bVII = Intervals.m7;
  VII = Intervals.M7;
  aVII = Intervals.a7;
}

export let I: Degree;

export let aI: Degree;

export let bII: Degree;

export let II: Degree;

export let aII: Degree;

export let bIII: Degree;

export let III: Degree;

export let aIII: Degree;

export let IV: Degree;

export let aIV: Degree;

export let bV: Degree;

export let V: Degree;

export let aV: Degree;

export let bVI: Degree;

export let VI: Degree;

export let aVI: Degree;

export let bVII: Degree;

export let VII: Degree;

export let aVII: Degree;
