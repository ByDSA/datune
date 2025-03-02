import { SymbolicSPN as ISPN } from "../SymbolicSPN";
import type { Dto } from "./building/dto/Dto";
import { Pitches, Pitch } from "pitches/chromatic";

export class SPN implements ISPN<Pitch> {
  pitch: Pitch;

  octave: number;

  private constructor(dto: Dto) {
    this.pitch = dto.pitch;
    this.octave = dto.octave;
  }

  valueOf(): number {
    return +this.pitch + (this.octave * Pitches.NUMBER);
  }

  toString(): string {
    return `${this.pitch}${this.octave}`;
  }
}
