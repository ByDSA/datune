import { Step } from "../../steps/Step";

export function expectSteps(actual: Step[]) {
  return {
    toEqual: (expected: Step[]) => {
      expect(new Set(actual)).toEqual(new Set(expected));
    },
  };
}
