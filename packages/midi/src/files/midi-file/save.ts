import * as fs from "node:fs";
import { QUARTER_120 } from "@datune/core/time/symbolic/bpm/constants";
import { fromFrac } from "@datune/core/time/symbolic/rhythm/signature/building";
import { Midi } from "@tonejs/midi";
import { JSONGenerator } from "../json/jsongenerator/JSONGenerator";
import { MidiFile } from "./MidiFile";

export const save = (mf: MidiFile, path: string): boolean => {
  const midi = new Midi();

  initializeUninitializedValues(mf);
  const json = new JSONGenerator(mf).generate();

  midi.fromJSON(json);
  const array = midi.toArray();

  try {
    fs.writeFileSync(path, array);
  } catch {
    return false;
  }

  return true;
};

function initializeUninitializedValues(mf: MidiFile): void {
  if (mf.bpmEvents.length === 0)
    mf.addBPM(QUARTER_120);

  if (mf.timeSignatureEvents.length === 0)
    mf.addTimeSignature(fromFrac(4));
}
