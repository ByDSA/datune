import { createProxyBarrel } from "datils/patterns/proxy";
import { MidiNote } from "./note/MidiNote";
import { noteFrom } from "./note/building/from";
import { MidiSequence } from "./MidiSequence";
import { MidiNode } from "./node/MidiNode";
import { nodeFrom } from "./node/building";

export const staticModule = {
  noteFrom,
  nodeFrom,
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
  type MidiNote,
  type MidiNode,
  MidiSequence,
  mod as MidiSequences,
};
