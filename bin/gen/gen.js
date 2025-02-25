const { save } = require("../../node_modules/@datune/midi/files/midi-file");
const { sample4 } = require("../../dist/gen/MidiFileManualSaving");
const midiFile = sample4();
const ok = save(midiFile, "./outt5.mid");

console.log(ok ? "Saved!" : "Not saved");
