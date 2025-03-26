import type { Midi as ToneJsMidi } from "@tonejs/midi";

export function getMidiTempo(midi: ToneJsMidi) {
  const bpm = midi.header.tempos.length > 0 ? midi.header.tempos[0].bpm : null;

  return bpm;
}
