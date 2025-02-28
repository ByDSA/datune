import { frac } from "@datune/utils/math";
import { from } from "../building";
import type { Interval } from "../Interval";

export let COMMA: Interval;

export let AUGMENTED_UNISON: Interval;

export let DIMINISHED_SECOND: Interval;

export let MINOR_SECOND: Interval;

export let DIMINISHED_THIRD: Interval;

export let MAJOR_SECOND: Interval;

export let MINOR_THIRD: Interval;

export let AUGMENTED_SECOND: Interval;

export let DIMINISHED_FOURTH: Interval;

export let MAJOR_THIRD: Interval;

export let PERFECT_FOURTH: Interval;

export let AUGMENTED_THIRD: Interval;

export let DIMINISHED_FIFTH: Interval;

export let TRITONE: Interval;

export let AUGMENTED_FOURTH: Interval;

export let DIMINISHED_SIXTH: Interval;

export let PERFECT_FIFTH: Interval;

export let MINOR_SIXTH: Interval;

export let AUGMENTED_FIFTH: Interval;

export let DIMINISHED_SEVENTH: Interval;

export let MAJOR_SIXTH: Interval;

export let MINOR_SEVENTH: Interval;

export let AUGMENTED_SIXTH: Interval;

export let DIMINISHED_OCTAVE: Interval;

export let MAJOR_SEVENTH: Interval;

export let AUGMENTED_SEVENTH: Interval;

export function initialize() {
  COMMA = from(frac(531441, 524288));
  AUGMENTED_UNISON = from(frac(2187, 2048));
  DIMINISHED_SECOND = from(frac(524288, 531441)); // lower than 1
  MINOR_SECOND = from(frac(256, 243));
  DIMINISHED_THIRD = from(frac(65536, 59049));
  MAJOR_SECOND = from(frac(9, 8));
  MINOR_THIRD = from(frac(32, 27));
  AUGMENTED_SECOND = from(frac(19683, 16384));
  DIMINISHED_FOURTH = from(frac(8192, 6561));
  MAJOR_THIRD = from(frac(81, 64));
  PERFECT_FOURTH = from(frac(4, 3));
  AUGMENTED_THIRD = from(frac(177147, 131072));
  DIMINISHED_FIFTH = from(frac(1024, 729));
  TRITONE = DIMINISHED_FIFTH;
  AUGMENTED_FOURTH = from(frac(729, 512));
  DIMINISHED_SIXTH = from(frac(262144, 177147));
  PERFECT_FIFTH = from(frac(3, 2));
  MINOR_SIXTH = from(frac(128, 81));
  AUGMENTED_FIFTH = from(frac(6561, 4096));
  DIMINISHED_SEVENTH = from(frac(32768, 19683));
  MAJOR_SIXTH = from(frac(27, 16));
  MINOR_SEVENTH = from(frac(16, 9));
  AUGMENTED_SIXTH = from(frac(59049, 32768));
  DIMINISHED_OCTAVE = from(frac(4096, 2187));
  MAJOR_SEVENTH = from(frac(243, 128));
  AUGMENTED_SEVENTH = from(frac(531441, 262144));
}
