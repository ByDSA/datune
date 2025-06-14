import type { Tuning } from "./Tuning";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import * as CP from "concert-pitches/chromatic/constants";
import * as TE from "temperaments/chromatic/constants";
import { from } from "./building/from";

export function initialize() {
  assertNotInitialized(EQUAL_440);

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
