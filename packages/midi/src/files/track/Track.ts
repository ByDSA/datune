import type { MidiTimelineNode } from "../../timeline/node/MidiNode";
import type { Channel } from "./Channel";
import { Instrument } from "../instrument";

export type Track = {
  name: string;

  nodes: MidiTimelineNode[];

  channel: Channel;

  instrument: Instrument;
};

const DEFAULT: Track = {
  name: "",
  nodes: [],
  channel: 0,
  instrument: Instrument.ACOUSTIC_PIANO,
};

export {
  DEFAULT,
};
