import type { SPN as ISPN } from "../../spns/SPN";
import type { Key } from "./caching/cache";
import type { SPN } from "spns/chromatic";

export class ConcertPitch implements ISPN {
  frequency: number;

  spn: SPN;

  private constructor(key: Key) {
    this.frequency = key.frequency;
    this.spn = key.spn;
  }

  valueOf(): number {
    return this.frequency;
  }

  toString(): string {
    return `${this.spn}-${this.frequency}`;
  }
}
