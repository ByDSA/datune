import { SPNArray, SPNs as N } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { createFillZerosTransform } from "voice-leading/combiners/transforms";
import { expectCombinations } from "voice-leading/combiners/tests/combination";
import { combineStepGroups } from "../../combiners/combine-groups";
import { fromIntervals as compositeStepFromIntervals } from "../../steps/composite/building";
import { from as singleStepFrom } from "../../steps/single/building";
import { SingleStep } from "../../steps/single/SingleStep";
import { generateMultiple } from "./generate";

TestInit.loadAll();

const { B3, B4, C4, D3, D4, F4, G3, G4, GG4 } = N;

it("combinations - SUS in notes: C4, F4, G4", () => {
  const base: SPNArray = [C4, F4, G4];
  const result = generateMultiple(base, {
    nearest: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups);
  const expected = [
    [singleStepFrom(1, -1), singleStepFrom(2, 0)],
    [singleStepFrom(1, -2), singleStepFrom(2, 0)],
    [singleStepFrom(1, 0), singleStepFrom(2, 1)],
    [singleStepFrom(1, 0), singleStepFrom(2, 2)],
  ];

  expectCombinations(actual, expected);
} );

it("combinations - nearest (1): C4, G4", () => {
  const base: SPNArray = [C4, G4];
  const result = generateMultiple(base, {
    maxDistance: 1,
  } );
  const actual = combineStepGroups(result.groups);
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
  const notes: SPNArray = [D3, F4, B4];
  const result = generateMultiple(notes, {
    nearest: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups);
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
  const spnArray: SPNArray = [G3, B3, D4, F4];
  const result = generateMultiple(spnArray, {
    nearest: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups, {
    afterTransforms: [createFillZerosTransform(spnArray.length)],
  } );
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
  const spnArray: SPNArray = [B3, F4, GG4];
  const result = generateMultiple(spnArray, {
    nearest: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups, {
    afterTransforms: [createFillZerosTransform(spnArray.length)],
  } );
  const expected: SingleStep[][] = [
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
  const notes: SPNArray = [G3, B3, D4, F4];
  const result = generateMultiple(notes, {
    nearest: {
      enabled: false,
    },
    voicingResolution: {
      enabled: false,
    },
  } );
  const actual = combineStepGroups(result.groups);
  const expected: SingleStep[][] = [];

  expectCombinations(actual, expected);
} );
