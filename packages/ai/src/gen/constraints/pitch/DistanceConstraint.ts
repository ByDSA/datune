import { SPN } from "@datune/core/spns/chromatic";
import { betweenSPN } from "@datune/core/intervals/chromatic";
import Constraint from "../Constraint";

export default class PitchDistanceConstraint extends Constraint {
  constructor(private distance: number, public probability: number = 100) {
    super(probability);
  }

  check(spn1: SPN, spn2: SPN): boolean {
    if (this.isMustConstrain())
      return Math.abs(betweenSPN(spn1, spn2)) <= this.distance;

    return true;
  }
}
