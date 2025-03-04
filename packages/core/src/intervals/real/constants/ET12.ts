import type { Interval } from "../Interval";
import { frac, pow2 } from "@datune/utils/math";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants";
import { from, fromCents } from "../building";

export function initialize() {
  QUARTER_TONE = from(pow2(frac(0.5, CNUMBER)));
  SEMITONE = fromCents(100);
  m2 = SEMITONE;
  M2 = fromCents(200);
  TONE = M2;
  m3 = fromCents(300);
  M3 = fromCents(400);
  P4 = fromCents(500);
  TRITONE = fromCents(600);
  P5 = fromCents(700);
  m6 = fromCents(800);
  M6 = fromCents(900);
  m7 = fromCents(1000);
  M7 = fromCents(1100);
}

export let QUARTER_TONE: Interval;

export let SEMITONE: Interval;

export let m2: Interval;

export let M2: Interval;

export let TONE: Interval;

export let m3: Interval;

export let M3: Interval;

export let P4: Interval;

export let TRITONE: Interval;

export let P5: Interval;

export let m6: Interval;

export let M6: Interval;

export let m7: Interval;

export let M7: Interval;
