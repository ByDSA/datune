import { SPN } from "@datune/core/spns/chromatic";
import Constraint from "../Constraint";

export default abstract class ConstraintSPN extends Constraint {
  protected constructor(public spn: SPN, prob: number) {
    super(prob);
  }

  check(spn: SPN): boolean {
    if (this.isMustConstrain())
      return this.innerCheck(spn);

    return true;
  }

  protected abstract innerCheck(spn: SPN): boolean;
}
