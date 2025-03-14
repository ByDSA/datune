import type { CompositeStep } from "./CompositeStep";
import type { SingleStepArray } from "../single/Array";

export const compositeStepToSingleSteps = new Map<CompositeStep, SingleStepArray>();

export const singleStepsHashToCompositeStep = new Map<string, CompositeStep>();
