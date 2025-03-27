import { createProxyBarrel } from "datils/patterns/proxy";
import { MidiNote } from "./note/MidiNote";
import { noteFrom } from "./note/building/from";
import { MidiTimeline } from "./MidiTimeline";
import { MidiTimelineNode } from "./node/MidiNode";
import { nodeFrom } from "./node/building";

const staticModule = {
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
  MidiTimelineNode,
  MidiTimeline,
  mod as MidiTimelines,
};
