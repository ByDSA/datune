import { SingleStepArray } from "voice-leading/steps";
import { from as singleStepFrom } from "../steps/single/building";

export type StepCombinerTransformProps = {
  stepCombination: SingleStepArray;
  hasIndex: (n: number)=> boolean;
};

export type StepCombinerTransform = (props: StepCombinerTransformProps)=> void;

// Rellenar con 0 los steps no definidos
export function createFillZerosTransform(spnArrayLength: number): StepCombinerTransform {
  return ( { stepCombination, hasIndex } ) => {
    for (let i = 0; i < spnArrayLength; i++) {
      if (!hasIndex(i))
        stepCombination.push(singleStepFrom(i, 0));
    }
  };
}
