import type { Tuning } from "./Tuning";
import * as CP from "concert-pitches/chromatic/constants";
import * as TE from "temperaments/chromatic/constants";
import { from } from "./building/from";

export function initialize() {
  if (EQUAL_440)
    throw new Error("Already initialized");

  if (!CP.A440)
    CP.initialize();

  if (!TE.ET12)
    TE.initialize();

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
