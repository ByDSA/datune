import { Spn } from "@datune/core/spns/chromatic";
import { Constraint } from "../Constraint";

export abstract class ConstraintSpn extends Constraint {
  protected constructor(public spn: Spn, prob: number) {
    super(prob);
  }

  check(spn: Spn): boolean {
    if (this.isMustConstrain())
      return this.innerCheck(spn);

    return true;
  }

  protected abstract innerCheck(spn: Spn): boolean;
}
