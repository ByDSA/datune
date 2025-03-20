import type { PitchArray } from "@datune/core/pitches/chromatic";
import type { SpnArray } from "@datune/core/spns/chromatic";
import { Keys as K } from "@datune/core/keys/chromatic";
import { Spns as N } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { expectTargets } from "voice-leading/forward/tests/targets";
import { Combination } from "voice-leading/combiners/types";
import { combineStepGroups } from "voice-leading/combiners/combine-groups";
import { Target } from "voice-leading/steps/Target";
import { compositeStepFromIntervals } from "../steps/composite/building";
import { SS_0_1, SS_1_S1 } from "../steps/single/constants";
import { singleStepFrom } from "../steps/single/building";
import { toNear } from "../generators/near/generate";
import { applyCombinations } from "./combination-appliers";
import { voiceCrossingFilter, voiceOverlappingFilter } from "./processors/voices-interaction-filters";

TestInit.loadAll();

const { A5, AA5, B4, C5, CC5, D5, DD5, E5, F5, FF5, G5 } = N;

it("apply: notes and combinations", () => {
  const notes: SpnArray = [C5, E5, G5];
  const combinations = [
    [SS_0_1, SS_1_S1],
    [SS_0_1, singleStepFrom(2, 2)],
    compositeStepFromIntervals(1, 2, 3).singleSteps,
  ] as Combination[];
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
  const notes: SpnArray = [C5, E5, G5];
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
  const notes: SpnArray = [C5, E5, G5];
  const combinations = [
    compositeStepFromIntervals(5, 2, 3).singleSteps,
  ];
  const actual = applyCombinations(notes, combinations).targets;
  const expected: SpnArray[] = [
    [F5, FF5, AA5],
  ];

  expectTargets(actual).toEqualSpnsArray(expected);
} );

it("near (distance=2) C5-E5-G5 in C", () => {
  const fromNotes: SpnArray = [C5, E5, G5];
  const { groups } = toNear( {
    arrayLength: fromNotes.length,
    maxInterval: 2,
  } );
  const { combinations } = combineStepGroups(groups);
  let actual = applyCombinations(fromNotes, combinations, {
    afterFilters: [voiceCrossingFilter, voiceOverlappingFilter],
  } ).targets;

  actual = actual
    .filter(
      (target) => {
        const pitches = target.map((s) => s?.pitch || null) as PitchArray;
        const ret = K.C.hasPitches(...pitches);

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
