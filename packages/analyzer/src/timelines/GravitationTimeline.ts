import { ParallelTimeline } from "@datune/utils";
import { SingleStep, Step } from "@datune/core-ext/voice-leading";
import { Spn } from "@datune/core";
import { DEFAULT_TIMELINE_PARAMS } from "./ConstructorObjType";

export const enum GravitationType {
  Key = "key",
  IntervalSet = "intervalSet"
}

export type Gravitation = {
  type: "intervalSet";
  spns: Spn[];
  step: Step;
} | {
  type: "key";
  spn: Spn;
  stepInterval: SingleStep["interval"];
};

export class GravitationTimeline extends ParallelTimeline<Gravitation> {
  constructor(obj?: ConstructorParameters<typeof ParallelTimeline>[0]) {
    super( {
      ...DEFAULT_TIMELINE_PARAMS,
      ...obj,
    } );
  }
}
