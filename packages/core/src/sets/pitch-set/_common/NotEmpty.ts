import { IPitchSet } from "../IPitchSet";

export const ERROR_EMPTY_PITCH_SET = new Error("PitchSet cannot be empty");

export function assertPitchSetNotEmpty<T, I>(pitchSet: IPitchSet<T, I>): void {
  if (pitchSet.size === 0)
    throw ERROR_EMPTY_PITCH_SET;
}
