import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { PitchSet } from "./PitchSet";
import * as Building from "./building";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.C5 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  PitchSet as NoteSet,
  mod as PitchSets,
};
