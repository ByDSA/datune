import { lockr } from "@datune/utils/immutables";
import { SymbolicSPN as ISPN } from "../SymbolicSPN";
import type { Dto } from "./building/dto/Dto";
import type { Pitch } from "pitches/alt";

export class SPN implements ISPN<Pitch> {
  pitch: Pitch;

  octave: number;

  private constructor(dto: Dto) {
    this.pitch = dto.pitch;
    this.octave = dto.octave;
    lockr(this);
  }

  private static create(dto: Dto): SPN {
    return new SPN(dto);
  }

  valueOf(): number {
    return (+this.pitch * 197) + (this.octave * 199);
  }
}
