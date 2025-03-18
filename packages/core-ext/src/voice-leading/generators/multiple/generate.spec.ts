import { SpnArray, Spns as N } from "@datune/core/spns/chromatic";
import { rootChord3 } from "@datune/core/keys/chromatic/modifiers";
import { Keys as K } from "@datune/core";
import { TestInit } from "tests";
import { createFillZerosTransform } from "voice-leading/combiners/transforms";
import { expectCombinations } from "voice-leading/combiners/tests/combination";
import { StepReason, VoiceLeadings as VL } from "voice-leading";
import { combineStepGroups } from "../../combiners/combine-groups";
import { fromIntervals as compositeStepFromIntervals } from "../../steps/composite/building";
import { from as singleStepFrom } from "../../steps/single/building";
import { SingleStep } from "../../steps/single/SingleStep";
import { generateMultiple } from "./generate";

TestInit.loadAll();

const { B3, B4, C4, D3, D4, F4, G3, G4, GG4 } = N;

it("combinations - SUS in notes: C4, F4, G4", () => {
  const base: SpnArray = [C4, F4, G4];
  const result = generateMultiple(base, {
    near: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups).combinations;
  const expected = [
    [singleStepFrom(1, -1), singleStepFrom(2, 0)],
    [singleStepFrom(1, -2), singleStepFrom(2, 0)],
    [singleStepFrom(1, 0), singleStepFrom(2, 1)],
    [singleStepFrom(1, 0), singleStepFrom(2, 2)],
  ];

  expectCombinations(actual, expected);
} );

it("combinations - near (1): C4, G4", () => {
  const base: SpnArray = [C4, G4];
  const result = generateMultiple(base, {
    maxInterval: 1,
  } );
  const actual = combineStepGroups(result.groups).combinations;
  const expected = [
    compositeStepFromIntervals(-1, -1),
    compositeStepFromIntervals(-1, 1),
    compositeStepFromIntervals(-1),
    compositeStepFromIntervals(1, -1),
    compositeStepFromIntervals(1),
    compositeStepFromIntervals(1, 1),
    compositeStepFromIntervals(undefined, -1),
    compositeStepFromIntervals(undefined, 1),
  ].map((cm) => cm.singleSteps);

  expectCombinations(actual, expected);
} );

it("dIM in notes: D3, F4, B4", () => {
  const notes: SpnArray = [D3, F4, B4];
  const result = generateMultiple(notes, {
    near: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups).combinations;
  // Sólo resuelven F4 y B4, se ignora D3 porque no genera tensión
  const expected = [
    compositeStepFromIntervals(undefined, 1, 2),
    compositeStepFromIntervals(undefined, 1, -1),
    compositeStepFromIntervals(undefined, 1, -2),
    compositeStepFromIntervals(undefined, 2, 1),
    compositeStepFromIntervals(undefined, 2, -1),
    compositeStepFromIntervals(undefined, 2, -2),
    compositeStepFromIntervals(undefined, -1, 1),
    compositeStepFromIntervals(undefined, -1, 2),
    compositeStepFromIntervals(undefined, -1, -2),
    compositeStepFromIntervals(undefined, -2, 1),
    compositeStepFromIntervals(undefined, -2, 2),
    compositeStepFromIntervals(undefined, -2, -1),
  ].map((cm) => cm.singleSteps.sort());

  expectCombinations(actual, expected);
} );

it("dIM in notes: G3, B3, D4, F4", () => {
  const spnArray: SpnArray = [G3, B3, D4, F4];
  const result = generateMultiple(spnArray, {
    near: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups, {
    afterTransforms: [createFillZerosTransform(spnArray.length)],
  } ).combinations;
  const expected: SingleStep[][] = [
    compositeStepFromIntervals(0, 0, 0, -1),
    compositeStepFromIntervals(0, 0, 0, -2),
    compositeStepFromIntervals(1, 0, 0, 0),
    compositeStepFromIntervals(2, 0, 0, 0),
    compositeStepFromIntervals(0, -1, 0, -2),
    compositeStepFromIntervals(0, -1, 0, 1),
    compositeStepFromIntervals(0, -1, 0, 2),
    compositeStepFromIntervals(0, -2, 0, -1),
    compositeStepFromIntervals(0, -2, 0, 1),
    compositeStepFromIntervals(0, -2, 0, 2),
    compositeStepFromIntervals(0, 1, 0, -1),
    compositeStepFromIntervals(0, 1, 0, -2),
    compositeStepFromIntervals(0, 1, 0, 2),
    compositeStepFromIntervals(0, 2, 0, -1),
    compositeStepFromIntervals(0, 2, 0, -2),
    compositeStepFromIntervals(0, 2, 0, 1),
  ].map((cs) => cs.singleSteps);

  expectCombinations(actual, expected);
} );

it("dIM in notes fill zeros last index: B3, F4, GG4", () => {
  const spnArray: SpnArray = [B3, F4, GG4];
  const result = generateMultiple(spnArray, {
    near: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups, {
    afterTransforms: [createFillZerosTransform(spnArray.length)],
  } ).combinations;
  const expected = [
    compositeStepFromIntervals(-1, -2, 0),
    compositeStepFromIntervals(-1, 1, 0),
    compositeStepFromIntervals(-1, 2, 0),
    compositeStepFromIntervals(-2, -1, 0),
    compositeStepFromIntervals(-2, 1, 0),
    compositeStepFromIntervals(-2, 2, 0),
    compositeStepFromIntervals(1, -1, 0),
    compositeStepFromIntervals(1, -2, 0),
    compositeStepFromIntervals(1, 2, 0),
    compositeStepFromIntervals(2, -1, 0),
    compositeStepFromIntervals(2, -2, 0),
    compositeStepFromIntervals(2, 1, 0),
  ].map((cs) => cs.singleSteps);

  expectCombinations(actual, expected);
} );

it("disableResolutions - DIM in notes: G3, B3, D4, F4", () => {
  const notes: SpnArray = [G3, B3, D4, F4];
  const result = generateMultiple(notes, {
    near: {
      enabled: false,
    },
    voicingResolution: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups).combinations;
  const expected: SingleStep[][] = [];

  expectCombinations(actual, expected);
} );

it("notes=[F4] C Major Key Resolution", () => {
  const notes: SpnArray = [F4];
  const result = generateMultiple(notes, {
    maxInterval: 1,
    near: {
      enabled: false,
    },
    voicingResolution: {
      enabled: false,
    },
    keyResolution: {
      required: true,
      restingPitches: rootChord3(K.C)?.pitches!,
    },
  } );
  const resultGroups = result.groups;

  expect(resultGroups).toHaveLength(1);
  expect(resultGroups[0]).toHaveLength(1);
  expect(resultGroups[0][0]).toBe(VL.Steps.X0_S1); // [0] => -1

  const reasons = result.meta.reasonsMap.get(resultGroups[0][0] as SingleStep)!;

  expect(reasons).toHaveLength(1);
  expect(reasons[0].reason).toBe(StepReason.RESOLUTION_KEY);
} );
