import RealPitch from "../../spns/real/RealPitch";
import type { Dto } from "./caching/Dto";
import { SPN } from "spns/chromatic";

export default class ConcertPitch implements RealPitch {
  frequency: number;

  spn: SPN;

  private constructor(dto: Dto) {
    this.frequency = dto.frequency;
    this.spn = dto.spn;
  }

  valueOf(): number {
    return this.frequency;
  }

  toString(): string {
    return `${this.spn}-${this.frequency}`;
  }
}
