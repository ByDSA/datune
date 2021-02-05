import { SPN } from "@datune/core";
import { ConstraintSPN } from "./ConstraintSPN";

export class PitchMaxConstraint implements ConstraintSPN {
    constructor(private maxSPN: SPN) {
    }

    check(spn: SPN): boolean {
        return spn <= this.maxSPN;
    }
}