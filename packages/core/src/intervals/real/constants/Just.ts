import { frac } from "@datune/utils/math";
import { from } from "../building";
import type { Interval } from "../Interval";
import { initialize as PTinitialize, MAJOR_SECOND as PT_MAJOR_SECOND,
  MINOR_SEVENTH as PT_MINOR_SEVENTH,
  PERFECT_FIFTH as PT_PERFECT_FIFTH,
  PERFECT_FOURTH as PT_PERFECT_FOURTH } from "./Pythagorean";

export function initialize() {
  if (QUARTER_TONE)
    throw new Error("Already initialized");

  PTinitialize();
  QUARTER_TONE = from(frac(246, 239));
  MINOR_SECOND = from(frac(16, 15));
  SEMITONE = MINOR_SECOND;
  DIMINISHED_THIRD = from(frac(256, 225));
  MAJOR_TONE = PT_MAJOR_SECOND;
  MINOR_TONE = from(frac(10, 9));
  AUGMENTED_SECOND = from(frac(75, 64));
  MINOR_THIRD = from(frac(6, 5));
  MAJOR_THIRD = from(frac(5, 4));
  AUGMENTED_THIRD = from(frac(125, 96));
  PERFECT_FOURTH = PT_PERFECT_FOURTH;
  AUGMENTED_FOURTH = from(frac(45, 32));
  AUGMENTED_FOURTH_EXT = from(frac(25, 18));
  DIMINISHED_FIFTH = from(frac(64, 45));
  DIMINISHED_FIFTH_EXT = from(frac(36, 25));
  LESSER_SEPTIMAL_TRITONE = from(frac(7, 5));
  GREATER_SEPTIMAL_TRITONE = from(frac(10, 7));
  PERFECT_FIFTH = PT_PERFECT_FIFTH;
  AUGMENTED_FIFTH = from(frac(25, 16));
  MINOR_SIXTH = from(frac(8, 5));
  MAJOR_SIXTH = from(frac(5, 3));
  DIMINISHED_SEVENTH = from(frac(128, 75));
  AUGMENTED_SIXTH = from(frac(125, 72));
  AUGMENTED_SIXTH2 = from(frac(225, 128));
  MINOR_SEVENTH_SMALL = PT_MINOR_SEVENTH;
  MINOR_SEVENTH_GREATER = from(frac(9, 5));
  MAJOR_SEVENTH = from(frac(15, 8));
  AUGMENTED_SEVENTH = from(frac(125, 64));
  PERFECT_TWELFTH = from(frac(3, 1));
}

export let QUARTER_TONE: Interval;

export let MINOR_SECOND: Interval;

export let SEMITONE: Interval;

export let DIMINISHED_THIRD: Interval;

export let MAJOR_TONE: Interval;

export let MINOR_TONE: Interval;

export let AUGMENTED_SECOND: Interval;

export let MINOR_THIRD: Interval;

export let MAJOR_THIRD: Interval;

export let AUGMENTED_THIRD: Interval;

export let PERFECT_FOURTH: Interval;

export let AUGMENTED_FOURTH: Interval;

export let AUGMENTED_FOURTH_EXT: Interval;

export let DIMINISHED_FIFTH: Interval;

export let DIMINISHED_FIFTH_EXT: Interval;

export let LESSER_SEPTIMAL_TRITONE: Interval;

export let GREATER_SEPTIMAL_TRITONE: Interval;

export let PERFECT_FIFTH: Interval;

export let AUGMENTED_FIFTH: Interval;

export let MINOR_SIXTH: Interval;

export let MAJOR_SIXTH: Interval;

export let DIMINISHED_SEVENTH: Interval;

export let AUGMENTED_SIXTH: Interval;

export let AUGMENTED_SIXTH2: Interval;

export let MINOR_SEVENTH_SMALL: Interval;

export let MINOR_SEVENTH_GREATER: Interval;

export let MAJOR_SEVENTH: Interval;

export let AUGMENTED_SEVENTH: Interval;

export let PERFECT_TWELFTH: Interval;
