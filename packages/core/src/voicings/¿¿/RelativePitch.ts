import { lockr } from "@datune/utils/immutables";
import type { OctavePitch } from "pitches/OctavePitch";

export class RelativePitch<P extends OctavePitch> {
  private constructor(public pitch: P, public octaveRelative: number) {
    lockr(this);
  }

  static from<P extends OctavePitch>(pitch: P, octaveRelative: number): RelativePitch<P> {
    return new RelativePitch(pitch, octaveRelative);
  }

  toString(): string {
    return `${this.pitch} ${this.octaveRelative}`;
  }
}
