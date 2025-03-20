import type { PitchArray } from "@datune/core/pitches/chromatic";
import { Keys as K } from "@datune/core/keys/chromatic";
import { type SpnArray, Spns as N } from "@datune/core/spns/chromatic";
import { Intervals as I } from "@datune/core";
import { TestInit } from "tests";
import { expectSteps } from "voice-leading/steps/tests/steps";
import { SS_1_1, SS_2_2, SS_2_S2 } from "voice-leading/steps/single/constants";
import { VoiceLeadings as VL } from "voice-leading";
import { singleStepFrom } from "../../steps/single/building";
import { toKeyResolution } from "./generate";

TestInit.loadAll();

const { B4, C5, D5 } = N;
const { rootChord3, rootChord4 } = K;

it("base=[B4] in Key=C (root=3)", () => {
  const spns: SpnArray = [B4];
  const key = K.C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base: spns,
    restingPitches: restingNotes,
  } ).groups;
  const expected = [
    singleStepFrom(0, 1),
  ];

  expect(actual).toHaveLength(1);

  expectSteps(actual[0]).toEqual(expected);
} );

it("base=[B4, F5] in Key=C (root=3), maxInterval=1", () => {
  const spns: SpnArray = [N.B4, N.F5];
  const key = K.C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const actual = toKeyResolution( {
    maxInterval: I.m2,
    base: spns,
    restingPitches: restingNotes,
  } ).groups;
  const expected = [
    singleStepFrom(0, 1),
  ];
  const expected2 = [
    singleStepFrom(1, -1),
  ];

  expect(actual).toHaveLength(2);

  expectSteps(actual[0]).toEqual(expected);
  expectSteps(actual[1]).toEqual(expected2);
} );

it("base=[B4, F5] in Key=C (root=3), maxInterval=2 (default)", () => {
  const spns: SpnArray = [N.B4, N.F5];
  const key = K.C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base: spns,
    restingPitches: restingNotes,
  } ).groups;
  const expected = [
    singleStepFrom(0, 1), // B4 -> C5
  ];
  const expected2 = [
    singleStepFrom(1, -1), // F5 -> E5
    singleStepFrom(1, 2), // F5 -> G5
  ];

  expect(actual).toHaveLength(2);

  expectSteps(actual[0]).toEqual(expected);
  expectSteps(actual[1]).toEqual(expected2);
} );

it("base=[B4, D5, F5] in Key=C (root=3), maxInterval=1", () => {
  const spns: SpnArray = [N.B4, N.D5, N.F5];
  const key = K.C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const actual = toKeyResolution( {
    maxInterval: I.m2,
    base: spns,
    restingPitches: restingNotes,
  } ).groups;
  const expected = [
    singleStepFrom(0, 1),
  ];
  const expected2 = [
    singleStepFrom(2, -1),
  ];

  expect(actual).toHaveLength(2);

  expectSteps(actual[0]).toEqual(expected);
  expectSteps(actual[1]).toEqual(expected2);
} );

it("base=[D5] in Key=C (root=3)", () => {
  const notes: SpnArray = [D5];
  const restingNotes = <PitchArray>rootChord3(K.C)?.pitches;
  const actual = toKeyResolution( {
    base: notes,
    restingPitches: restingNotes,
  } ).groups;
  const expected = [
    singleStepFrom(0, 2),
    singleStepFrom(0, -2),
  ];

  expect(actual).toHaveLength(1);

  expectSteps(actual[0]).toEqual(expected);
} );

it("base=[C5] in Key=C (root=3)", () => {
  const notes: SpnArray = [C5];
  const restingPitches = rootChord3(K.C)?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base: notes,
    restingPitches,
  } ).groups;

  expect(actual).toHaveLength(0);
} );

it("base=[C5] in Key=C (root=4)", () => {
  const notes: SpnArray = [C5];
  const restingPitches = rootChord4(K.C)?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base: notes,
    restingPitches,
  } ).groups;
  const expected = [
    singleStepFrom(0, -1),
  ];

  expect(actual).toHaveLength(1);

  expectSteps(actual[0]).toEqual(expected);
} );

it("base=[D5] in Key=C (root=4, maxInterval=3)", () => {
  const base: SpnArray = [D5];
  const restingPitches = rootChord4(K.C)?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base,
    maxInterval: 3,
    restingPitches,
  } ).groups;
  const expected = [
    singleStepFrom(0, -3),
    singleStepFrom(0, -2),
    singleStepFrom(0, 2),
  ];

  expect(actual).toHaveLength(1);

  expectSteps(actual[0]).toEqual(expected);
} );

it("base=[G4, B4, D5, F4] (G7) in Key=C (root=3, maxInterval=2)", () => {
  const base: SpnArray = [N.G4, N.B4, N.D5, N.F4];
  const restingPitches = rootChord3(K.C)?.pitches as PitchArray;
  const actual = toKeyResolution( {
    base,
    restingPitches,
  } ).groups;
  const expected = [
    SS_1_1,
    SS_2_S2,
    SS_2_2,
    VL.Steps.singleStepFrom(3, -1),
    VL.Steps.singleStepFrom(3, 2),
  ];

  expect(actual).toHaveLength(base.length - 1); // index 0 does not resolve
  expect(actual.flat()).toHaveLength(5);

  expectSteps(actual.flat()).toEqual(expected);
} );
