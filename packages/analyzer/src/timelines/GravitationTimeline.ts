import { ParallelTimeline } from "@datune/utils";
import { SingleStep, Step } from "@datune/core-ext/voice-leading";
import { Spn } from "@datune/core";
import { DEFAULT_TIMELINE_PARAMS } from "./ConstructorObjType";

export const enum GravitationType {
  Key = "key",
  Voicing = "voicing"
}

export type Gravitation = {
  type: "key";
  spn: Spn;
  stepInterval: SingleStep["interval"];
} | {
  type: "voicing";
  spns: Spn[];
  step: Step;
};

export class GravitationTimeline extends ParallelTimeline<Gravitation> {
  constructor(obj?: ConstructorParameters<typeof ParallelTimeline>[0]) {
    super( {
      ...DEFAULT_TIMELINE_PARAMS,
      ...obj,
    } );
  }
}
