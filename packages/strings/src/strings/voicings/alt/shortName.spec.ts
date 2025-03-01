/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Voicings } from "@datune/core/voicings/alt";
import { stringifyShortName } from "./shortName";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltVoicing();
TestLang.loadAll();

const { SEVENTH, SEVENTH_MAJ7_b5, SEVENTH_SUS4_b9, TRIAD_MAJOR } = Voicings;

it("shortName - SEVENTH = 7", () => {
  const actual: string = stringifyShortName(SEVENTH);
  const expected: string = "7";

  expect(actual).toBe(expected);
} );

it("shortName: MAJOR", () => {
  const str = stringifyShortName(TRIAD_MAJOR);
  const expected = "";

  expect(str).toBe(expected);
} );

it("shortName: SEVENTH", () => {
  const str = stringifyShortName(SEVENTH);
  const expected = "7";

  expect(str).toBe(expected);
} );

it("shortName - ENG - SEVENTH MAJ7 b5", () => {
  const actual = stringifyShortName(SEVENTH_MAJ7_b5);
  const expected = "Maj7♭5";

  expect(actual).toBe(expected);
} );

it("shortName - ENG - SEVENTH SUS4 b9", () => {
  const actual = stringifyShortName(SEVENTH_SUS4_b9);
  const expected = "7sus4(♭9)";

  expect(actual).toBe(expected);
} );

it("shortName - ESP - SEVENTH MAJ7 b5", () => {
  const actual = stringifyShortName(SEVENTH_MAJ7_b5);
  const expected = "Maj7♭5";

  expect(actual).toBe(expected);
} );
