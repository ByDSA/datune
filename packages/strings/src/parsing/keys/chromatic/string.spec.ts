import { Keys as K } from "@datune/core/keys/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { Scales } from "@datune/core/scales/chromatic";
import { LangId } from "lang";
import { parseKey } from "parsing/keys/chromatic";
import { TestInit, TestLang } from "tests";

TestInit.chromaticKey();
TestLang.loadAll();

describe.each([
  [LangId.EN, "C Major", K.C],
  [LangId.ES, "Do Mayor", K.C],
  [LangId.EN, "C Minor", K.Cm],
])("toString + parse", (langId, str, key) => {
  const keyName = String(key);

  it(`parse: (${langId}, "${str}") => ${keyName}`, () => {
    const t = parseKey(str, {
      langId,
    } );

    expect(t).toBe(key);
  } );
} );

describe.each([
  [LangId.EN, "C MAJOR", K.C],
  [LangId.ES, "Do MAYOR", K.C],
  [LangId.ES, "Do", K.C],
  [LangId.ES, "Do ", K.C],
  [LangId.ES, "Do m", K.Cm],
  [LangId.EN, "C ", K.C],
  [LangId.ES, "lab bLuEsB5", K.from(P.Ab, Scales.BLUES_b5)],
  [LangId.ES, "la bLuEsB5", K.from(P.A, Scales.BLUES_b5)],
  [LangId.EN, "a bLuEsB5", K.from(P.A, Scales.BLUES_b5)],
  [LangId.ES, "Do", K.C],
  [LangId.EN, "C", K.C],
  [LangId.EN, "C ", K.C],
  [LangId.EN, "Cm", K.Cm],
  // bad values
  [LangId.ES, "C", null],
  [LangId.ES, "C Mayor", null],
  [LangId.ES, "Do Major", null],
  [LangId.EN, "Do", null],
  [LangId.EN, "Do Major", null],
  [LangId.EN, "C Mayor", null],
])("parse", (langId, str, key) => {
  const keyName = key ? String(key) : "null";

  it(`(${langId}, "${str}") => ${keyName}`, () => {
    const actual = parseKey(str, {
      langId,
    } );

    expect(actual).toBe(key);
  } );
} );
