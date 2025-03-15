import type { Key } from "./caching/cache";
import type { ConcertPitch } from "concert-pitches/chromatic";
import type { Temperament } from "temperaments/chromatic";
import { lockr } from "@datune/utils/immutables";

export class Tuning {
  concertPitch: ConcertPitch;

  temperament: Temperament;

  private constructor(key: Key) {
    this.concertPitch = key.concertPitch;
    this.temperament = key.temperament;

    lockr(this);
  }

  toString(): string {
    return `${this.temperament} ${this.concertPitch}`;
  }
}
