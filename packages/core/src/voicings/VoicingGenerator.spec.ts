/* eslint-disable camelcase */
import { Array as DiatonicAltArray, Bb as DA_Bb, C as DA_C, Eb as DA_Eb, G as DA_G } from "pitches/alt";
import { Array as ChromaticArray, B as C_B, C as C_C, D as C_D, E as C_E, G as C_G } from "pitches/chromatic";
import { Array as DiatonicArray, B as D_B, C as D_C, D as D_D, E as D_E, G as D_G } from "pitches/diatonic";
import { TestInit } from "tests";
import VoicingGenerator from "./VoicingGenerator";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("cLOSED - C E G", () => {
  const degrees: ChromaticArray = [C_C, C_E, C_G];
  const actual = VoicingGenerator.CLOSED.apply(...degrees);

  expect(actual).toHaveLength(3);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_E);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_G);
  expect(actual[2].octaveRelative).toBe(0);
} );

it("cLOSED - REPEAT DEGREE - C E G C", () => {
  const degrees: ChromaticArray = [C_C, C_E, C_G, C_C];
  const actual = VoicingGenerator.CLOSED.apply(...degrees);

  expect(actual).toHaveLength(3);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_E);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_G);
  expect(actual[2].octaveRelative).toBe(0);
} );

it("cLOSED - C E G B", () => {
  const degrees: ChromaticArray = [C_C, C_E, C_G, C_B];
  const actual = VoicingGenerator.CLOSED.apply(...degrees);

  expect(actual).toHaveLength(4);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_E);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_G);
  expect(actual[2].octaveRelative).toBe(0);
  expect(actual[3].pitch).toEqual(C_B);
  expect(actual[3].octaveRelative).toBe(0);
} );

it("cLOSED - C E G B D", () => {
  const degrees: ChromaticArray = [C_C, C_E, C_G, C_B, C_D];
  const actual = VoicingGenerator.CLOSED.apply(...degrees);

  expect(actual).toHaveLength(5);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_D);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_E);
  expect(actual[2].octaveRelative).toBe(0);
  expect(actual[3].pitch).toEqual(C_G);
  expect(actual[3].octaveRelative).toBe(0);
  expect(actual[4].pitch).toEqual(C_B);
  expect(actual[4].octaveRelative).toBe(0);
} );

it("cLOSED UNSORTED - REPEAT DEGREE - C G E C", () => {
  const degrees: ChromaticArray = [C_C, C_G, C_E, C_C];
  const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

  expect(actual).toHaveLength(3);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_G);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_E);
  expect(actual[2].octaveRelative).toBe(1);
} );

it("cLOSED UNSORTED - C E G B D", () => {
  const degrees: ChromaticArray = [C_C, C_E, C_G, C_B, C_D];
  const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

  expect(actual).toHaveLength(5);
  expect(actual[0].pitch).toEqual(C_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(C_E);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(C_G);
  expect(actual[2].octaveRelative).toBe(0);
  expect(actual[3].pitch).toEqual(C_B);
  expect(actual[3].octaveRelative).toBe(0);
  expect(actual[4].pitch).toEqual(C_D);
  expect(actual[4].octaveRelative).toBe(1);
} );

it("cLOSED - DiatonicAlt: C Eb G Bb", () => {
  const degrees: DiatonicAltArray = [DA_C, DA_Eb, DA_G, DA_Bb];
  const actual = VoicingGenerator.CLOSED.apply(...degrees);

  expect(actual).toHaveLength(4);
  expect(actual[0].pitch).toEqual(DA_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(DA_Eb);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(DA_G);
  expect(actual[2].octaveRelative).toBe(0);
  expect(actual[3].pitch).toEqual(DA_Bb);
  expect(actual[3].octaveRelative).toBe(0);
} );

it("cLOSED UNSORTED - Diatonic: C E G B D", () => {
  const degrees: DiatonicArray = [D_C, D_E, D_G, D_B, D_D];
  const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

  expect(actual).toHaveLength(5);
  expect(actual[0].pitch).toEqual(D_C);
  expect(actual[0].octaveRelative).toBe(0);
  expect(actual[1].pitch).toEqual(D_E);
  expect(actual[1].octaveRelative).toBe(0);
  expect(actual[2].pitch).toEqual(D_G);
  expect(actual[2].octaveRelative).toBe(0);
  expect(actual[3].pitch).toEqual(D_B);
  expect(actual[3].octaveRelative).toBe(0);
  expect(actual[4].pitch).toEqual(D_D);
  expect(actual[4].octaveRelative).toBe(1);
} );
