import { frac, pow2 } from "@datune/utils/math";
import { from, fromCents } from "../building";
import Interval from "../Interval";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants";

export function initialize() {
  QUARTER_TONE = from(pow2(frac(0.5, CNUMBER)));
  SEMITONE = fromCents(100);
  MINOR_SECOND = SEMITONE;
  MAJOR_SECOND = fromCents(200);
  TONE = MAJOR_SECOND;
  MINOR_THIRD = fromCents(300);
  MAJOR_THIRD = fromCents(400);
  PERFECT_FOURTH = fromCents(500);
  TRITONE = fromCents(600);
  PERFECT_FIFTH = fromCents(700);
  MINOR_SIXTH = fromCents(800);
  MAJOR_SIXTH = fromCents(900);
  MINOR_SEVENTH = fromCents(1000);
  MAJOR_SEVENTH = fromCents(1100);
}

export let QUARTER_TONE: Interval;

export let SEMITONE: Interval;

export let MINOR_SECOND: Interval;

export let MAJOR_SECOND: Interval;

export let TONE: Interval;

export let MINOR_THIRD: Interval;

export let MAJOR_THIRD: Interval;

export let PERFECT_FOURTH: Interval;

export let TRITONE: Interval;

export let PERFECT_FIFTH: Interval;

export let MINOR_SIXTH: Interval;

export let MAJOR_SIXTH: Interval;

export let MINOR_SEVENTH: Interval;

export let MAJOR_SEVENTH: Interval;
