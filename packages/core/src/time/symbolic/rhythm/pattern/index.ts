import * as Building from "./building";

import * as Constants from "./constants";

import * as Modifiers from "./modifiers";

import type { Pattern } from "./Pattern";

const staticModule = {
  ...Building,
  ...Constants,
  ...Modifiers,
};

export {
  Pattern,
  staticModule as Patterns,
};
