import { Keys } from "@datune/core/keys/alt";
import { Pitches } from "@datune/core/pitches/alt";
import { Scales } from "@datune/core/scales/alt";
import { LangId } from "lang";
import { parseKey } from "parsing/keys/alt";
import { TestInit, TestLang } from "tests";

TestLang.loadAll();
TestInit.diatonicAltKey();

describe.each([
  [LangId.EN, Keys.C, "C MAJOR"],
  [LangId.ES, Keys.C, "Do MAYOR"],
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
  [LangId.ES, "Do ", Keys.C],
  [LangId.ES, "Do", Keys.C],
  [LangId.ES, "Do m", Keys.Cm],
  [LangId.EN, "C ", Keys.C],
  [LangId.EN, "C", Keys.C],
  [LangId.EN, "Cm", Keys.Cm],
  [LangId.EN, "bBB bLuEsB5", Keys.from(Pitches.Bbb, Scales.BLUES_b5)],
])("parse", (langId, str, expectedKey) => {
  it(`${langId} - "${str}" => ${expectedKey}`, () => {
    const key = parseKey(str, {
      langId,
    } );

    expect(key).toBe(expectedKey);
  } );
} );
