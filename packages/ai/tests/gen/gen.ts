import { sample4 } from "../../src/gen/MidiFileManualSaving";

let ok = sample4().save("./out.mid");
console.log(ok ? "Saved!" : "Not saved");
