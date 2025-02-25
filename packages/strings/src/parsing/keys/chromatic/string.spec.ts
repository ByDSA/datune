/* eslint-disable camelcase */
import { C, Cm, from } from "@datune/core/keys/chromatic";
import { LangId } from "lang";
import fromString from "parsing/keys/chromatic";
import { A as P_A, Ab as P_Ab } from "@datune/core/pitches/chromatic";
import { BLUES_b5 } from "@datune/core/scales/chromatic";
import { TestInit, TestLang } from "tests";

TestInit.chromaticKey();
TestLang.loadAll();

describe.each([
  [LangId.EN, "C Major", C],
  [LangId.ES, "Do Mayor", C],
  [LangId.EN, "C Minor", Cm],
])("toString + fromString", (langId, str, key) => {
  const keyName = String(key);

  it(`fromString: (${langId}, "${str}") => ${keyName}`, () => {
    const t = fromString(str, {
      langId,
    } );

    expect(t).toBe(key);
  } );
} );

describe.each([
  [LangId.EN, "C MAJOR", C],
  [LangId.ES, "Do MAYOR", C],
  [LangId.ES, "Do", C],
  [LangId.ES, "Do ", C],
  [LangId.ES, "Do m", Cm],
  [LangId.EN, "C ", C],
  [LangId.ES, "lab bLuEsB5", from(P_Ab, BLUES_b5)],
  [LangId.ES, "la bLuEsB5", from(P_A, BLUES_b5)],
  [LangId.EN, "a bLuEsB5", from(P_A, BLUES_b5)],
  [LangId.ES, "Do", C],
  [LangId.EN, "C", C],
  [LangId.EN, "C ", C],
  [LangId.EN, "Cm", Cm],
  // bad values
  [LangId.ES, "C", null],
  [LangId.ES, "C Mayor", null],
  [LangId.ES, "Do Major", null],
  [LangId.EN, "Do", null],
  [LangId.EN, "Do Major", null],
  [LangId.EN, "C Mayor", null],
])("fromString", (langId, str, key) => {
  const keyName = key ? String(key) : "null";

  it(`(${langId}, "${str}") => ${keyName}`, () => {
    const actual = fromString(str, {
      langId,
    } );

    expect(actual).toBe(key);
  } );
} );
