import { StepOrNull } from "../../steps/Step";

export function expectSteps(actual: StepOrNull[]) {
  return {
    toEqual: (expected: StepOrNull[]) => {
      expect(new Set(actual)).toEqual(new Set(expected));
    },
  };
}
