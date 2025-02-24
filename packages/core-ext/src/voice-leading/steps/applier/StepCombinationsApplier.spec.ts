import { C as T_C } from "@datune/core/keys/chromatic";
import { Array as ChromaticArray } from "@datune/core/pitches/chromatic";
import { A5, AA5, Array as SPNArray, B4, C5, CC5, D5, DD5, E5, F5, FF5, G5 } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { CompositeStep } from "../composite/CompositeStep";
import { expandStepsArray } from "../forward/multi/Utils";
import { NearStepsGen } from "../generators/others/near/NearStepsGenerator";
import { from, _0_1, _1_S1 } from "../single";
import { StepArray, Target } from "../Step";
import { StepCombinationsApplier } from "./StepCombinationsApplier";

TestInit.loadAll();
it("apply: notes and combinations", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    [_0_1, _1_S1],
    [_0_1, from(2, 2)],
    CompositeStep.fromIntervals(1, 2, 3).singleSteps,
  ];
  const applier = StepCombinationsApplier.create()
    .notes(...notes)
    .combinations(combinations);
  const actual = applier.apply().map((r) => r.target);
  const expected = [
    [CC5, DD5, G5],
    [CC5, E5, A5],
    [CC5, FF5, AA5],
  ];

  expect(actual).toStrictEqual(expected);
} );

it("overlapping discards", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    CompositeStep.fromIntervals(5, 2, 3).singleSteps,
  ];
  const applier = StepCombinationsApplier.create()
    .notes(...notes)
    .combinations(combinations);
  const r = applier.apply();
  const actual: Target[] = r.map((rr) => rr.target);
  const expected: Target[] = [];

  expect(actual).toStrictEqual(expected);
} );

it("overlapping let", () => {
  const notes: SPNArray = [C5, E5, G5];
  const combinations = [
    CompositeStep.fromIntervals(5, 2, 3).singleSteps,
  ];
  const applier = StepCombinationsApplier.create()
    .notes(...notes)
    .letVoiceOverlapping()
    .combinations(combinations);
  const actual = applier.apply().map((r) => r.target);
  const expected: SPNArray[] = [
    [F5, FF5, AA5],
  ];

  expect(actual).toStrictEqual(expected);
} );

it("apply: without notes", () => {
  const applier = StepCombinationsApplier.create()
    .combinations([]);
  const t = () => applier.apply();

  expect(t).toThrow(Error);
} );

it("near (2 steps) C5-E5-G5 in C", () => {
  const fromNotes: SPNArray = [C5, E5, G5];
  const nearMotion = NearStepsGen.create()
    .notesLength(fromNotes.length)
    .maxStep(2);
  const steps = nearMotion.generateSteps();
  const combinations = expandStepsArray(<StepArray>steps);
  const applier = StepCombinationsApplier.create()
    .notes(...fromNotes)
    .combinations(combinations);
  const actual: Target[] = applier.apply()
    .filter(
      (result) => {
        const pitches = <ChromaticArray>result.target.map((s) => s?.pitch || null);
        const ret = T_C.hasPitches(...pitches);

        return ret;
      },
    )
    .map((result) => result.target);
  const expected: Target[] = [
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

  expect(new Set(actual)).toEqual(new Set(expected));
} );
