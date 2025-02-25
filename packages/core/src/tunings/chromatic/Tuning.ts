import { lockr } from "@datune/utils/immutables";
import { ConcertPitch } from "concert-pitches/chromatic";
import { Temperament } from "temperaments/chromatic";
import Dto from "./building/Dto";

export default class Tuning {
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
