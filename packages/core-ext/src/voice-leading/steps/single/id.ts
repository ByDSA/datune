import { SingleStepArray } from "./Array";
import { SingleStep } from "./SingleStep";

export function singleStepsGetObjId(singleSteps: SingleStepArray): string {
  return singleSteps
    .sort((a, b) => a.index - b.index) // Ordenar por índice
    .map(singleStepGetObjId) // Id de cada SingleStep
    .join("|");
}

export function singleStepGetObjId(singleStep: SingleStep): string {
  return `${singleStep.index}-${singleStep.interval}`;
}
