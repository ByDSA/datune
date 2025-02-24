/* eslint-disable camelcase */
import { C, Cm, from } from "@datune/core/keys/alt";
import { LangId } from "lang";
import fromString from "parsing/keys/alt";
import { Bbb as DA_Bbb } from "@datune/core/pitches/alt";
import { BLUES_b5 } from "@datune/core/scales/alt";
import { TestInit, TestLang } from "tests";

TestLang.loadAll();
TestInit.diatonicAltKey();
describe.each([
  [LangId.EN, C, "C MAJOR"],
  [LangId.ES, C, "Do MAYOR"],
  [LangId.EN, null, "C MAJ"],
])("toString", (langId, expectedKey, str) => {
  it(`${langId} - "${str}" => ${expectedKey}`, () => {
    const t = fromString(str, {
      langId,
    } );

    expect(t).toBe(expectedKey);
  } );
} );

describe.each([
  [LangId.ES, "Do ", C],
  [LangId.ES, "Do", C],
  [LangId.ES, "Do m", Cm],
  [LangId.EN, "C ", C],
  [LangId.EN, "C", C],
  [LangId.EN, "Cm", Cm],
  [LangId.EN, "bBB bLuEsB5", from(DA_Bbb, BLUES_b5)],
])("fromString", (langId, str, expectedKey) => {
  it(`${langId} - "${str}" => ${expectedKey}`, () => {
    const key = fromString(str, {
      langId,
    } );

    expect(key).toBe(expectedKey);
  } );
} );
