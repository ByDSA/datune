/* eslint-disable camelcase */
import { LangId } from "lang";
import { AEOLIAN_b1, BLUES_b5, LYDIAN_b7, MAJOR, SUPERLOCRIAN_bb7 } from "scales/chromatic";
import stringify from "strings/scales/chromatic";
import { TestInit, TestLang } from "tests";
import parseScale from ".";

TestInit.chromaticScale();
TestLang.loadAll();

describe.each([
  [LangId.ES, "Mayor", MAJOR],
  [LangId.EN, "Major", MAJOR],
  [LangId.ES, "  ma Yor  ", MAJOR],
  [LangId.ES, "LiDIA aume Ntada #2", AEOLIAN_b1],
  [LangId.ES, "LiDIA AUMENTada ♯2", AEOLIAN_b1],
  [LangId.ES, "LiDIA b7", LYDIAN_b7],
  [LangId.ES, "SUPERLOCRIA bb7", SUPERLOCRIAN_bb7],
  [LangId.EN, "  ma Jor  ", MAJOR],
  [LangId.EN, "LyDIAN augme Nted #2", AEOLIAN_b1],
  [LangId.EN, "LYDIAN AUGMENTED ♯2", AEOLIAN_b1],
  [LangId.EN, "LYDIAN b7", LYDIAN_b7],
  [LangId.EN, "blues b5", BLUES_b5],
  [LangId.EN, "bLuEsB5", BLUES_b5],
  [LangId.EN, "SUPERLOCRIAN bb7", SUPERLOCRIAN_bb7],
  // bad names
  [LangId.ES, "MAJOR", null],
  [LangId.EN, "MAYOR", null],
  [LangId.EN, "LuEsB5", null],
])("manual name", (langId, str, expected) => {
  const scaleName = expected
    ? stringify(expected, {
      langId,
    } )
    : "null";

  it(`${langId} - ${str} => ${scaleName}`, () => {
    const actual = parseScale(str, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  ["2-2-1-2-2-2-1", MAJOR],
  ["2:2-1:2-2:2-1", MAJOR],
  ["2 2 1 2-2 2:1", MAJOR],
  ["2:2-1 2-2:2-1", MAJOR],
  ["2-2-1-2-2-2-1", MAJOR],
  ["2:2-1:2-2:2-1", MAJOR],
  ["2 2 1 2-2 2:1", MAJOR],
])("intraIntervals", (str, expected) => {
  describe.each([
    LangId.EN,
    LangId.ES,
  ])("lang", (langId) => {
    it(`${langId} - ${str} => ${expected}`, () => {
      expect(parseScale(str, {
        langId,
      } )).toBe(expected);
    } );
  } );
} );
