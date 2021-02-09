import { CompositeStep } from "../composite/CompositeStep";
import { SingleStep } from "../single/SingleStep";
import { Step, StepArray } from "../Step";
import { StepReason } from "./StepReason";

type SingleStepReasons = {
    singleStep: SingleStep,
    reasons: StepReason[]
}

export class ReasonStepMap {
    private _mapSM: Map<SingleStep, SingleStepReasons>;

    private constructor() {
        this._mapSM = new Map<SingleStep, SingleStepReasons>();
    }

    static create(): ReasonStepMap {
        return new ReasonStepMap();
    }

    add(reason: StepReason, ...ms: StepArray) {
        for (const m of ms) {
            if (m instanceof SingleStep) {
                this._addMotion(reason, (<SingleStep>m));
            } else if (m instanceof CompositeStep) {
                for (const sm of (<CompositeStep>m).singleSteps) {
                    this._addMotion(reason, sm);
                }
            }
        }
    }

    private _addMotion(reason: StepReason, sm: SingleStep) {
        let result = this._mapSM.get(sm);
        if (!result) {
            result = {
                singleStep: sm,
                reasons: []
            };
        }
        this._mapSM.set(sm, result);
        result.reasons.push(reason);
    }

    addMap(motionCombiner: ReasonStepMap) {
        this._addCombinerMotions(motionCombiner);
    }

    private _addCombinerMotions(newResults: ReasonStepMap) {
        let newValues = newResults._mapSM.values();
        for (const smmt of newValues) {
            let result = this._mapSM.get(smmt.singleStep);
            const sm = smmt.singleStep;
            if (!result) {
                this._mapSM.set(sm, smmt);
                continue;
            }

            for (const type of smmt.reasons)
                result.reasons.push(type);
        }
    }

    getReasonsFrom(sm: SingleStep): StepReason[] | null {
        const smmt = this._mapSM.get(sm);
        if (!smmt)
            return null;
        return smmt.reasons;
    }
}