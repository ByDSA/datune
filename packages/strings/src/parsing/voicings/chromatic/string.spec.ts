/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Voicings as V } from "@datune/core";
import { LangId } from "lang";
import { TestLang } from "tests";
import { parseVoicing } from ".";

// eslint-disable-next-line max-len
const { POWER_CHORD, SEVENTH, SEVENTH_b5, SEVENTH_MAJ7_b5, SIXTH, THIRTEENTH_a5, THIRTEENTH_a5a9, THIRTEENTH_a5b9, THIRTEENTH_a9, THIRTEENTH_b5, THIRTEENTH_b5a9, THIRTEENTH_b5b9, THIRTEENTH_b9, THIRTEENTH_MAJ13_a5b9, THIRTEENTH_MAJ13_a9, THIRTEENTH_MAJ13_b5, THIRTEENTH_MAJ13_b5a9, THIRTEENTH_MAJ13_b5b9, THIRTEENTH_MAJ13_b9, THIRTEENTH_MINOR, THIRTEENTH_MINOR_MAJ13, THIRTEENTH_SUS4, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_QUARTAL, THIRTEENTH_MAJ13_a5, THIRTEENTH_MAJ13_a5a9 } = V;

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
  [LangId.EN, "mMaj13", THIRTEENTH_MINOR_MAJ13],
  [LangId.EN, "13#5♭9", THIRTEENTH_a5b9],
  [LangId.EN, "13b5#9", THIRTEENTH_b5a9],
  [LangId.EN, "13sus4", THIRTEENTH_SUS4],
  [LangId.EN, "13#5", THIRTEENTH_a5],
  [LangId.EN, "13b5", THIRTEENTH_b5],
  [LangId.EN, "13#9", THIRTEENTH_a9],
  [LangId.EN, "13b9", THIRTEENTH_b9],
  [LangId.EN, "13#5#9", THIRTEENTH_a5a9],
  [LangId.EN, "13b5b9", THIRTEENTH_b5b9],
  [LangId.EN, "Maj13#5", THIRTEENTH_MAJ13_a5],
  [LangId.EN, "Maj13b5#9", THIRTEENTH_MAJ13_b5a9],
  [LangId.EN, "Maj13#5#9", THIRTEENTH_MAJ13_a5a9],
  [LangId.EN, "Maj13#5b9", THIRTEENTH_MAJ13_a5b9],
  [LangId.EN, "Maj13#9", THIRTEENTH_MAJ13_a9],
  [LangId.EN, "Maj13b5", THIRTEENTH_MAJ13_b5],
  [LangId.EN, "Maj13b5b9", THIRTEENTH_MAJ13_b5b9],
  [LangId.EN, "Maj13b9", THIRTEENTH_MAJ13_b9],
  [LangId.ES, "treceava maj13 b5#9", THIRTEENTH_MAJ13_b5a9],
  [LangId.EN, "6", SIXTH],
  [LangId.EN, "0 4 6 11", SEVENTH_MAJ7_b5],
  [LangId.ES, "0 4 6 11", SEVENTH_MAJ7_b5],
])("parse", (langId, str, expectedVoicing) => {
  it(`${langId} - "${str}" => ${expectedVoicing}`, () => {
    const actual = parseVoicing(str, {
      langId,
    } );

    expect(expectedVoicing).toBeDefined();

    expect(actual).toBe(expectedVoicing);
  } );
} );
