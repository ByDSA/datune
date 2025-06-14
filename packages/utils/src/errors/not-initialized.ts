import { throwErrorPopStack } from "datils/errors/stack";

const ALREADY_INITIALIZED_ERROR = new Error(
  "This value has already been initialized.",
);

export function assertNotInitialized(value: unknown): asserts value is undefined {
  if (value !== undefined)
    throwErrorPopStack(ALREADY_INITIALIZED_ERROR);
}
