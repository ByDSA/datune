import type { PitchArray } from "@datune/core/pitches/chromatic";
import { Keys as K } from "@datune/core/keys/chromatic";
import { type SPNArray, SPNs as N } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { expectSteps } from "voice-leading/steps/tests/steps";
import { from as singleStepFrom } from "../../steps/single/building";
import { generate } from "./generate";

TestInit.loadAll();

const { B4, C5, D5 } = N;
const { rootChord3, rootChord4 } = K;

it("b4 in Key=C (root=3)", () => {
  const spns: SPNArray = [B4];
  const key = K.C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const actual = generate( {
    base: spns,
    restingPitches: restingNotes,
  } ).steps;
  const expected = [
    singleStepFrom(0, 1),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("d5 in Key=C (root=3)", () => {
  const notes: SPNArray = [D5];
  const restingNotes = <PitchArray>rootChord3(K.C)?.pitches;
  const actual = generate( {
    base: notes,
    restingPitches: restingNotes,
  } ).steps;
  const expected = [
    singleStepFrom(0, 2),
    singleStepFrom(0, -2),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("c5 in Key=C (root=3)", () => {
  const notes: SPNArray = [C5];
  const restingPitches = rootChord3(K.C)?.pitches as PitchArray;
  const actual = generate( {
    base: notes,
    restingPitches,
  } ).steps;
  const expected = [
    singleStepFrom(0, 0),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("c5 in Key=C (root=4)", () => {
  const notes: SPNArray = [C5];
  const restingPitches = rootChord4(K.C)?.pitches as PitchArray;
  const actual = generate( {
    base: notes,
    restingPitches,
  } ).steps;
  const expected = [
    singleStepFrom(0, -1),
    singleStepFrom(0, 0),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("d5 in Key=C (root=4, maxStep=3)", () => {
  const base: SPNArray = [D5];
  const restingPitches = rootChord4(K.C)?.pitches as PitchArray;
  const actual = generate( {
    base,
    maxInterval: 3,
    restingPitches,
  } ).steps;
  const expected = [
    singleStepFrom(0, -3),
    singleStepFrom(0, -2),
    singleStepFrom(0, 2),
  ];

  expectSteps(actual).toEqual(expected);
} );
