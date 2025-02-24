import { EIGHTH, SIXTYFOURTH, WHOLE } from "@datune/core/time";
import { from as bpmFrom, QUARTER_120 } from "@datune/core/time/symbolic/bpm";
import { TestInit } from "tests";
import MidiFile from "../../midi-file/MidiFile";
import JSONGenerator from "./JSONGenerator";

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
  // eslint-disable-next-line no-underscore-dangle
  const actual = (<any>jsonGenerator)._tempos();

  expect(actual).toStrictEqual(expected);
} );
