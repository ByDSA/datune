import * as fs from "node:fs";
import { Midi } from "@tonejs/midi";
import { MidiAdapter } from "./building/MidiAdapter";
import { MidiFile } from "./MidiFile";

export const load = (path: string): MidiFile | null => {
  try {
    const fileBuffer = fs.readFileSync(path);
    const midi = new Midi(fileBuffer);

    return new MidiAdapter(midi).adapt();
  } catch {
    return null;
  }
};
