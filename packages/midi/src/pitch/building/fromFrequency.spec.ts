import { Spns as N, Spn } from "@datune/core/spns/chromatic";
import { Tunings } from "@datune/core/tunings/chromatic";
import { calcFrequency } from "../calcs";
import { MidiPitch } from "../MidiPitch";
import { MidiPitches as M } from "../";
import { fromFrequency } from ".";

const { calcFrequency: tuningCalcFrequency, LIMIT_5_SYMMETRIC_N1_440 } = Tunings;

it("midiPitch - fromFrequency - 440 = A5", () => {
  const midiNote = fromFrequency(440);
  const expected: MidiPitch = M.A5;

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
