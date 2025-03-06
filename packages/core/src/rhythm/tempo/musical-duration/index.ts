import type * as fromType from "./building/from";
import type * as fromMillisAndBPM from "./building/fromMillisAndBPM";
import type * as Constants from "./constants";
import type { MusicalDuration } from "./MusicalDuration";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof fromMillisAndBPM & typeof fromType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/from",
    "building/fromMillisAndBPM",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.QUARTER && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  MusicalDuration,
  mod as MusicalDurations,
};
