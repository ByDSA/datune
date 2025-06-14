import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import * as DegreeFuncConstants from "./degree-function/constants";

export function initialize() {
  assertNotInitialized(DegreeFuncConstants.I);

  DegreeFuncConstants.initialize();
}
