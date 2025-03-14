import { SPNArray, SPNs } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { expectSteps } from "voice-leading/steps/tests/steps";
import { from as singleStepFrom } from "../../steps/single/building";
import { fromIntervals as compositeStepFromIntervals } from "../../steps/composite/building";
import { generate, voicingFromSpnArray } from "./generate";

TestInit.loadAll();

const { B3, C4, F4, G4, GG4, E4 } = SPNs;

it("interval=M2: F4, G4", () => {
  const bottom = F4;
  const top = G4;
  const notes: SPNArray = [bottom, top];
  const actual = generate( {
    voicing: voicingFromSpnArray(notes),
  } ).steps;
  const expected = [
    compositeStepFromIntervals(-2, 0),
    compositeStepFromIntervals(-1, 0),
    compositeStepFromIntervals(0, 1),
    compositeStepFromIntervals(0, 2),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("sus4: C4, F4, G4", () => {
  const bottom = F4;
  const top = G4;
  const notes: SPNArray = [C4, bottom, top];
  const actual = generate( {
    voicing: voicingFromSpnArray(notes),
  } ).steps;
  const expected = [
    compositeStepFromIntervals(undefined, -1, 0),
    compositeStepFromIntervals(undefined, -2, 0),
    compositeStepFromIntervals(undefined, 0, 1),
    compositeStepFromIntervals(undefined, 0, 2),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("nothing: C4, G4", () => {
  const bottom = C4;
  const top = G4;
  const notes: SPNArray = [bottom, top];
  const actual = generate( {
    voicing: voicingFromSpnArray(notes),
  } );

  expect(actual.steps).toHaveLength(0);
} );

it("tritone interval: B3, F4", () => {
  const notes: SPNArray = [B3, F4];
  const actual = generate( {
    voicing: voicingFromSpnArray(notes),
  } ).steps;
  const expected = [
    compositeStepFromIntervals(1, 2),
    compositeStepFromIntervals(1, -1),
    compositeStepFromIntervals(1, -2),
    compositeStepFromIntervals(2, 1),
    compositeStepFromIntervals(2, -1),
    compositeStepFromIntervals(2, -2),
    compositeStepFromIntervals(-1, 1),
    compositeStepFromIntervals(-1, 2),
    compositeStepFromIntervals(-1, -2),
    compositeStepFromIntervals(-2, 1),
    compositeStepFromIntervals(-2, 2),
    compositeStepFromIntervals(-2, -1),
  ];

  expectSteps(actual).toEqual(expected);
} );

it("augmented triad", () => {
  const notes: SPNArray = [C4, E4, GG4];
  const actual = generate( {
    voicing: voicingFromSpnArray(notes),
  } ).steps;
  const expected = [
    singleStepFrom(0, 1),
    singleStepFrom(0, -1),
    singleStepFrom(1, 1),
    singleStepFrom(1, -1),
    singleStepFrom(2, 1),
    singleStepFrom(2, -1),
    compositeStepFromIntervals(1, 1),
    compositeStepFromIntervals(undefined, 1, 1),
    compositeStepFromIntervals(1, undefined, 1),
    compositeStepFromIntervals(-1, -1),
    compositeStepFromIntervals(undefined, -1, -1),
    compositeStepFromIntervals(-1, undefined, -1),
    compositeStepFromIntervals(1, -1),
    compositeStepFromIntervals(-1, 1),
    compositeStepFromIntervals(undefined, 1, -1),
    compositeStepFromIntervals(undefined, -1, 1),
    compositeStepFromIntervals(1, undefined, -1),
    compositeStepFromIntervals(-1, undefined, 1),
  ];

  expectSteps(actual).toEqual(expected);
} );
