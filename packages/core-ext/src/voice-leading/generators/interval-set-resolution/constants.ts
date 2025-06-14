import type { SingleStepArray } from "voice-leading/steps";
import { NonEmptyArray } from "datils/datatypes";
import { deepFreeze } from "datils/datatypes/objects";
import { compositeStepFromIntervals as cs } from "voice-leading/steps/composite/building";

export type ResolutionSteps = NonEmptyArray<SingleStepArray>;

export const DEFAULT_TRITONE_RESOLUTION: ResolutionSteps = [
  cs(1, 2),
  cs(1, -1),
  cs(1, -2),
  cs(2, 1),
  cs(2, -1),
  cs(2, -2),
  cs(-1, 1),
  cs(-1, 2),
  cs(-1, -2),
  cs(-2, 1),
  cs(-2, 2),
  cs(-2, -1),
].map(c=>c.singleSteps) as ResolutionSteps;
deepFreeze(DEFAULT_TRITONE_RESOLUTION);

const _ = undefined;

export const DEFAULT_AUGMENTED_RESOLUTION: ResolutionSteps = [
  cs(1, _, _),
  cs(-1, _, _),
  cs(_, 1, _),
  cs(_, -1, _),
  cs(_, _, 1),
  cs(_, _, -1),
  cs(1, 1, _),
  cs(_, 1, 1),
  cs(1, _, 1),
  cs(-1, -1, _),
  cs(_, -1, -1),
  cs(-1, _, -1),
  cs(1, -1, _),
  cs(-1, 1, _),
  cs(_, 1, -1),
  cs(_, -1, 1),
  cs(1, _, -1),
  cs(-1, _, 1),
].map(c=>c.singleSteps) as ResolutionSteps;
deepFreeze(DEFAULT_AUGMENTED_RESOLUTION);

export const DEFAULT_M2_RESOLUTION: ResolutionSteps = [
  cs(-1, 0),
  cs(-2, 0),
  cs(0, 1),
  cs(0, 2),
].map(c=>c.singleSteps) as ResolutionSteps;
deepFreeze(DEFAULT_M2_RESOLUTION);

export const DEFAULT_MINOR7_RESOLUTION: ResolutionSteps = [
  cs(1, 0),
  cs(2, 0),
  cs(0, -1),
  cs(0, -2),
].map(c=>c.singleSteps) as ResolutionSteps;
deepFreeze(DEFAULT_MINOR7_RESOLUTION);
