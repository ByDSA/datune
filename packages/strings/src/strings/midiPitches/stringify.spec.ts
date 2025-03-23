import { Spns as N } from "@datune/core";
import { MidiPitches as M, type MidiPitch } from "@datune/midi";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyMidiPitch } from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, M.C5, "C5"],
  [LangId.EN, M.fromFrequency(60), "B2 (-49)"],
  [LangId.EN, M.from(N.A4, -1200), "A5 (-1200)"],
  [LangId.EN, M.from(N.A4, 1200), "A5 (+1200)"],
  [LangId.ES, M.fromFrequency(440), "La5"],
])("stringify", (langId: LangId, pitch: MidiPitch, expected: string) => {
  it(`(${langId}, ${pitch}) => ${expected}`, () => {
    const actual = stringifyMidiPitch(pitch, {
      langId,
    } );

    expect(actual).toEqual(expected);
  } );
} );
