import { lockr } from "@datune/utils/immutables";
import { fromInt } from "../building";
import type { Interval } from "../Interval";

export function initialize() {
  if (UNISON)
    throw new Error("Already initialized");

  UNISON = fromInt(0);
  lockr(UNISON);
  SECOND = fromInt(1);
  lockr(SECOND);
  THIRD = fromInt(2);
  lockr(THIRD);
  FOURTH = fromInt(3);
  lockr(FOURTH);
  FIFTH = fromInt(4);
  lockr(FIFTH);
  SIXTH = fromInt(5);
  lockr(SIXTH);
  SEVENTH = fromInt(6);
  lockr(SEVENTH);
  OCTAVE = fromInt(7);
  lockr(OCTAVE);
  NINTH = fromInt(8);
  lockr(NINTH);
  TENTH = fromInt(9);
  lockr(TENTH);
  ELEVENTH = fromInt(10);
  lockr(ELEVENTH);
  TWELFTH = fromInt(11);
  lockr(TWELFTH);
  THIRTEENTH = fromInt(12);
  lockr(THIRTEENTH);
  FOURTEENTH = fromInt(13);
  lockr(FOURTEENTH);
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
