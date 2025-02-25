/* eslint-disable import/no-mutable-exports */
import { A440 } from "concert-pitches/chromatic";
import { ET12, LIMIT_5_SYMMETRIC_N1 } from "temperaments/chromatic";
import { from } from "./building";
import Tuning from "./Tuning";

export function initialize() {
  EQUAL_440 = from( {
    concertPitch: A440,
    temperament: ET12,
  } );

  LIMIT_5_SYMMETRIC_N1_440 = from( {
    concertPitch: A440,
    temperament: LIMIT_5_SYMMETRIC_N1,
  } );
}

export let EQUAL_440: Tuning;

export let LIMIT_5_SYMMETRIC_N1_440: Tuning;
