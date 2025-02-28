import { SPN } from "@datune/core/spns/chromatic";
import { ConstraintSPN } from "./ConstraintSPN";

export class PitchMaxConstraint extends ConstraintSPN {
  constructor(maxSPN: SPN, public probability: number = 100) {
    super(maxSPN, probability);
  }

  protected innerCheck(spn: SPN): boolean {
    return spn <= this.spn;
  }
}
