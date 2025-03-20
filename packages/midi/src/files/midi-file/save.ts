import * as fs from "node:fs";
import { BPMs } from "@datune/core/rhythm/tempo/bpm";
import { fromFrac } from "@datune/core/rhythm/tempo/time-signature/building";
import { Midi } from "@tonejs/midi";
import { JSONGenerator } from "../json/jsongenerator/JSONGenerator";
import { MidiFile } from "./MidiFile";

export const save = async (mf: MidiFile, path: string): Promise<void> => {
  const midi = new Midi();

  initializeUninitializedValues(mf);
  const json = new JSONGenerator(mf).generate();

  midi.fromJSON(json);
  const array = midi.toArray();

  await fs.promises.writeFile(path, array);
};

function initializeUninitializedValues(mf: MidiFile): void {
  if (mf.bpmEvents.length === 0)
    mf.addBPM(BPMs.QUARTER_120);

  if (mf.timeSignatureEvents.length === 0)
    mf.addTimeSignature(fromFrac(4));
}
