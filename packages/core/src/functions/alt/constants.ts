import * as DegreeFunctionConstants from "./degree-function/constants";
import * as CompoundFunctionsConstants from "./compound-function/constants";
import * as OtherFunctionsConstants from "./others/constants";

export function initialize() {
  if (DegreeFunctionConstants.I)
    throw new Error("Already defined");

  DegreeFunctionConstants.initialize();
  CompoundFunctionsConstants.initialize();
  OtherFunctionsConstants.initialize();
}
