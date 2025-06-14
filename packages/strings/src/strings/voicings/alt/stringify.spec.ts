/* eslint-disable camelcase */
import { IntervalSets } from "@datune/core/intervalSets/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyIntervalSet } from ".";

TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH_MAJ7_b5, SEVENTH_SUS4_b9, TRIAD_MAJOR } = IntervalSets;

describe.each([
  [LangId.EN, TRIAD_MAJOR, "MAJOR"],
  [LangId.ES, TRIAD_MAJOR, "MAYOR"],
  [LangId.EN, SEVENTH_MAJ7_b5, "SEVENTH MAJ7 ♭5"],
  [LangId.EN, SEVENTH_SUS4_b9, "SEVENTH SUS4 ♭9"],
  [LangId.ES, SEVENTH_MAJ7_b5, "SÉPTIMA MAJ7 ♭5"],
  [LangId.ES, SEVENTH_SUS4_b9, "SÉPTIMA SUS4 ♭9"],
])("stringify", (langId, intervalSet, expected) => {
  it(`${langId} - ${intervalSet?.rootIntervals} - ${expected}`, () => {
    const actual = stringifyIntervalSet(intervalSet, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
