import type { Pitch } from "@datune/core/pitches/alt";
import { Pitches as P } from "@datune/core/pitches/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyPitch } from ".";

TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Ab, BB, Bb, BBB, C, Eb } = P;

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, BB, "B♯"],
  [LangId.EN, BBB, "B♯♯"],
  [LangId.EN, Bb, "B♭"],
  [LangId.EN, Eb, "E♭"],
  [LangId.EN, Ab, "A♭"],
  [LangId.ES, C, "Do"],
  [LangId.ES, BB, "Si♯"],
  [LangId.ES, BBB, "Si♯♯"],
  [LangId.ES, Bb, "Si♭"],
  [LangId.ES, Eb, "Mi♭"],
  [LangId.ES, Ab, "La♭"],
])("tests", (langId: LangId, pitch: Pitch, expected: string) => {
  it(`should return ${expected}`, () => {
    const actual = stringifyPitch(pitch, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
