export enum StepReason {
    RESOLUTION_VOICING, RESOLUTION_KEY, NEAR
}

export function stringifyStepReason(reason: StepReason) {
  switch (reason) {
    case StepReason.NEAR: return "Near";
    case StepReason.RESOLUTION_KEY: return "Resolution Key";
    case StepReason.RESOLUTION_VOICING: return "Resolution Voicing";
    default: throw new Error();
  }
}
