/* eslint-disable camelcase */
import { POWER_CHORD, SEVENTH, SEVENTH_b5, SEVENTH_MAJ7_b5, SIXTH, THIRTEENTH_a5b9, THIRTEENTH_MAJ13_b5a9, THIRTEENTH_MINOR, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_QUARTAL } from "@datune/core/voicings/relative/chromatic/constants";
import { parseVoicing } from ".";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";

TestInit.chromaticVoicing();
TestLang.loadAll();

describe.each([
  [LangId.ES, "m", TRIAD_MINOR],
  [LangId.ES, " ", TRIAD_MAJOR],
  [LangId.ES, "", TRIAD_MAJOR],
  [LangId.ES, "MAyOR", TRIAD_MAJOR],
  [LangId.EN, "MAjOR", TRIAD_MAJOR],
  [LangId.EN, "5", POWER_CHORD],
  [LangId.EN, " ", TRIAD_MAJOR],
  [LangId.EN, "m", TRIAD_MINOR],
  [LangId.EN, "º", TRIAD_DIMINISHED],
  [LangId.EN, "+", TRIAD_AUGMENTED],
  [LangId.EN, "quartal", TRIAD_QUARTAL],
  [LangId.EN, "7", SEVENTH],
  [LangId.EN, "7b5", SEVENTH_b5],
  [LangId.EN, "Maj7b5", SEVENTH_MAJ7_b5],
  [LangId.EN, "m13", THIRTEENTH_MINOR],
  [LangId.EN, "13#5♭9", THIRTEENTH_a5b9],
  [LangId.EN, "6", SIXTH],
  [LangId.ES, "treceava maj13 b5#9", THIRTEENTH_MAJ13_b5a9],
  [LangId.EN, "0 4 6 11", SEVENTH_MAJ7_b5],
  [LangId.ES, "0 4 6 11", SEVENTH_MAJ7_b5],
])("parse", (langId, str, expectedVoicing) => {
  it(`${langId} - "${str}" => ${expectedVoicing}`, () => {
    const actual = parseVoicing(str, {
      langId,
    } );

    expect(actual).toBe(expectedVoicing);
  } );
} );

describe.each([
  ["0 4 6 11", SEVENTH_MAJ7_b5],
])("intervals", (str, expected) => {
  it(`"${str}" => ${expected}`, () => {
    const actual = parseVoicing(str);

    expect(actual).toBe(expected);
  } );
} );
