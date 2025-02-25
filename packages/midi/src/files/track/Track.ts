import { MidiNode } from "../../sequence/node";
import { Instrument } from "../instrument";
import Channel from "./Channel";

type Track = {
  name: string;

  nodes: MidiNode[];

  channel: Channel;

  instrument: Instrument;
};

export default Track;

const DEFAULT: Track = {
  name: "",
  nodes: [],
  channel: 0,
  instrument: Instrument.ACOUSTIC_PIANO,
};

export {
  DEFAULT,
};
