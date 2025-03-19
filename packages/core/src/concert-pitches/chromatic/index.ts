import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { ConcertPitch } from "./ConcertPitch";
import { fromFrequencySpn } from "./building/frequencySpn";

const staticModule = {
  fromFrequencySpn,
};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.A440 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  ConcertPitch,
  mod as ConcertPitches,
};
