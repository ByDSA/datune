import type { PitchArray } from "@datune/core/pitches/chromatic";
import type { SPNArray } from "@datune/core/spns/chromatic";
import { Keys } from "@datune/core/keys/chromatic";
import { SPNs } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { expectTargets } from "voice-leading/forward/tests/targets";
import { fromIntervals as compositeStepFromIntervals } from "../steps/composite/building";
import { X0_1, X1_S1 } from "../steps/single/constants";
import { from } from "../steps/single/building";
import { Target } from "../steps/Step";
import { flattenStep } from "../steps/flattenSteps";
import { generate } from "../generators/nearest/generate";
import { applyCombinations } from "./combination-appliers";
import { voiceCrossingFilter, voiceOverlappingFilter } from "./voices-interaction-filters";

TestInit.loadAll();

const { A5, AA5, B4, C5, CC5, D5, DD5, E5, F5, FF5, G5 } = SPNs;

it("apply: notes and combinations", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    [X0_1, X1_S1],
    [X0_1, from(2, 2)],
    compositeStepFromIntervals(1, 2, 3).singleSteps,
  ];
  const actual = applyCombinations(notes, combinations, {
    afterFilters: [voiceCrossingFilter, voiceOverlappingFilter],
  } ).targets;
  const expected = [
    [CC5, DD5, G5],
    [CC5, E5, A5],
    [CC5, FF5, AA5],
  ];

  expectTargets(actual).toEqualSpnsArray(expected);
} );

it("overlapping discards", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    compositeStepFromIntervals(5, 2, 3).singleSteps,
  ];
  const actual = applyCombinations(notes, combinations, {
    afterFilters: [voiceCrossingFilter, voiceOverlappingFilter],
  } ).targets;
  const expected: Target[] = [];

  expectTargets(actual).toEqual(expected);
} );

it("overlapping let", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    compositeStepFromIntervals(5, 2, 3).singleSteps,
  ];
  const actual = applyCombinations(notes, combinations).targets;
  const expected: SPNArray[] = [
    [F5, FF5, AA5],
  ];

  expectTargets(actual).toEqualSpnsArray(expected);
} );

it("near (distance=2) C5-E5-G5 in C", () => {
  const fromNotes: SPNArray = [C5, E5, G5];
  const { steps } = generate( {
    arrayLength: fromNotes.length,
    maxInterval: 2,
  } );
  const combinations = steps.map(flattenStep);
  let actual = applyCombinations(fromNotes, combinations, {
    afterFilters: [voiceCrossingFilter, voiceOverlappingFilter],
  } ).targets;

  actual = actual
    .filter(
      (target) => {
        const pitches = target.map((s) => s?.pitch || null) as PitchArray;
        const ret = Keys.C.hasPitches(...pitches);

        return ret;
      },
    );
  const expected = [
    [B4, D5, F5],
    [B4, D5, A5],
    [B4, D5, G5],
    [B4, F5, A5],
    [B4, F5, G5],
    [B4, E5, F5],
    [B4, E5, A5],
    [B4, E5, G5],
    [D5, F5, A5],
    [D5, F5, G5],
    [D5, E5, F5],
    [D5, E5, A5],
    [D5, E5, G5],
    [C5, D5, F5],
    [C5, D5, A5],
    [C5, D5, G5],
    [C5, F5, A5],
    [C5, F5, G5],
    [C5, E5, F5],
    [C5, E5, A5],
  ];

  expectTargets(actual).toEqualSpnsArray(expected);
} );
