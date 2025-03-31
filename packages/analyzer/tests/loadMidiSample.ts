import { MidiFiles as MF } from "@datune/midi";

export async function loadMidiSample(name: string) {
  const midiPath = "../midi/tests/samples/" + name + ".mid";

  return await MF.load(midiPath);
}
