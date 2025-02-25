import { Array as PitchArray, C, E, G } from "pitches/alt";
import { TestInit } from "tests";
import cache from "./cache";

TestInit.diatonicAltChord();
it("same instance", () => {
  const pitches = [C, E, G] as PitchArray;
  const actual1 = cache.getOrCreate(pitches);
  const actual2 = cache.getOrCreate(pitches);

  expect(actual1).toBe(actual2);
} );
