import { Arrays } from "@datune/utils";
import { SPN } from "@datune/core/spns/chromatic";

export type SPNOrNullArray = Arrays.NonEmpty<(SPN | null)>;

export interface Step {
    apply(notes: SPNOrNullArray): SPNOrNullArray;
}

export type Target = Arrays.NonEmpty<SPN | null>;

export type StepOrNull = Step | null;

export type StepArray = Arrays.NonEmpty<Step>;

export function nonNullSteps(steps: StepOrNull[]): Step[] {
  return <Step[]>steps.filter((s) => !!s);
}
