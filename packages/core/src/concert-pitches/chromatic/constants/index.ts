import type { ConcertPitch } from "../ConcertPitch";
import { deepFreeze } from "datils/datatypes/objects";
import { Spns as N } from "spns/chromatic";
import { fromFrequencySpn } from "../building/frequencySpn";

export function initialize(): void {
  if (A440)
    throw new Error("Already initialized");

  A440 = fromFrequencySpn(440, N.A4);
  deepFreeze(A440);
  A432 = fromFrequencySpn(432, N.A4);
  deepFreeze(A432);
  A444 = fromFrequencySpn(444, N.A4);
  deepFreeze(A444);
}

export let A444: ConcertPitch;

export let A432: ConcertPitch;

export let A440: ConcertPitch;
