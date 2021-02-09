import { CombinationResult } from "../../../applier/StepCombinationsApplier"
import { ReasonStepMap } from "../../../reason/ReasonStepMap"

export type MotionCreatorResult = {
    combinationResults: CombinationResult[],
    reasonsMap: ReasonStepMap
}