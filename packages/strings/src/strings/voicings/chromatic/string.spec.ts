/* eslint-disable camelcase */
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import { COMMON, fromRootIntervals, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR, Voicing } from "voicings/chromatic";
import stringify from ".";
import shortName from "./shortName";

TestInit.chromaticVoicing();
TestLang.loadAll();

describe.each([
  [LangId.EN, TRIAD_MAJOR, "Major"],
  [LangId.ES, TRIAD_MAJOR, "Mayor"],
  [LangId.EN, fromRootIntervals(0, 1, 2), "P1-m2-M2"],
  [LangId.ES, fromRootIntervals(0, 4, 6, 11), "Séptima Maj7 ♭5"],
  [LangId.ES, THIRTEENTH_MAJ13_b5a9, "Treceava Maj13 ♭5 ♯9"],
])("manual tests", (langId, voicing, str) => {
  it(`${langId} - ${voicing} => "${str}"`, () => {
    const actual = stringify(voicing, {
      langId,
    } );
    const expected = str;

    expect(actual).toBe(expected);
  } );
} );

const allLang = [LangId.ES, LangId.EN];

type Tuple = [LangId, Voicing];
const voicingAllLanguages: Tuple[] = [...COMMON].map(
  (e) => <Tuple[]>allLang.map((l) => [l, e]),
).reduce((c, p) => p.concat(c));

describe.each(voicingAllLanguages)("All voicings have name and shortName", (langId: LangId, voicing: Voicing) => {
  it(`${langId} - Voicing ${voicing} string defined. str=${voicing.toString()}`, () => {
    const str = stringify(voicing, {
      langId,
    } );

    expect(str).toBeDefined();

    if (str.length > 0)
      expect(str[0]).not.toMatch("(");
  } );

  it(`${langId} - Voicing ${voicing} shortName defined.`, () => {
    const str = shortName(voicing);

    expect(str).toBeDefined();

    if (str.length > 0)
      expect(str[0]).not.toMatch("(");
  } );
} );
