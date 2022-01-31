import { C5, E5, G5 } from "spns/chromatic";
import { TestInit } from "tests";
import { NearStepsGen } from "./NearStepsGenerator";

TestInit.loadAll();
it("near motion C5-E5-G5 in C", () => {
  const fromNotes = [C5, E5, G5];
  const nearMotion = NearStepsGen.create()
    .notesLength(fromNotes.length)
    .maxStep(2);
  const steps = nearMotion.generateSteps();
  const actual = steps.length;
  const expected = 125 - 1;

  expect(actual).toEqual(expected);
} );
