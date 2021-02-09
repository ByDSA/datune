import { SPN } from "@datune/core";
import { ChromaticInterval } from "@datune/core/intervals";
import { Constraint } from "../Constraint";

export class PitchDistanceConstraint extends Constraint {
    constructor(private distance: number, public probability: number = 100) {
        super(probability);
    }

    check(spn1: SPN, spn2: SPN): boolean {
        if (this.isMustConstrain())
            return Math.abs(ChromaticInterval.betweenSPN(spn1, spn2)) <= this.distance;
        return true;
    }
}