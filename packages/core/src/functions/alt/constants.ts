import * as DegreeFuncConstants from "./degree-function/constants";
import * as CompoundFuncsConstants from "./compound-function/constants";
import * as OtherFuncsConstants from "./others/constants";

export function initialize() {
  if (DegreeFuncConstants.I)
    throw new Error("Already initialized");

  DegreeFuncConstants.initialize();
  CompoundFuncsConstants.initialize();
  OtherFuncsConstants.initialize();
}
