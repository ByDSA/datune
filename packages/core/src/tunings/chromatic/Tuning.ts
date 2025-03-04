import type { Dto } from "./caching/Dto";
import type { ConcertPitch } from "concert-pitches/chromatic";
import type { Temperament } from "temperaments/chromatic";
import { lockr } from "@datune/utils/immutables";

export class Tuning {
  concertPitch: ConcertPitch;

  temperament: Temperament;

  private constructor(dto: Dto) {
    this.concertPitch = dto.concertPitch;
    this.temperament = dto.temperament;

    lockr(this);
  }

  private static create(dto: Dto): Tuning {
    return new Tuning(dto);
  }

  toString(): string {
    return `${this.temperament} ${this.concertPitch}`;
  }
}
