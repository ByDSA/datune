import { throwErrorPopStack } from "datils/errors";
import { IIntervalSet } from "./IIntervalSet";

export const EMPTY_INTERVAL_SET_ERROR = new Error(
  "Cannot use an empty interval set here.",
);

export function assertNotEmptyIntervalSet<T>(
  intervalSet: IIntervalSet<T>,
): void {
  if (intervalSet.size === 0)
    throwErrorPopStack(EMPTY_INTERVAL_SET_ERROR);
}
