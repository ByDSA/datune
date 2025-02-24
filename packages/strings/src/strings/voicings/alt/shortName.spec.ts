/* eslint-disable camelcase */
import { TestInit, TestLang } from "tests";
import { SEVENTH, SEVENTH_MAJ7_b5, SEVENTH_SUS4_b9, TRIAD_MAJOR } from "@datune/core/voicings/alt";
import shortName from "./shortName";

beforeAll(() => {
  TestInit.diatonicAltVoicing();
  TestLang.loadAll();
} );
it("shortName - SEVENTH = 7", () => {
  const actual: string = shortName(SEVENTH);
  const expected: string = "7";

  expect(actual).toBe(expected);
} );

it("shortName: MAJOR", () => {
  const str = shortName(TRIAD_MAJOR);
  const expected = "";

  expect(str).toBe(expected);
} );

it("shortName: SEVENTH", () => {
  const str = shortName(SEVENTH);
  const expected = "7";

  expect(str).toBe(expected);
} );

it("shortName - ENG - SEVENTH MAJ7 b5", () => {
  const actual = shortName(SEVENTH_MAJ7_b5);
  const expected = "Maj7♭5";

  expect(actual).toBe(expected);
} );
it("shortName - ENG - SEVENTH SUS4 b9", () => {
  const actual = shortName(SEVENTH_SUS4_b9);
  const expected = "7sus4(♭9)";

  expect(actual).toBe(expected);
} );

it("shortName - ESP - SEVENTH MAJ7 b5", () => {
  const actual = shortName(SEVENTH_MAJ7_b5);
  const expected = "Maj7♭5";

  expect(actual).toBe(expected);
} );
