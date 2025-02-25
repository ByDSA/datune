import { lockr } from "@datune/utils/immutables";
import { Pitch } from "pitches/alt";
import ISPN from "../SPN";
import { Dto } from "./building";

export default class SPN implements ISPN<Pitch> {
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
    return +this.pitch * 197 + this.octave * 199;
  }
}
