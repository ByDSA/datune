/* eslint-disable camelcase */
import { Voicings } from "@datune/core/voicings/alt";
import { stringifyVoicing } from ".";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltVoicing();
TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH_MAJ7_b5, SEVENTH_SUS4_b9, TRIAD_MAJOR } = Voicings;

describe.each([
  [LangId.EN, TRIAD_MAJOR, "MAJOR"],
  [LangId.ES, TRIAD_MAJOR, "MAYOR"],
  [LangId.EN, SEVENTH_MAJ7_b5, "SEVENTH MAJ7 ♭5"],
  [LangId.EN, SEVENTH_SUS4_b9, "SEVENTH SUS4 ♭9"],
  [LangId.ES, SEVENTH_MAJ7_b5, "SÉPTIMA MAJ7 ♭5"],
  [LangId.ES, SEVENTH_SUS4_b9, "SÉPTIMA SUS4 ♭9"],
])("stringify", (langId, voicing, expected) => {
  it(`${langId} - ${voicing?.rootIntervals} - ${expected}`, () => {
    const actual = stringifyVoicing(voicing, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
