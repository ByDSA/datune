import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { cache } from "./cache";

it("same instance", () => {
  const { C, E, G } = P;
  const pitches = [C, E, G] as PitchArray;
  const actual1 = cache.getOrCreate(pitches);
  const actual2 = cache.getOrCreate(pitches);

  expect(actual1).toBe(actual2);
} );
