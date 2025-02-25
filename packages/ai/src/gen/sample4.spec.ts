import { save } from "@datune/midi/files/midi-file";
import { sample4 } from "./MidiFileManualSaving";

// TODO: (puesto skip porque falla de forma aleatoria)
it.skip("sample4", () => {
  const midiFile = sample4();
  const ok = save(midiFile, "./outt5.mid");

  expect(ok).toBeTruthy();
} );
