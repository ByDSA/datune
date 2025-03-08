import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "lazy-load";
import { Degree } from "./Degree";
import * as Modifiers from "./modifiers";
import * as Building from "./building";
import { DegreeArray } from "./Array";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.I && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
