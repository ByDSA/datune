import { SPNs } from "@datune/core/spns/chromatic";
import { from, fromFrequency, type MidiPitch as Pitch } from "@datune/midi";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import { stringifyMidiPitch } from ".";

TestInit.chromaticSPN();
TestLang.loadAll();

describe.each([
  [LangId.EN, fromFrequency(60), "B2 (-49)"],
  [LangId.EN, from(SPNs.A4, -1200), "A5 (-1200)"],
  [LangId.EN, from(SPNs.A4, 1200), "A5 (+1200)"],
  [LangId.ES, fromFrequency(440), "La5"],
])("stringify", (langId: LangId, pitch: Pitch, expected: string) => {
  it(`(${langId}, ${pitch}) => ${expected}`, () => {
    const actual = stringifyMidiPitch(pitch, {
      langId,
    } );

    expect(actual).toEqual(expected);
  } );
} );
