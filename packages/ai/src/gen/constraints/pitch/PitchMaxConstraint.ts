import { Spn } from "@datune/core/spns/chromatic";
import { ConstraintSpn } from "./ConstraintSpn";

export class PitchMaxConstraint extends ConstraintSpn {
  constructor(maxSpn: Spn, public probability: number = 100) {
    super(maxSpn, probability);
  }

  protected innerCheck(spn: Spn): boolean {
    return spn <= this.spn;
  }
}
