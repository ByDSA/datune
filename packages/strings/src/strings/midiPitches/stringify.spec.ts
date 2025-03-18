import { Spns as N } from "@datune/core";
import { from, fromFrequency, type MidiPitch, initialize as initializeMidi } from "@datune/midi";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyMidiPitch } from ".";

TestLang.loadAll();
initializeMidi();

describe.each([
  [LangId.EN, fromFrequency(60), "B2 (-49)"],
  [LangId.EN, from(N.A4, -1200), "A5 (-1200)"],
  [LangId.EN, from(N.A4, 1200), "A5 (+1200)"],
  [LangId.ES, fromFrequency(440), "La5"],
])("stringify", (langId: LangId, pitch: MidiPitch, expected: string) => {
  it(`(${langId}, ${pitch}) => ${expected}`, () => {
    const actual = stringifyMidiPitch(pitch, {
      langId,
    } );

    expect(actual).toEqual(expected);
  } );
} );
