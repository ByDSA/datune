import { Keys as K } from "@datune/core/keys/alt";
import { Pitches as P } from "@datune/core/pitches/alt";
import { Scales as S } from "@datune/core/scales/alt";
import { LangId } from "lang";
import { parseKey } from "parsing/keys/alt";
import { TestInit, TestLang } from "tests";

TestLang.loadAll();
TestInit.diatonicAltKey();

describe.each([
  [LangId.EN, K.C, "C MAJOR"],
  [LangId.ES, K.C, "Do MAYOR"],
  [LangId.EN, null, "C MAJ"],
])("toString", (langId, expectedKey, str) => {
  it(`${langId} - "${str}" => ${expectedKey}`, () => {
    const t = parseKey(str, {
      langId,
    } );

    expect(t).toBe(expectedKey);
  } );
} );

describe.each([
  [LangId.ES, "Do ", K.C],
  [LangId.ES, "Do", K.C],
  [LangId.ES, "Do m", K.Cm],
  [LangId.EN, "C ", K.C],
  [LangId.EN, "C", K.C],
  [LangId.EN, "Cm", K.Cm],
  [LangId.EN, "bBB bLuEsB5", K.from(P.Bbb, S.BLUES_b5)],
])("parse", (langId, str, expectedKey) => {
  it(`${langId} - "${str}" => ${expectedKey}`, () => {
    const key = parseKey(str, {
      langId,
    } );

    expect(key).toBe(expectedKey);
  } );
} );
