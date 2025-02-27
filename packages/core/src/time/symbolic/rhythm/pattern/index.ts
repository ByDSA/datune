import * as Building from "./building";

import * as Constants from "./constants";

import * as Modifiers from "./modifiers";

import { default as Pattern } from "./Pattern";

const Patterns = {
  ...Building,
  ...Constants,
  ...Modifiers,
};

export {
  Pattern,
  Patterns,
};
