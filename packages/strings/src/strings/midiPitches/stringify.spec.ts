import { A4 as SPN_A4 } from "@datune/core/spns/chromatic";
import { from, fromFrequency, MidiPitch as Pitch } from "@datune/midi";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.chromaticSPN();
TestLang.loadAll();

describe.each([
  [LangId.EN, fromFrequency(60), "B2 (-49)"],
  [LangId.EN, from(SPN_A4, -1200), "A5 (-1200)"],
  [LangId.EN, from(SPN_A4, 1200), "A5 (+1200)"],
  [LangId.ES, fromFrequency(440), "La5"],
])("stringify", (langId: LangId, pitch: Pitch, expected: string) => {
  it(`(${langId}, ${pitch}) => ${expected}`, () => {
    const actual = stringify(pitch, {
      langId,
    } );

    expect(actual).toEqual(expected);
  } );
} );
