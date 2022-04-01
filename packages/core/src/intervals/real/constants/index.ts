import { lock } from "@datune/utils/immutables";
import { from, fromCents } from "../building";
import Interval from "../Interval";
import { initialize as commasInitialize } from "./Commas";
import { initialize as et12Initialize } from "./ET12";
import { initialize as justInitialize } from "./Just";
import { initialize as ptInitialize } from "./Pythagorean";

/* eslint-disable import/no-mutable-exports */

export function initialize() {
  if (UNISON)
    throw new TypeError("UNISON is already initialized");

  UNISON = from(1);
  lock(UNISON);
  OCTAVE = from(2);
  lock(OCTAVE);
  CENT = fromCents(1);
  lock(CENT);

  commasInitialize();
  et12Initialize();
  justInitialize();
  ptInitialize();
}

export let UNISON: Interval;

export let OCTAVE: Interval;

export let CENT: Interval;

export {
  MAJOR_SECOND as ET12_MAJOR_SECOND,
  MAJOR_SEVENTH as ET12_MAJOR_SEVENTH,
  MAJOR_SIXTH as ET12_MAJOR_SIXTH,
  MAJOR_THIRD as ET12_MAJOR_THIRD,
  MINOR_SECOND as ET12_MINOR_SECOND,
  MINOR_SEVENTH as ET12_MINOR_SEVENTH,
  MINOR_SIXTH as ET12_MINOR_SIXTH,
  MINOR_THIRD as ET12_MINOR_THIRD,
  PERFECT_FIFTH as ET12_PERFECT_FIFTH,
  PERFECT_FOURTH as ET12_PERFECT_FOURTH,
  QUARTER_TONE as ET12_QUARTER_TONE,
  SEMITONE as ET12_SEMITONE,
  TRITONE as ET12_TRITONE,
} from "./ET12";

export {
  AUGMENTED_FIFTH as J_AUGMENTED_FIFTH,
  AUGMENTED_FOURTH as J_AUGMENTED_FOURTH,
  AUGMENTED_FOURTH_EXT as J_AUGMENTED_FOURTH_EXT,
  AUGMENTED_SECOND as J_AUGMENTED_SECOND,
  AUGMENTED_SEVENTH as J_AUGMENTED_SEVENTH,
  AUGMENTED_SIXTH as J_AUGMENTED_SIXTH,
  AUGMENTED_THIRD as J_AUGMENTED_THIRD,
  DIMINISHED_FIFTH as J_DIMINISHED_FIFTH,
  DIMINISHED_FIFTH_EXT as J_DIMINISHED_FIFTH_EXT,
  DIMINISHED_SEVENTH as J_DIMINISHED_SEVENTH,
  DIMINISHED_THIRD as J_DIMINISHED_THIRD,
  GREATER_SEPTIMAL_TRITONE as J_GREATER_SEPTIMAL_TRITONE,
  LESSER_SEPTIMAL_TRITONE as J_LESSER_SEPTIMAL_TRITONE,
  MAJOR_SEVENTH as J_MAJOR_SEVENTH,
  MAJOR_SIXTH as J_MAJOR_SIXTH,
  MAJOR_THIRD as J_MAJOR_THIRD,
  MAJOR_TONE as J_MAJOR_TONE,
  MINOR_SECOND as J_MINOR_SECOND,
  MINOR_SEVENTH_GREATER as J_MINOR_SEVENTH_GREATER,
  MINOR_SEVENTH_SMALL as J_MINOR_SEVENTH_SMALL,
  MINOR_SIXTH as J_MINOR_SIXTH,
  MINOR_THIRD as J_MINOR_THIRD,
  MINOR_TONE as J_MINOR_TONE,
  PERFECT_FIFTH as J_PERFECT_FIFTH,
  PERFECT_FOURTH as J_PERFECT_FOURTH,
  QUARTER_TONE as J_QUARTER_TONE,
} from "./Just";

export {
  AUGMENTED_FIFTH as PT_AUGMENTED_FIFTH,
  AUGMENTED_FOURTH as PT_AUGMENTED_FOURTH,
  AUGMENTED_SECOND as PT_AUGMENTED_SECOND,
  AUGMENTED_SEVENTH as PT_AUGMENTED_SEVENTH,
  AUGMENTED_SIXTH as PT_AUGMENTED_SIXTH,
  AUGMENTED_THIRD as PT_AUGMENTED_THIRD,
  AUGMENTED_UNISON as PT_AUGMENTED_UNISON,
  COMMA as PT_COMMA,
  DIMINISHED_FIFTH as PT_DIMINISHED_FIFTH,
  DIMINISHED_FOURTH as PT_DIMINISHED_FOURTH,
  DIMINISHED_OCTAVE as PT_DIMINISHED_OCTAVE,
  DIMINISHED_SECOND as PT_DIMINISHED_SECOND,
  DIMINISHED_SEVENTH as PT_DIMINISHED_SEVENTH,
  DIMINISHED_SIXTH as PT_DIMINISHED_SIXTH,
  DIMINISHED_THIRD as PT_DIMINISHED_THIRD,
  MAJOR_SECOND as PT_MAJOR_SECOND,
  MAJOR_SEVENTH as PT_MAJOR_SEVENTH,
  MAJOR_SIXTH as PT_MAJOR_SIXTH,
  MAJOR_THIRD as PT_MAJOR_THIRD,
  MINOR_SECOND as PT_MINOR_SECOND,
  MINOR_SEVENTH as PT_MINOR_SEVENTH,
  MINOR_SIXTH as PT_MINOR_SIXTH,
  MINOR_THIRD as PT_MINOR_THIRD,
  PERFECT_FIFTH as PT_PERFECT_FIFTH,
  PERFECT_FOURTH as PT_PERFECT_FOURTH,
  TRITONE as PT_TRITONE,
} from "./Pythagorean";