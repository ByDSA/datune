import type { Step } from "../../steps/Step";
import type { Interval } from "@datune/core";
import type { StepsGenerator } from "../StepsGenerator";
import type { SingleStepCombination, StepGroup } from "../../combiners/types";
import { compactStepCombinationsUnsafe } from "../compact-combinations";
import { combineStepGroups } from "../../combiners/combine-groups";
import { from } from "../../steps/single/building";

type Props = {
  maxInterval?: Interval;
  arrayLength: number;
};
export const generate: StepsGenerator<Props> = (props)=> {
  return {
    steps: new NearStepsGen(props).generateSteps(),
  };
};

type Props2 = Omit<Props, "maxInterval"> & Required<Pick<Props, "maxInterval">>;
class NearStepsGen {
  #props: Props2;

  constructor(props: Props) {
    this.#props = {
      ...props,
      maxInterval: props.maxInterval ?? 2,
    };
  }

  generateSteps(): Step[] {
    const singleStepCombinations = new Generator(this.#props).generateCombinations();

    if (singleStepCombinations.length === 0)
      return [];

    return compactStepCombinationsUnsafe(singleStepCombinations);
  }
}
class Generator {
  props: Props2;

  constructor(props: Props2) {
    this.props = props;
  }

  generateCombinations(): SingleStepCombination[] {
    const groups: StepGroup[] = [];

    for (let index = 0; index < this.props.arrayLength; index++) {
      const group = this.#generateIndexGroup(index);

      groups.push(group);
    }

    return combineStepGroups(groups);
  }

  #generateIndexGroup(index: number) {
    const group: StepGroup = [null]; // let pivot notes

    for (let j = -this.props.maxInterval; j <= this.props.maxInterval; j++) {
      if (j === 0)
        continue;

      const singleStep = from(index, j);

      group.push(singleStep);
    }

    return group;
  }
}
