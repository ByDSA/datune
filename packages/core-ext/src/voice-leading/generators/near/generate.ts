import type { Interval } from "@datune/core";
import type { StepGroup, StepsGenerator } from "../StepsGenerator";
import type { SingleStep } from "voice-leading/steps";
import type { StepFilter } from "../filters";
import { from } from "../../steps/single/building";

export type NearGeneratorProps = {
  maxInterval?: Interval;
  arrayLength: number;
  filters?: StepFilter[];
};

export const generate: StepsGenerator<NearGeneratorProps> = (props)=> {
  return {
    groups: new NearStepsGen(props).generateGroups(),
  };
};

type Props2 = Omit<NearGeneratorProps, "maxInterval"> & Required<Pick<NearGeneratorProps, "maxInterval">>;
class NearStepsGen {
  #props: Props2;

  constructor(props: NearGeneratorProps) {
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

  #shouldAdd(singleStep: SingleStep): boolean {
    if (this.props.filters) {
      for (const f of this.props.filters) {
        if (!f(singleStep))
          return false;
      }
    }

    return true;
  }

  #generateIndexGroup(index: number) {
    const group: StepGroup = [null]; // let pivot notes

    for (let j = -this.props.maxInterval; j <= this.props.maxInterval; j++) {
      if (j === 0)
        continue;

      const singleStep = from(index, j);

      if (!this.#shouldAdd(singleStep))
        continue;

      group.push(singleStep);
    }

    return group;
  }
}
