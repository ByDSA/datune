/* eslint-disable camelcase */
import { Voicings, Voicing } from "@datune/core/voicings/chromatic";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyShortName } from "./shortName";
import { stringifyVoicing } from ".";

TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { COMMON, fromRootIntervals, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR } = Voicings;

describe.each([
  [LangId.EN, TRIAD_MAJOR, "Major"],
  [LangId.ES, TRIAD_MAJOR, "Mayor"],
  [LangId.EN, fromRootIntervals(0, 1, 2), "P1-m2-M2"],
  [LangId.ES, fromRootIntervals(0, 4, 6, 11), "Séptima Maj7 ♭5"],
  [LangId.ES, THIRTEENTH_MAJ13_b5a9, "Treceava Maj13 ♭5 ♯9"],
])("manual tests", (langId, voicing, str) => {
  it(`${langId} - ${voicing} => "${str}"`, () => {
    const actual = stringifyVoicing(voicing, {
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

describe.each(voicingAllLanguages)("all voicings should have name and shortName", (langId: LangId, voicing: Voicing) => {
  it(`${langId} - Voicing ${voicing} string defined. str=${voicing.toString()}`, () => {
    const str = stringifyVoicing(voicing, {
      langId,
    } );

    expect(str).toBeDefined();

    expect(str.length === 0 || str[0] !== "(").toBeTruthy();
  } );

  it(`${langId} - Voicing ${voicing} shortName defined.`, () => {
    const str = stringifyShortName(voicing);

    expect(str).toBeDefined();

    expect(str.length === 0 || str[0] !== "(").toBeTruthy();
  } );
} );
