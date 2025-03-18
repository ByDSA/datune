import type { Spn as ISpn } from "../../spns/Spn";
import type { Key } from "./caching/cache";
import type { Spn } from "spns/chromatic";

export class ConcertPitch implements ISpn {
  frequency: number;

  spn: Spn;

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
