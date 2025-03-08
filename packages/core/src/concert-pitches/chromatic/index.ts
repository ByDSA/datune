import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import { ConcertPitch } from "./ConcertPitch";
import { fromFrequencySPN } from "./building/frequencySPN";

const staticModule = {
  fromFrequencySPN,
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
