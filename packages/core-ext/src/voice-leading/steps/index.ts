import { type SingleStepArray, sortByIndex as singleStepsSortByIndex } from "./single/Array";
import { from as singleStepFrom } from "./single/building";
import * as SingleStepConstants from "./single/constants";
import { reIndex, reInterval } from "./single/modifiers";
import { type Step } from "./Step";
import { SingleStep } from "./single/SingleStep";
import { CompositeStep } from "./composite/CompositeStep";
import { fromIntervals as compositeStepFromIntervals, fromSingleSteps as compositeStepFromSingleSteps } from "./composite/building";
import * as CompositeStepConstants from "./composite/constants";
import { flattenStep, flattenStepArray } from "./flattenSteps";

const staticModule = {
  singleStepFrom,
  singleStepsSortByIndex,
  ...SingleStepConstants,
  singleStepReIndex: reIndex,
  singleStepReInterval: reInterval,
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
