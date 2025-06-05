import type { OctavePitch } from "pitches/OctavePitch";
import { deepFreeze } from "datils/datatypes/objects";

export class RelativePitch<I, P extends OctavePitch<I>> {
  private constructor(public pitch: P, public octaveRelative: number) {
    deepFreeze(this);
  }

  static from<I, P extends OctavePitch<I>>(pitch: P, octaveRelative: number): RelativePitch<I, P> {
    return new RelativePitch(pitch, octaveRelative);
  }

  toString(): string {
    return `${this.pitch} ${this.octaveRelative}`;
  }
}
