import { SingleStepArray } from "./Array";

export function hashSingleSteps(singleSteps: SingleStepArray): string {
  return singleSteps
    .map(v=>(`${v.index}-${v.interval}`)) // Hash de cada SingleStep
    .sort((a, b) => a.localeCompare(b)) // Ordenar por índice
    .join("|");
}
