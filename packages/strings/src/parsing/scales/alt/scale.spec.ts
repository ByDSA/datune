/* eslint-disable camelcase */
import { Scales as S, type Scale } from "@datune/core/scales/alt";
import { LangId } from "lang";
import { stringifyScale } from "strings/scales/alt";
import { TestLang } from "tests";
import { parseScale } from ".";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { AEOLIAN_b1, BLUES_b5, LYDIAN_b7, MAJOR, MINOR, SUPERLOCRIAN_bb7 } = S;

TestLang.loadAll();

describe.each([
  [LangId.ES, "MAYOR", MAJOR],
  [LangId.ES, "MAJOR", null],
  [LangId.ES, "  ma Yor  ", MAJOR],
  [LangId.ES, "MENOR", MINOR],
  [LangId.ES, "LiDIA aume Ntada #2", AEOLIAN_b1],
  [LangId.ES, "LiDIA AUMENTada ♯2", AEOLIAN_b1],
  [LangId.ES, "LiDIA b7", LYDIAN_b7],
  [LangId.ES, "SUPERLOCRIA bb7", SUPERLOCRIAN_bb7],
  [LangId.EN, "MAJOR", MAJOR],
  [LangId.EN, "MAYOR", null],
  [LangId.EN, "  ma Jor  ", MAJOR],
  [LangId.EN, "MINOR", MINOR],
  [LangId.EN, "LyDIAN augme Nted #2", AEOLIAN_b1],
  [LangId.EN, "LYDIAN AUGMENTED ♯2", AEOLIAN_b1],
  [LangId.EN, "LYDIAN b7", LYDIAN_b7],
  [LangId.EN, "blues b5", BLUES_b5],
  [LangId.EN, "SUPERLOCRIAN bb7", SUPERLOCRIAN_bb7],
  [LangId.EN, "M2:M2-m2, M2-M2:M2-m2", MAJOR],
])("tests", (langId: LangId, name: string, scale: Scale | null) => {
  it(`${langId} ${scale ? stringifyScale(scale) : "null"} name="${name}"`, () => {
    const actual = parseScale(name, {
      langId,
    } );

    expect(actual).toBe(scale);
  } );
} );
