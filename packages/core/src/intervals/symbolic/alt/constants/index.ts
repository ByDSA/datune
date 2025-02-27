import { lock } from "@datune/utils/immutables";
import * as DIntervals from "../../diatonic/constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import Interval from "../Interval";
import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MAJOR, MINOR, PERFECT } from "intervals/quality";

export function initialize() {
  if (PERFECT_UNISON)
    throw new TypeError("PERFECT_UNISON is already initialized");

  // eslint-disable-next-line max-len
  const { ELEVENTH, FIFTEENTH, FIFTH, FOURTEENTH, FOURTH, NINTH, OCTAVE, SECOND, SEVENTH, SIXTH, TENTH, THIRD, THIRTEENTH, TWELFTH, UNISON } = DIntervals;

  DIMINISHED_UNISON = fromIntervalQuality(
    UNISON,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_UNISON);
  PERFECT_UNISON = fromIntervalQuality(
    UNISON,
    PERFECT,
  ) as Interval;
  lock(PERFECT_UNISON);

  DIMINISHED_SECOND = fromIntervalQuality(
    SECOND,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_SECOND);

  MINOR_SECOND = fromIntervalQuality(
    SECOND,
    MINOR,
  ) as Interval;
  lock(MINOR_SECOND);

  AUGMENTED_UNISON = fromIntervalQuality(
    UNISON,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_UNISON);

  DOUBLY_AUGMENTED_UNISON = fromIntervalQuality(
    UNISON,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_UNISON);

  MAJOR_SECOND = fromIntervalQuality(
    SECOND,
    MAJOR,
  ) as Interval;
  lock(MAJOR_SECOND);

  DIMINISHED_THIRD = fromIntervalQuality(
    THIRD,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_THIRD);

  DOUBLY_DIMINISHED_THIRD = fromIntervalQuality(
    THIRD,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_THIRD);

  MINOR_THIRD = fromIntervalQuality(
    THIRD,
    MINOR,
  ) as Interval;
  lock(MINOR_THIRD);

  AUGMENTED_SECOND = fromIntervalQuality(
    SECOND,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_SECOND);

  DOUBLY_AUGMENTED_SECOND = fromIntervalQuality(
    SECOND,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_SECOND);

  MAJOR_THIRD = fromIntervalQuality(
    THIRD,
    MAJOR,
  ) as Interval;
  lock(MAJOR_THIRD);

  DIMINISHED_FOURTH = fromIntervalQuality(
    FOURTH,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_FOURTH);

  DOUBLY_DIMINISHED_FOURTH = fromIntervalQuality(
    FOURTH,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_FOURTH);

  PERFECT_FOURTH = fromIntervalQuality(
    FOURTH,
    PERFECT,
  ) as Interval;
  lock(PERFECT_FOURTH);

  AUGMENTED_THIRD = fromIntervalQuality(
    THIRD,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_THIRD);

  DOUBLY_AUGMENTED_THIRD = fromIntervalQuality(
    THIRD,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_THIRD);

  DIMINISHED_FIFTH = fromIntervalQuality(
    FIFTH,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_FIFTH);

  DOUBLY_DIMINISHED_FIFTH = fromIntervalQuality(
    FIFTH,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_FIFTH);

  AUGMENTED_FOURTH = fromIntervalQuality(
    FOURTH,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_FOURTH);

  DOUBLY_AUGMENTED_FOURTH = fromIntervalQuality(
    FOURTH,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_FOURTH);

  PERFECT_FIFTH = fromIntervalQuality(
    FIFTH,
    PERFECT,
  ) as Interval;
  lock(PERFECT_FIFTH);

  DIMINISHED_SIXTH = fromIntervalQuality(
    SIXTH,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_SIXTH);

  DOUBLY_DIMINISHED_SIXTH = fromIntervalQuality(
    SIXTH,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_SIXTH);

  MINOR_SIXTH = fromIntervalQuality(
    SIXTH,
    MINOR,
  ) as Interval;
  lock(MINOR_SIXTH);

  AUGMENTED_FIFTH = fromIntervalQuality(
    FIFTH,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_FIFTH);

  DOUBLY_AUGMENTED_FIFTH = fromIntervalQuality(
    FIFTH,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_FIFTH);

  MAJOR_SIXTH = fromIntervalQuality(
    SIXTH,
    MAJOR,
  ) as Interval;
  lock(MAJOR_SIXTH);

  DIMINISHED_SEVENTH = fromIntervalQuality(
    SEVENTH,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_SEVENTH);

  DOUBLY_DIMINISHED_SEVENTH = fromIntervalQuality(
    SEVENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_SEVENTH);

  MINOR_SEVENTH = fromIntervalQuality(
    SEVENTH,
    MINOR,
  ) as Interval;
  lock(MINOR_SEVENTH);

  AUGMENTED_SIXTH = fromIntervalQuality(
    SIXTH,
    AUGMENTED,
  ) as Interval;
  lock(AUGMENTED_SIXTH);

  DOUBLY_AUGMENTED_SIXTH = fromIntervalQuality(
    SIXTH,
    DOUBLY_AUGMENTED,
  ) as Interval;
  lock(DOUBLY_AUGMENTED_SIXTH);

  MAJOR_SEVENTH = fromIntervalQuality(
    SEVENTH,
    MAJOR,
  ) as Interval;
  lock(MAJOR_SEVENTH);

  DIMINISHED_OCTAVE = fromIntervalQuality(
    OCTAVE,
    DIMINISHED,
  ) as Interval;
  lock(DIMINISHED_OCTAVE);

  DOUBLY_DIMINISHED_OCTAVE = fromIntervalQuality(
    OCTAVE,
    DOUBLY_DIMINISHED,
  ) as Interval;
  lock(DOUBLY_DIMINISHED_OCTAVE);

  PERFECT_OCTAVE = fromIntervalQuality(
    OCTAVE,
    PERFECT,
  ) as Interval;
  lock(PERFECT_OCTAVE);

  AUGMENTED_SEVENTH = fromIntervalQuality(
    SEVENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_SEVENTH = fromIntervalQuality(
    SEVENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  DIMINISHED_NINTH = fromIntervalQuality(
    NINTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_NINTH = fromIntervalQuality(
    NINTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  MINOR_NINTH = fromIntervalQuality(
    NINTH,
    MINOR,
  ) as Interval;

  AUGMENTED_OCTAVE = fromIntervalQuality(
    OCTAVE,
    AUGMENTED,
  ) as Interval;

  MAJOR_NINTH = fromIntervalQuality(
    NINTH,
    MAJOR,
  ) as Interval;

  DIMINISHED_TENTH = fromIntervalQuality(
    TENTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_TENTH = fromIntervalQuality(
    TENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  MINOR_TENTH = fromIntervalQuality(
    TENTH,
    MINOR,
  ) as Interval;

  AUGMENTED_NINTH = fromIntervalQuality(
    NINTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_NINTH = fromIntervalQuality(
    NINTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  MAJOR_TENTH = fromIntervalQuality(
    TENTH,
    MAJOR,
  ) as Interval;

  DIMINISHED_ELEVENTH = fromIntervalQuality(
    ELEVENTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_ELEVENTH = fromIntervalQuality(
    ELEVENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  PERFECT_ELEVENTH = fromIntervalQuality(
    ELEVENTH,
    PERFECT,
  ) as Interval;

  AUGMENTED_TENTH = fromIntervalQuality(
    TENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_TENTH = fromIntervalQuality(
    TENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  DIMINISHED_TWELFTH = fromIntervalQuality(
    TWELFTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_TWELFTH = fromIntervalQuality(
    TWELFTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  AUGMENTED_ELEVENTH = fromIntervalQuality(
    ELEVENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_ELEVENTH = fromIntervalQuality(
    ELEVENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  PERFECT_TWELFTH = fromIntervalQuality(
    TWELFTH,
    PERFECT,
  ) as Interval;

  DIMINISHED_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  MINOR_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    MINOR,
  ) as Interval;

  AUGMENTED_TWELFTH = fromIntervalQuality(
    TWELFTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_TWELFTH = fromIntervalQuality(
    TWELFTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  MAJOR_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    MAJOR,
  ) as Interval;

  DIMINISHED_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  MINOR_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    MINOR,
  ) as Interval;

  AUGMENTED_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_THIRTEENTH = fromIntervalQuality(
    THIRTEENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  MAJOR_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    MAJOR,
  ) as Interval;

  DIMINISHED_FIFTEENTH = fromIntervalQuality(
    FIFTEENTH,
    DIMINISHED,
  ) as Interval;

  DOUBLY_DIMINISHED_FIFTEENTH = fromIntervalQuality(
    FIFTEENTH,
    DOUBLY_DIMINISHED,
  ) as Interval;

  PERFECT_FIFTEENTH = fromIntervalQuality(
    FIFTEENTH,
    PERFECT,
  ) as Interval;

  AUGMENTED_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_FOURTEENTH = fromIntervalQuality(
    FOURTEENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;

  AUGMENTED_FIFTEENTH = fromIntervalQuality(
    FIFTEENTH,
    AUGMENTED,
  ) as Interval;

  DOUBLY_AUGMENTED_FIFTEENTH = fromIntervalQuality(
    FIFTEENTH,
    DOUBLY_AUGMENTED,
  ) as Interval;
}

export let DIMINISHED_UNISON: Interval;

export let PERFECT_UNISON: Interval;

export let DIMINISHED_SECOND: Interval;

export let MINOR_SECOND: Interval;

export let AUGMENTED_UNISON: Interval;

export let DOUBLY_AUGMENTED_UNISON: Interval;

export let MAJOR_SECOND: Interval;

export let DIMINISHED_THIRD: Interval;

export let DOUBLY_DIMINISHED_THIRD: Interval;

export let MINOR_THIRD: Interval;

export let AUGMENTED_SECOND: Interval;

export let DOUBLY_AUGMENTED_SECOND: Interval;

export let MAJOR_THIRD: Interval;

export let DIMINISHED_FOURTH: Interval;

export let DOUBLY_DIMINISHED_FOURTH: Interval;

export let PERFECT_FOURTH: Interval;

export let AUGMENTED_THIRD: Interval;

export let DOUBLY_AUGMENTED_THIRD: Interval;

export let DIMINISHED_FIFTH: Interval;

export let DOUBLY_DIMINISHED_FIFTH: Interval;

export let AUGMENTED_FOURTH: Interval;

export let DOUBLY_AUGMENTED_FOURTH: Interval;

export let PERFECT_FIFTH: Interval;

export let DIMINISHED_SIXTH: Interval;

export let DOUBLY_DIMINISHED_SIXTH: Interval;

export let MINOR_SIXTH: Interval;

export let AUGMENTED_FIFTH: Interval;

export let DOUBLY_AUGMENTED_FIFTH: Interval;

export let MAJOR_SIXTH: Interval;

export let DIMINISHED_SEVENTH: Interval;

export let DOUBLY_DIMINISHED_SEVENTH: Interval;

export let MINOR_SEVENTH: Interval;

export let AUGMENTED_SIXTH: Interval;

export let DOUBLY_AUGMENTED_SIXTH: Interval;

export let MAJOR_SEVENTH: Interval;

export let DIMINISHED_OCTAVE: Interval;

export let DOUBLY_DIMINISHED_OCTAVE: Interval;

export let PERFECT_OCTAVE: Interval;

export let AUGMENTED_SEVENTH: Interval;

export let DOUBLY_AUGMENTED_SEVENTH: Interval;

export let DIMINISHED_NINTH: Interval;

export let DOUBLY_DIMINISHED_NINTH: Interval;

export let MINOR_NINTH: Interval;

export let AUGMENTED_OCTAVE: Interval;

export let MAJOR_NINTH: Interval;

export let DIMINISHED_TENTH: Interval;

export let DOUBLY_DIMINISHED_TENTH: Interval;

export let MINOR_TENTH: Interval;

export let AUGMENTED_NINTH: Interval;

export let DOUBLY_AUGMENTED_NINTH: Interval;

export let MAJOR_TENTH: Interval;

export let DIMINISHED_ELEVENTH: Interval;

export let DOUBLY_DIMINISHED_ELEVENTH: Interval;

export let PERFECT_ELEVENTH: Interval;

export let AUGMENTED_TENTH: Interval;

export let DOUBLY_AUGMENTED_TENTH: Interval;

export let DIMINISHED_TWELFTH: Interval;

export let DOUBLY_DIMINISHED_TWELFTH: Interval;

export let AUGMENTED_ELEVENTH: Interval;

export let DOUBLY_AUGMENTED_ELEVENTH: Interval;

export let PERFECT_TWELFTH: Interval;

export let DIMINISHED_THIRTEENTH: Interval;

export let DOUBLY_DIMINISHED_THIRTEENTH: Interval;

export let MINOR_THIRTEENTH: Interval;

export let AUGMENTED_TWELFTH: Interval;

export let DOUBLY_AUGMENTED_TWELFTH: Interval;

export let MAJOR_THIRTEENTH: Interval;

export let DIMINISHED_FOURTEENTH: Interval;

export let DOUBLY_DIMINISHED_FOURTEENTH: Interval;

export let MINOR_FOURTEENTH: Interval;

export let AUGMENTED_THIRTEENTH: Interval;

export let DOUBLY_AUGMENTED_THIRTEENTH: Interval;

export let MAJOR_FOURTEENTH: Interval;

export let DIMINISHED_FIFTEENTH: Interval;

export let DOUBLY_DIMINISHED_FIFTEENTH: Interval;

export let PERFECT_FIFTEENTH: Interval;

export let AUGMENTED_FOURTEENTH: Interval;

export let DOUBLY_AUGMENTED_FOURTEENTH: Interval;

export let AUGMENTED_FIFTEENTH: Interval;

export let DOUBLY_AUGMENTED_FIFTEENTH: Interval;
