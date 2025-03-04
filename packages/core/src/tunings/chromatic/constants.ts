import type { Tuning } from "./Tuning";
import { ConcertPitches as CP } from "concert-pitches/chromatic";
import { Temperaments as TE } from "temperaments/chromatic";
import { from } from "./building/from";

export function initialize() {
  EQUAL_440 = from( {
    concertPitch: CP.A440,
    temperament: TE.ET12,
  } );

  LIMIT_5_SYMMETRIC_N1_440 = from( {
    concertPitch: CP.A440,
    temperament: TE.LIMIT_5_SYMMETRIC_N1,
  } );
}

export let EQUAL_440: Tuning;

export let LIMIT_5_SYMMETRIC_N1_440: Tuning;
