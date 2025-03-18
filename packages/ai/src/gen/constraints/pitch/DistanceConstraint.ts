import { Spn } from "@datune/core/spns/chromatic";
import { betweenSpn } from "@datune/core/intervals/symbolic/chromatic/building";
import { Constraint } from "../Constraint";

export class PitchDistanceConstraint extends Constraint {
  constructor(private distance: number, public probability: number = 100) {
    super(probability);
  }

  check(spn1: Spn, spn2: Spn): boolean {
    if (this.isMustConstrain())
      return Math.abs(betweenSpn(spn1, spn2)) <= this.distance;

    return true;
  }
}
