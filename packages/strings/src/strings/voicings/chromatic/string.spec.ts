/* eslint-disable camelcase */
import { IntervalSets, IntervalSet } from "@datune/core/intervalSets/chromatic";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyShortName } from "./shortName";
import { stringifyIntervalSet } from ".";

TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { COMMON, fromRootIntervals, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR } = IntervalSets;

describe.each([
  [LangId.EN, TRIAD_MAJOR, "Major"],
  [LangId.ES, TRIAD_MAJOR, "Mayor"],
  [LangId.EN, fromRootIntervals(0, 1, 2), "P1-m2-M2"],
  [LangId.ES, fromRootIntervals(0, 4, 6, 11), "Séptima Maj7 ♭5"],
  [LangId.ES, THIRTEENTH_MAJ13_b5a9, "Treceava Maj13 ♭5 ♯9"],
])("manual tests", (langId, intervalSet, str) => {
  it(`${langId} - ${intervalSet} => "${str}"`, () => {
    const actual = stringifyIntervalSet(intervalSet, {
      langId,
    } );
    const expected = str;

    expect(actual).toBe(expected);
  } );
} );

const allLang = [LangId.ES, LangId.EN];

type Tuple = [LangId, IntervalSet];
const intervalSetAllLanguages: Tuple[] = [...COMMON].map(
  (e) => <Tuple[]>allLang.map((l) => [l, e]),
).reduce((c, p) => p.concat(c));

describe.each(intervalSetAllLanguages)("all intervalSets should have name and shortName", (langId: LangId, intervalSet: IntervalSet) => {
  it(`${langId} - IntervalSet ${intervalSet} string defined. str=${intervalSet.toString()}`, () => {
    const str = stringifyIntervalSet(intervalSet, {
      langId,
    } );

    expect(str).toBeDefined();

    expect(str.length === 0 || str[0] !== "(").toBeTruthy();
  } );

  it(`${langId} - IntervalSet ${intervalSet} shortName defined.`, () => {
    const str = stringifyShortName(intervalSet);

    expect(str).toBeDefined();

    expect(str.length === 0 || str[0] !== "(").toBeTruthy();
  } );
} );
