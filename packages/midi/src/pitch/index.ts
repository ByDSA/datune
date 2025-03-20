import { createProxyBarrel } from "datils/patterns/proxy";
import * as Building from "./building";
import * as Constants from "./constants";
import { MidiCode } from "./MidiCode";
import { MidiPitch } from "./MidiPitch";

const staticModule = {
  ...Building,
};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.C4 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  MidiCode,
  MidiPitch,
  mod as MidiPitches,
};
