/* eslint-disable import/no-mutable-exports */
import { lockr } from "@datune/utils/immutables";
import { A4 } from "spns/chromatic";
import fromFrequency from "../building/frequencySPN";
import ConcertPitch from "../ConcertPitch";

export function initialize(): void {
  if (A440)
    throw new TypeError("A440 is already initialized");

  A440 = fromFrequency(440, A4);
  lockr(A440);
  A432 = fromFrequency(432, A4);
  lockr(A432);
  A444 = fromFrequency(444, A4);
  lockr(A444);
}

export let A444: ConcertPitch;

export let A432: ConcertPitch;

export let A440: ConcertPitch;
