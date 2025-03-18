import { Spns as N, Spn } from "@datune/core/spns/chromatic";
import { Tunings } from "@datune/core/tunings/chromatic";
import { TestInit } from "tests";
import { calcFrequency } from "../calcs";
import { A4, A5, B0, B9, C0, C1, C10, C5, C6, C8, C9, MAX, MIN } from "../constants";
import { MidiCode } from "../MidiCode";
import { MidiPitch } from "../MidiPitch";
import { from, fromCode, fromFrequency } from ".";

TestInit.initAll();
const { calcFrequency: tuningCalcFrequency, LIMIT_5_SYMMETRIC_N1_440 } = Tunings;

describe.each([
  [C0, <MidiCode>0],
  [MIN, <MidiCode>0],
  [B0, <MidiCode>11],
  [C1, <MidiCode>12],
  [A5, <MidiCode>69],
  [A4, <MidiCode>57],
  [C5, <MidiCode>60],
  [C6, <MidiCode>72],
  [C8, <MidiCode>96],
  [C9, <MidiCode>108],
  [B9, <MidiCode>119],
  [C10, <MidiCode>120],
  [MAX, <MidiCode>127],
])("code", (midiPitch, code: MidiCode) => {
  it(`code = ${code} => ${midiPitch}`, () => {
    const actualMidiPitch = fromCode(code);

    expect(actualMidiPitch).toBe(midiPitch);
  } );
} );

it("midiPitch - fromFrequency - 440 = A5", () => {
  const midiNote = fromFrequency(440);
  const expected: MidiPitch = A5;

  expect(midiNote).toEqual(expected);
} );

it("fromFrequency - LIMIT_5_SYMMETRIC_N1_440 E5 = E5 + 2 cents", () => {
  const symbolicPitch: Spn = N.E5;
  const freq: number = tuningCalcFrequency(LIMIT_5_SYMMETRIC_N1_440, symbolicPitch);
  const midiNote = fromFrequency(freq);
  const expectedDetuned = 2;

  expect(midiNote.spn).toEqual(symbolicPitch);
  expect(midiNote.detuned).toEqual(expectedDetuned);
} );

it("fromFrequency - LIMIT_5_SYMMETRIC_N1_440 FF5 = FF5 - 16 cents", () => {
  const symbolicPitch: Spn = N.FF5;
  const freq: number = tuningCalcFrequency(LIMIT_5_SYMMETRIC_N1_440, symbolicPitch);
  const midiNote = fromFrequency(freq);
  const expectedCents = -16;

  expect(midiNote.spn).toEqual(symbolicPitch);
  expect(midiNote.detuned).toEqual(expectedCents);
} );

it("fromFrequency - 60 ~ 60", () => {
  const expected: number = 60;
  const midiNote = fromFrequency(expected);
  const frequency = calcFrequency(midiNote);

  expect(frequency).toBeCloseTo(expected, 0);
} );

it("fromFrequency - 60 = N.B1 - 49 cents", () => {
  const expected: number = 60;
  const midiNote = fromFrequency(expected);
  const { spn } = midiNote;
  const { detuned } = midiNote;

  expect(spn).toEqual(N.B1);
  expect(detuned).toBe(-49);
} );

it("from - A5 -1200 cents", () => {
  const midiNote = from(N.A5, -1200);
  const { spn } = midiNote;
  const { detuned } = midiNote;

  expect(spn).toEqual(N.A5);
  expect(detuned).toBe(-1200);
} );
