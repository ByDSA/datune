import { Arrays } from "@datune/utils";
import { SPN } from "spns/chromatic";
import { StepCombiner } from "../../combiner/StepCombiner";
import { CompositeStep } from "../../composite/CompositeStep";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { Array as SingleStepArray, SingleStep } from "../../single";
import { Step, StepArray } from "../../Step";

export function checkAndFixInputSPN(notes: SPN[]) {
  if (!notes || notes.length == 0)
    throw new Error("No notes");

  notes.sort((a, b) => a.valueOf() - b.valueOf());
}

export type MultiStepsGenResult = {
    combiner: StepCombiner;
    reasonsMap: ReasonStepMap;
};

export function compactStepsArray(motions: SingleStepArray[]): StepArray {
  return <StepArray>motions.map((m) => {
    if (m.length == 1)
      return <Step>m[0];

    return <Step>CompositeStep.from(...m);
  } );
}

export function expandStepsArray(steps: Arrays.NonEmpty<Step>): Arrays.NonEmpty<SingleStepArray> {
  return <Arrays.NonEmpty<SingleStepArray>>steps.map((s) => {
    if (s instanceof SingleStep)
      return <SingleStepArray>[s];

    if (s instanceof CompositeStep)
      return s.singleSteps;

    throw new Error();
  } );
}
