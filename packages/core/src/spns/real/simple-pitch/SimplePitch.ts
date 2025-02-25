import { lockr } from "@datune/utils/immutables";
import RealPitch from "../RealPitch";

export default class SimplePitch implements RealPitch {
  private frequency: number;

  constructor(frequency: number) {
    this.frequency = frequency;
    lockr(this);
  }

  valueOf(): number {
    return this.frequency;
  }
}
