import { EIGHTH, SIXTYFOURTH, WHOLE } from "@datune/core/time/symbolic/musical-duration/constants";
import { QUARTER_120 } from "@datune/core/time/symbolic/bpm/constants";
import { from as bpmFrom } from "@datune/core/time/symbolic/bpm/building";
import { MidiFile } from "../../midi-file/MidiFile";
import { JSONGenerator } from "./JSONGenerator";
import { TestInit } from "tests";

TestInit.initAll();

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
    .addBPM(bpmFrom(80, EIGHTH), WHOLE);
  const jsonGenerator = new JSONGenerator(midiFile);
  const actual = jsonGenerator.generate().header.tempos;

  expect(actual).toStrictEqual(expected);
} );
