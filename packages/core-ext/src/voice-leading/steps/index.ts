import { type SingleStepArray, singleStepsSortByIndex } from "./single/Array";
import { singleStepFrom } from "./single/building";
import * as SingleStepConstants from "./single/constants";
import { singleStepReIndex, singleStepReInterval } from "./single/modifiers";
import { type Step } from "./Step";
import { SingleStep } from "./single/SingleStep";
import { CompositeStep } from "./composite/CompositeStep";
import { compositeStepFromIntervals, compositeStepFromSingleSteps } from "./composite/building";
import * as CompositeStepConstants from "./composite/constants";
import { flattenStep, flattenStepArray } from "./flattenSteps";

const staticModule = {
  singleStepFrom,
  singleStepsSortByIndex,
  ...SingleStepConstants,
  singleStepReIndex,
  singleStepReInterval,
  compositeStepFromSingleSteps,
  compositeStepFromIntervals,
  ...CompositeStepConstants,
  flattenStep,
  flattenStepArray,
};

export {
  Step,
  SingleStep,
  SingleStepArray,
  CompositeStep,
  staticModule as Steps,
};
