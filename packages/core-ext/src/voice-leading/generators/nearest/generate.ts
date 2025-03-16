import type { Interval } from "@datune/core";
import type { StepGroup, StepsGenerator } from "../StepsGenerator";
import { from } from "../../steps/single/building";

type Props = {
  maxInterval?: Interval;
  arrayLength: number;
};
export const generate: StepsGenerator<Props> = (props)=> {
  return {
    groups: new NearStepsGen(props).generateGroups(),
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

  generateGroups(): StepGroup[] {
    return new Generator(this.#props).generateGroups();
  }
}
class Generator {
  props: Props2;

  constructor(props: Props2) {
    this.props = props;
  }

  generateGroups(): StepGroup[] {
    const groups: StepGroup[] = [];

    for (let index = 0; index < this.props.arrayLength; index++) {
      const group = this.#generateIndexGroup(index);

      groups.push(group);
    }

    return groups;
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
