import type { Channel } from "./track/Channel";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Instrument } from "./instrument/Instrument";
import { load,
  MidiFile,
  save } from "./midi-file";

const staticModule = {
  load,
  save,
};

type LazyType = object;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  mod as MidiFiles,
  MidiFile,
  Instrument,
  Channel,
};
