import { MidiPitches } from "@datune/midi";
import { hzToBark } from "./bark";
import { midiToFrequency } from "./perception";
import { getFrequencyInteraction } from "./interaction";

it("should has interaction", () => {
  const f1 = midiToFrequency(MidiPitches.C5);
  const f2 = midiToFrequency(MidiPitches.E5);
  const b = getFrequencyInteraction(f1, f2);

  expect(b).toBe(1);
} );

it("should has non interaction", () => {
  const f1 = midiToFrequency(MidiPitches.B4);
  const f2 = midiToFrequency(MidiPitches.CC5);
  const n2 = MidiPitches.fromFrequency(f2);
  const b1 = hzToBark(f1);
  const b2 = hzToBark(f2);

  console.log(b1, b2);
  const bDiff = b2 - b1;
  const b = getFrequencyInteraction(f1, f2);

  console.log(f1.toFixed(0), f2.toFixed(0), n2.toString(), bDiff.toFixed(4), b.toFixed(4));

  // expect(b).toBe(0);
} );

it("should has no interaction", () => {
  const f1 = midiToFrequency(MidiPitches.F5);
  const f2 = midiToFrequency(MidiPitches.F6);
  const n2 = MidiPitches.fromFrequency(f2);
  const b1 = hzToBark(f1);
  const b2 = hzToBark(f2);

  console.log(b1, b2);
  const bDiff = b2 - b1;
  const b = getFrequencyInteraction(f1, f2);

  console.log(f1.toFixed(0), f2.toFixed(0), n2.toString(), bDiff.toFixed(4), b.toFixed(4));

  // expect(b).toBe(0);
} );
