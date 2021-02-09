import { BPM, MusicalDuration } from "@datune/core";
import { MidiFile } from "../../midifile/MidiFile";
import { JSONGenerator } from "./JSONGenerator";

it(`tempo`, () => {
    const expected = [
        {
            ticks: 0,
            bpm: 120
        },
        {
            ticks: MusicalDuration.WHOLE.value / MusicalDuration.SIXTYFOURTH.value,
            bpm: 80
        }
    ];
    const midiFile = MidiFile.create()
        .addBPM(BPM.QUARTER_120)
        .addBPM(BPM.from(80, MusicalDuration.EIGHTH), MusicalDuration.WHOLE);
    const jsonGenerator = new JSONGenerator(midiFile)
    const actual = (<any>jsonGenerator)._tempos();

    expect(actual).toStrictEqual(expected);
});