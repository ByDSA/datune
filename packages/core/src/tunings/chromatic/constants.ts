import { from } from "./building/from";
import type { Tuning } from "./Tuning";
import { ConcertPitches } from "concert-pitches/chromatic";
import { Temperaments } from "temperaments/chromatic";

export function initialize() {
  const { ET12, LIMIT_5_SYMMETRIC_N1 } = Temperaments;

  EQUAL_440 = from( {
    concertPitch: ConcertPitches.A440,
    temperament: ET12,
  } );

  LIMIT_5_SYMMETRIC_N1_440 = from( {
    concertPitch: ConcertPitches.A440,
    temperament: LIMIT_5_SYMMETRIC_N1,
  } );
}

export let EQUAL_440: Tuning;

export let LIMIT_5_SYMMETRIC_N1_440: Tuning;
