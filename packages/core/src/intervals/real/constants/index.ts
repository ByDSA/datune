/* eslint-disable camelcase */
import type { Interval } from "../Interval";
import { freeze } from "datils/datatypes/objects";
import { from, fromCents } from "../building";
import { initialize as commasInitialize } from "./Commas";
import { initialize as et12Initialize } from "./ET12";
import { initialize as justInitialize } from "./Just";

export function initialize() {
  if (UNISON)
    throw new Error("Already initialized");

  UNISON = from(1);
  freeze(UNISON);
  OCTAVE = from(2);
  freeze(OCTAVE);
  CENT = fromCents(1);
  freeze(CENT);

  commasInitialize();
  et12Initialize();
  justInitialize();
}

export let UNISON: Interval;

export let OCTAVE: Interval;

export let CENT: Interval;

export {
  M2 as ET12_M2,
  M7 as ET12_M7,
  M6 as ET12_M6,
  M3 as ET12_M3,
  m2 as ET12_m2,
  m7 as ET12_m7,
  m6 as ET12_m6,
  m3 as ET12_m3,
  P5 as ET12_P5,
  P4 as ET12_P4,
  QUARTER_TONE as ET12_QUARTER_TONE,
  SEMITONE as ET12_SEMITONE,
  TRITONE as ET12_TRITONE,
} from "./ET12";

export {
  a5 as J_a5,
  a4 as J_a4,
  a4_EXT as J_a4_EXT,
  a2 as J_a2,
  a7 as J_a7,
  a6 as J_a6,
  a3 as J_a3,
  d5 as J_d5,
  d5_EXT as J_d5_EXT,
  d7 as J_d7,
  d3 as J_d3,
  GREATER_SEPTIMAL_TRITONE as J_GREATER_SEPTIMAL_TRITONE,
  LESSER_SEPTIMAL_TRITONE as J_LESSER_SEPTIMAL_TRITONE,
  M7 as J_M7,
  M6 as J_M6,
  M3 as J_M3,
  MAJOR_TONE as J_MAJOR_TONE,
  m2 as J_m2,
  m7_GREATER as J_m7_GREATER,
  m7_SMALL as J_m7_SMALL,
  m6 as J_m6,
  m3 as J_m3,
  MINOR_TONE as J_MINOR_TONE,
  P5 as J_P5,
  P4 as J_P4,
  QUARTER_TONE as J_QUARTER_TONE,
} from "./Just";

export {
  a5 as PT_a5,
  a4 as PT_a4,
  a2 as PT_a2,
  a7 as PT_a7,
  a6 as PT_a6,
  a3 as PT_a3,
  a1 as PT_a1,
  COMMA as PT_COMMA,
  d5 as PT_d5,
  d4 as PT_d4,
  d8 as PT_d8,
  d2 as PT_d2,
  d7 as PT_d7,
  d6 as PT_d6,
  d3 as PT_d3,
  M2 as PT_M2,
  M7 as PT_M7,
  M6 as PT_M6,
  M3 as PT_M3,
  m2 as PT_m2,
  m7 as PT_m7,
  m6 as PT_m6,
  m3 as PT_m3,
  P5 as PT_P5,
  P4 as PT_P4,
  TRITONE as PT_TRITONE,
} from "./Pythagorean";
