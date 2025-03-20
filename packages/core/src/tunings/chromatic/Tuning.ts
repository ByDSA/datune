import type { Key } from "./caching/cache";
import type { ConcertPitch } from "concert-pitches/chromatic";
import type { Temperament } from "temperaments/chromatic";
import { deepFreeze } from "datils/datatypes/objects";

export class Tuning {
  concertPitch: ConcertPitch;

  temperament: Temperament;

  private constructor(key: Key) {
    this.concertPitch = key.concertPitch;
    this.temperament = key.temperament;

    deepFreeze(this);
  }

  toString(): string {
    return `${this.temperament} ${this.concertPitch}`;
  }
}
