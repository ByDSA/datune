import { lockr } from "@datune/utils/immutables";
import { fromFrequencySPN } from "../building/frequencySPN";
import type { ConcertPitch } from "../ConcertPitch";
import { SPNs } from "spns/chromatic";

export function initialize(): void {
  if (A440)
    throw new TypeError("A440 is already initialized");

  A440 = fromFrequencySPN(440, SPNs.A4);
  lockr(A440);
  A432 = fromFrequencySPN(432, SPNs.A4);
  lockr(A432);
  A444 = fromFrequencySPN(444, SPNs.A4);
  lockr(A444);
}

export let A444: ConcertPitch;

export let A432: ConcertPitch;

export let A440: ConcertPitch;
