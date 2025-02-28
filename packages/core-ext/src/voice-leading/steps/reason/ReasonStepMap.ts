/* eslint-disable no-continue */
import { CompositeStep } from "../composite/CompositeStep";
import { SingleStep } from "../single";
import { StepArray } from "../Step";
import { StepReason } from "./StepReason";

type SingleStepReasons = {
    singleStep: SingleStep;
    reasons: StepReason[];
};

export class ReasonStepMap {
    #mapSM: Map<SingleStep, SingleStepReasons>;

    private constructor() {
      this.#mapSM = new Map<SingleStep, SingleStepReasons>();
    }

    static create(): ReasonStepMap {
      return new ReasonStepMap();
    }

    add(reason: StepReason, ...ms: StepArray) {
      for (const m of ms) {
        if (m instanceof SingleStep)
          this.#addMotion(reason, (<SingleStep>m));
        else if (m instanceof CompositeStep) {
          for (const sm of (<CompositeStep>m).singleSteps)
            this.#addMotion(reason, sm);
        }
      }
    }

    #addMotion(reason: StepReason, sm: SingleStep) {
      let result = this.#mapSM.get(sm);

      if (!result) {
        result = {
          singleStep: sm,
          reasons: [],
        };
      }

      this.#mapSM.set(sm, result);
      result.reasons.push(reason);
    }

    addMap(motionCombiner: ReasonStepMap) {
      this.#addCombinerMotions(motionCombiner);
    }

    #addCombinerMotions(newResults: ReasonStepMap) {
      let newValues = newResults.#mapSM.values();

      for (const smmt of newValues) {
        let result = this.#mapSM.get(smmt.singleStep);
        const sm = smmt.singleStep;

        if (!result) {
          this.#mapSM.set(sm, smmt);
          continue;
        }

        for (const type of smmt.reasons)
          result.reasons.push(type);
      }
    }

    getReasonsFrom(sm: SingleStep): StepReason[] | null {
      const smmt = this.#mapSM.get(sm);

      if (!smmt)
        return null;

      return smmt.reasons;
    }
}
