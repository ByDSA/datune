import { SPN } from "@datune/core";

export interface ConstraintSPN {
    check(spn: SPN): boolean;
}