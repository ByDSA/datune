import type { Interval } from "../Interval";
import { deepFreeze } from "datils/datatypes/objects";
import { fromInt } from "../building";

export function initialize() {
  if (UNISON)
    throw new Error("Already initialized");

  UNISON = fromInt(0);
  deepFreeze(UNISON);
  SECOND = fromInt(1);
  deepFreeze(SECOND);
  THIRD = fromInt(2);
  deepFreeze(THIRD);
  FOURTH = fromInt(3);
  deepFreeze(FOURTH);
  FIFTH = fromInt(4);
  deepFreeze(FIFTH);
  SIXTH = fromInt(5);
  deepFreeze(SIXTH);
  SEVENTH = fromInt(6);
  deepFreeze(SEVENTH);
  OCTAVE = fromInt(7);
  deepFreeze(OCTAVE);
  NINTH = fromInt(8);
  deepFreeze(NINTH);
  TENTH = fromInt(9);
  deepFreeze(TENTH);
  ELEVENTH = fromInt(10);
  deepFreeze(ELEVENTH);
  TWELFTH = fromInt(11);
  deepFreeze(TWELFTH);
  THIRTEENTH = fromInt(12);
  deepFreeze(THIRTEENTH);
  FOURTEENTH = fromInt(13);
  deepFreeze(FOURTEENTH);
  FIFTEENTH = fromInt(14);
}

export let UNISON: Interval;

export let SECOND: Interval;

export let THIRD: Interval;

export let FOURTH: Interval;

export let FIFTH: Interval;

export let SIXTH: Interval;

export let SEVENTH: Interval;

export let OCTAVE: Interval;

export let NINTH: Interval;

export let TENTH: Interval;

export let ELEVENTH: Interval;

export let TWELFTH: Interval;

export let THIRTEENTH: Interval;

export let FOURTEENTH: Interval;

export let FIFTEENTH: Interval;
