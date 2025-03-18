import type { MusicalDuration } from "./MusicalDuration";
import { lock } from "datils/datatypes";
import { from } from "./building/from";

export function initialize() {
  if (QUARTER)
    throw new Error("Already initialized");

  MAXIMA = from(8);
  LONGA = from(4);
  DOUBLE = from(2);
  WHOLE = from(1);
  HALF = from(1 / 2.0);
  QUARTER = from(1 / 4.0);
  EIGHTH = from(1 / 8.0);
  SIXTEENTH = from(1 / 16.0);
  THIRTYSECOND = from(1 / 32.0);
  SIXTYFOURTH = from(1 / 64.0);

  MIN = SIXTYFOURTH;

  ZERO = from(0);

  lock(MAXIMA);
  lock(LONGA);
  lock(DOUBLE);
  lock(WHOLE);
  lock(HALF);
  lock(QUARTER);
  lock(EIGHTH);
  lock(SIXTEENTH);
  lock(THIRTYSECOND);
  lock(SIXTYFOURTH);
  lock(MIN);
  lock(ZERO);
}

export let MIN: MusicalDuration;

export let ZERO: MusicalDuration;

export let MAXIMA: MusicalDuration;

export let LONGA: MusicalDuration;

export let DOUBLE: MusicalDuration;

export let WHOLE: MusicalDuration;

export let HALF: MusicalDuration;

export let QUARTER: MusicalDuration;

export let EIGHTH: MusicalDuration;

export let SIXTEENTH: MusicalDuration;

export let THIRTYSECOND: MusicalDuration;

export let SIXTYFOURTH: MusicalDuration;
