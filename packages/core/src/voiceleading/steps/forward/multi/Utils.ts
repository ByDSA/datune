import { NonEmptyArray } from "@datune/utils";
import { SPN } from "../../../../pitches";
import { StepCombiner } from "../../../../voiceleading/steps/combiner/StepCombiner";
import { CompositeStep } from "../../../../voiceleading/steps/composite/CompositeStep";
import { ReasonStepMap } from "../../../../voiceleading/steps/reason/ReasonStepMap";
import { SingleStep, SingleStepArray } from "../../../../voiceleading/steps/single/SingleStep";
import { Step, StepArray } from "../../../../voiceleading/steps/Step";

export function checkAndFixInputSPN(notes: SPN[]) {
    if (!notes || notes.length == 0)
        throw new Error("No notes");
    notes.sort((a, b) => a.valueOf() - b.valueOf());
}

export type MultiStepsGenResult = {
    combiner: StepCombiner,
    reasonsMap: ReasonStepMap
}

export function compactStepsArray(motions: SingleStepArray[]): StepArray {
    return <StepArray>motions.map(m => {
        if (m.length == 1)
            return <Step>m[0];
        else
            return <Step>CompositeStep.from(...m);
    });
}

export function expandStepsArray(steps: NonEmptyArray<Step>): NonEmptyArray<SingleStepArray> {
    return <NonEmptyArray<SingleStepArray>>steps.map(s => {
        if (s instanceof SingleStep)
            return <SingleStepArray>[s];
        else if (s instanceof CompositeStep)
            return s.singleSteps;
        throw new Error();
    })
}