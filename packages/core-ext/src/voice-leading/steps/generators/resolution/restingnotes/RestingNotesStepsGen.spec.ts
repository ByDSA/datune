import { C as T_C, rootChord3, rootChord4 } from "@datune/core/keys/chromatic";
import { Array as PitchArray } from "@datune/core/pitches/chromatic";
import { Array as SPNArray, B4, C5, D5 } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { from } from "../../../single";
import RestingNotesStepsGen from "./RestingNotesStepsGen";

TestInit.loadAll();
it("B4 in Key=C (root=3)", () => {
  const spns: SPNArray = [B4];
  const key = T_C;
  const root3 = rootChord3(key);
  const restingNotes = root3?.pitches as PitchArray;
  const solver = RestingNotesStepsGen.create()
    .notes(...spns)
    .restingNotes(...restingNotes);
  const actual = solver.generateSteps();
  const expected = [
    from(0, 1),
  ];

  expect(actual).toStrictEqual(expected);
} );

it("D5 in Key=C (root=3)", () => {
  const notes: SPNArray = [D5];
  const restingNotes = <PitchArray>rootChord3(T_C)?.pitches;
  const solver = RestingNotesStepsGen.create()
    .notes(...notes)
    .restingNotes(...restingNotes);
  const actual = solver.generateSteps();
  const expected = [
    from(0, 2),
    from(0, -2),
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("C5 in Key=C (root=3)", () => {
  const notes: SPNArray = [C5];
  const restingNotes = <PitchArray>rootChord3(T_C)?.pitches;
  const solver = RestingNotesStepsGen.create()
    .notes(...notes)
    .restingNotes(...restingNotes);
  const actual = solver.generateSteps();
  const expected = [
    from(0, 0),
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("C5 in Key=C (root=4)", () => {
  const notes: SPNArray = [C5];
  const restingNotes = <PitchArray>rootChord4(T_C)?.pitches;
  const solver = RestingNotesStepsGen.create()
    .notes(...notes)
    .restingNotes(...restingNotes);
  const actual = solver.generateSteps();
  const expected = [
    from(0, -1),
    from(0, 0),
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("D5 in Key=C (root=4, maxStep=3)", () => {
  const notes: SPNArray = [D5];
  const restingNotes = <PitchArray>rootChord4(T_C)?.pitches;
  const solver = RestingNotesStepsGen.create()
    .notes(...notes)
    .maxStep(3)
    .restingNotes(...restingNotes);
  const actual = solver.generateSteps();
  const expected = [
    from(0, -3),
    from(0, -2),
    from(0, 2),
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );
