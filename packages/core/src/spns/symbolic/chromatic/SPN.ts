import { NUMBER, Pitch as OctavePitch, Pitch } from "pitches/chromatic";
import ISPN from "../SPN";
import { Dto } from "./building";

export default class SPN implements ISPN<OctavePitch> {
  pitch: Pitch;

  octave: number;

  private constructor(dto: Dto) {
    this.pitch = dto.pitch;
    this.octave = dto.octave;
  }

  valueOf(): number {
    return +this.pitch + this.octave * NUMBER;
  }

  toString(): string {
    return `${this.pitch}${this.octave}`;
  }
}
