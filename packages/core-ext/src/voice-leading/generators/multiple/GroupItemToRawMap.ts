import { CompositeStep, SingleStep, type Step } from "voice-leading/steps";
import { RawMap } from "voice-leading/combiners/RawMap";
import { singleStepGetObjId, singleStepsGetObjId } from "voice-leading/steps/single/id";
import { RawCombination } from "voice-leading/combiners/types";

export class GroupItemToRawsMap extends RawMap<Step, RawCombination, string> {
  protected getObjId(groupItem: Step): string {
    if (groupItem instanceof SingleStep)
      return singleStepGetObjId(groupItem);
    else if (groupItem instanceof CompositeStep)
      return singleStepsGetObjId(groupItem.singleSteps);

    throw new Error();
  }
}
