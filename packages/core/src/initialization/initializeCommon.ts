import { initialize as initCDegreeFunctions } from "functions/chromatic/degree-function/constants";
import { initialize as initCCompoundFunctions } from "functions/chromatic/compound-function/constants";
import { initialize as initCOtherFunctions } from "functions/chromatic/others/constants";

export function initCFunctions() {
  initCDegreeFunctions();
  initCCompoundFunctions();
  initCOtherFunctions();
}
