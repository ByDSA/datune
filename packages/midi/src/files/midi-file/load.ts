import { Midi } from "@tonejs/midi";
import * as fs from "fs";
import MidiAdapter from "./building/MidiAdapter";
import MidiFile from "./MidiFile";

export default (path: string): MidiFile | null => {
  try {
    const fileBuffer = fs.readFileSync(path);
    const midi = new Midi(fileBuffer);

    return new MidiAdapter(midi).adapt();
  } catch (err) {
    return null;
  }
};
