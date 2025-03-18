/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import type { Interval } from "../Interval";
import { frac } from "datils/math/num-exp";
import { from } from "../building";
import * as PT from "./Pythagorean";

export function initialize() {
  if (QUARTER_TONE)
    throw new Error("Already initialized");

  if (!PT.COMMA)
    PT.initialize();

  QUARTER_TONE = from(frac(246, 239));
  m2 = from(frac(16, 15));
  SEMITONE = m2;
  d3 = from(frac(256, 225));
  MAJOR_TONE = PT.M2;
  MINOR_TONE = from(frac(10, 9));
  a2 = from(frac(75, 64));
  m3 = from(frac(6, 5));
  M3 = from(frac(5, 4));
  a3 = from(frac(125, 96));
  P4 = PT.P4;
  a4 = from(frac(45, 32));
  a4_EXT = from(frac(25, 18));
  d5 = from(frac(64, 45));
  d5_EXT = from(frac(36, 25));
  LESSER_SEPTIMAL_TRITONE = from(frac(7, 5));
  GREATER_SEPTIMAL_TRITONE = from(frac(10, 7));
  P5 = PT.P5;
  a5 = from(frac(25, 16));
  m6 = from(frac(8, 5));
  M6 = from(frac(5, 3));
  d7 = from(frac(128, 75));
  a6 = from(frac(125, 72));
  a6_2 = from(frac(225, 128));
  m7_SMALL = PT.m7;
  m7_GREATER = from(frac(9, 5));
  M7 = from(frac(15, 8));
  a7 = from(frac(125, 64));
  P12 = from(frac(3, 1));
}

export let QUARTER_TONE: Interval;

export let m2: Interval;

export let SEMITONE: Interval;

export let d3: Interval;

export let MAJOR_TONE: Interval;

export let MINOR_TONE: Interval;

export let a2: Interval;

export let m3: Interval;

export let M3: Interval;

export let a3: Interval;

export let P4: Interval;

export let a4: Interval;

export let a4_EXT: Interval;

export let d5: Interval;

export let d5_EXT: Interval;

export let LESSER_SEPTIMAL_TRITONE: Interval;

export let GREATER_SEPTIMAL_TRITONE: Interval;

export let P5: Interval;

export let a5: Interval;

export let m6: Interval;

export let M6: Interval;

export let d7: Interval;

export let a6: Interval;

export let a6_2: Interval;

export let m7_SMALL: Interval;

export let m7_GREATER: Interval;

export let M7: Interval;

export let a7: Interval;

export let P12: Interval;
