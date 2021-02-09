import { NonEmptyArray } from "@datune/utils";
import { SPN } from "../../pitches";

export type SPNOrNullArray = NonEmptyArray<(SPN | null)>;

export interface Step {
    apply(notes: SPNOrNullArray): SPNOrNullArray;
}

export type Target = NonEmptyArray<SPN | null>;

export type StepOrNull = Step | null;

export type StepArray = NonEmptyArray<Step>;

export function nonNullSteps(steps: StepOrNull[]): Step[] {
    return <Step[]>steps.filter(s => !!s);
}