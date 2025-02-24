/* eslint-disable camelcase */
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import { SEVENTH_MAJ7_b5, SEVENTH_SUS4_b9, TRIAD_MAJOR } from "@datune/core/voicings/alt";
import stringify from ".";

TestInit.diatonicAltVoicing();
TestLang.loadAll();

describe.each([
  [LangId.EN, TRIAD_MAJOR, "MAJOR"],
  [LangId.ES, TRIAD_MAJOR, "MAYOR"],
  [LangId.EN, SEVENTH_MAJ7_b5, "SEVENTH MAJ7 ♭5"],
  [LangId.EN, SEVENTH_SUS4_b9, "SEVENTH SUS4 ♭9"],
  [LangId.ES, SEVENTH_MAJ7_b5, "SÉPTIMA MAJ7 ♭5"],
  [LangId.ES, SEVENTH_SUS4_b9, "SÉPTIMA SUS4 ♭9"],
])("stringify", (langId, voicing, expected) => {
  it(`${langId} - ${voicing?.rootIntervals} - ${expected}`, () => {
    const actual = stringify(voicing, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
