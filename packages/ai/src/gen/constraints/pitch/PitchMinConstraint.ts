import { Spn } from "@datune/core/spns/chromatic";
import { ConstraintSpn } from "./ConstraintSpn";

export class PitchMinConstraint extends ConstraintSpn {
  constructor(minSpn: Spn, public probability: number = 100) {
    super(minSpn, probability);
  }

  protected innerCheck(spn: Spn): boolean {
    return spn >= this.spn;
  }
}
