import { BPMs, MusicalDurations as MD } from "@datune/core";
import { TestInit } from "tests";
import { MidiFile } from "../../midi-file/MidiFile";
import { JSONGenerator } from "./JSONGenerator";

TestInit.initAll();
const { QUARTER_120 } = BPMs;
const { EIGHTH, SIXTYFOURTH, WHOLE } = MD;

it("tempo", () => {
  const expected = [
    {
      ticks: 0,
      bpm: 120,
    },
    {
      ticks: WHOLE / SIXTYFOURTH,
      bpm: 80,
    },
  ];
  const midiFile = MidiFile.create()
    .addBPM(QUARTER_120)
    .addBPM(BPMs.from(80, EIGHTH), WHOLE);
  const jsonGenerator = new JSONGenerator(midiFile);
  const actual = jsonGenerator.generate().header.tempos;

  expect(actual).toStrictEqual(expected);
} );
