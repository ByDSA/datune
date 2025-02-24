import { SPN } from "@datune/core/spns/chromatic";
import { Dto } from "./caching";

export default class Pitch {
  spn: SPN;

  detuned: number;

  private constructor(dto: Dto) {
    this.spn = dto.spn;
    this.detuned = dto.detuned;
  }

  valueOf(): number {
    // return 69 + 12 * Math.log2(<number> this._precalcFrequencyWithoutDetuned / 440);
    return +this.spn + 12;
  }

  toString(): string {
    return String(this.spn.pitch) + (this.spn.octave + 1) + getCentsTxt(this.detuned);
  }
}

function getCentsTxt(detuned: number): string {
  if (detuned > 0)
    return ` (+${detuned})`;

  if (detuned < 0)
    return ` (${detuned})`;

  return "";
}
