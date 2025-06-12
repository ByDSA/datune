import { initialize as initCDegreeFuncs } from "functions/chromatic/degree-function/constants";
import { initialize as initCCompoundFuncs } from "functions/chromatic/compound-function/constants";

export function initCFuncs() {
  initCDegreeFuncs();
  initCCompoundFuncs();
}
