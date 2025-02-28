import { SPN } from "@datune/core/spns/chromatic";
import { ConstraintSPN } from "./ConstraintSPN";

export class PitchMinConstraint extends ConstraintSPN {
  constructor(minSPN: SPN, public probability: number = 100) {
    super(minSPN, probability);
  }

  protected innerCheck(spn: SPN): boolean {
    return spn >= this.spn;
  }
}
