import type * as Constants from "./constants";
import type { ScaleArray } from "./Array";
import type * as Building from "./building";
import { createProxyBarrel } from "datils/patterns/proxy";
import { MAJOR_SCALE_DEGREES } from "./constants/majorScaleDegrees";
import { Scale } from "./Scale";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Modifiers,
  MAJOR_SCALE_DEGREES,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Building;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.MAJOR && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
