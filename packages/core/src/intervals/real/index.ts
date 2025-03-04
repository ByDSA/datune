import type { Interval } from "./Interval";
import type { IntervalArray } from "./Array";
import type * as Constants from "./constants";
import type * as ModifierShiftOctaves from "./modifiers/shiftOctaves";
import type * as ModifierNeg from "./modifiers/neg";
import type * as ModifierMult from "./modifiers/mult";
import { createProxyBarrel } from "lazy-load";
import * as IndependentModifiers from "./modifiers/independentModifiers";
import * as Building from "./building";

const staticModule = {
  ...Building,
  ...IndependentModifiers,
};

type LazyType = Omit<typeof Constants, "initialize">
  & typeof ModifierMult
  & typeof ModifierNeg
  & typeof ModifierShiftOctaves;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "modifiers/shiftOctaves",
    "modifiers/mult",
    "modifiers/neg",
    {
      path: "constants",
      omit: ["initialize"],
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
};
