import type { SPN as ISPN } from "../../spns/SPN";
import type { Dto } from "./caching/Dto";
import type { SPN } from "spns/chromatic";

export class ConcertPitch implements ISPN {
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
