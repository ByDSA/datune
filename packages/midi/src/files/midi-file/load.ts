import * as fs from "node:fs";
import { Midi as ToneJsMidi } from "@tonejs/midi";
import { fromToneJsMidi } from "./building/fromToneJsMidi";
import { MidiFile } from "./MidiFile";

export const load = async (path: string): Promise<MidiFile> => {
  const fileBuffer = await fs.promises.readFile(path);
  const toneJsMidi = new ToneJsMidi(fileBuffer);

  return fromToneJsMidi(toneJsMidi);
};
