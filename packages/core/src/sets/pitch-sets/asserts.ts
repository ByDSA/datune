import { throwErrorPopStack } from "datils/errors";
import { IPitchSet } from "./IPitchSet";

export const EMPTY_PITCH_SET_ERROR = new Error(
  "Cannot use an empty pitch set here.",
);

export function assertNotEmptyPitchSet<T, I>(
  pitchSet: IPitchSet<T, I>,
): void {
  if (pitchSet.size === 0)
    throwErrorPopStack(EMPTY_PITCH_SET_ERROR);
}
