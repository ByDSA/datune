import { SPN } from "@datune/core";
import { ConstraintSPN } from "./ConstraintSPN";

export class PitchMinConstraint implements ConstraintSPN {
    constructor(private minSPN: SPN) {
    }

    check(spn: SPN): boolean {
        return spn >= this.minSPN;
    }
}