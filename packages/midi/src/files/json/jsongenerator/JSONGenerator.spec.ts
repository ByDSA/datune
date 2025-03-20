import { BPMs, MusicalDurations as MD } from "@datune/core";
import { MidiFile } from "../../midi-file/MidiFile";
import { JSONGenerator } from "./JSONGenerator";

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
  const midiFile = new MidiFile()
    .addBPM(QUARTER_120)
    .addBPM(BPMs.from(80, EIGHTH), WHOLE);
  const jsonGenerator = new JSONGenerator(midiFile);
  const actual = jsonGenerator.generate().header.tempos;

  expect(actual).toStrictEqual(expected);
} );
