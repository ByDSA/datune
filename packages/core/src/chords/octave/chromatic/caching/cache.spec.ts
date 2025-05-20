import type { PitchArray } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { cache, Key } from "./cache";

it("same instance", () => {
  const pitches = [P.C, P.E, P.G] as PitchArray;
  const pitchesKey: Key = {
    pitches,
    rootIndex: 0,
  };
  const actual1 = cache.getOrCreate(pitchesKey);
  const actual2 = cache.getOrCreate( {
    ...pitchesKey,
  } );

  expect(actual1).toBe(actual2);
} );

it("different instance", () => {
  const pitches = [P.C, P.E, P.G] as PitchArray;
  const pitchesKey: Key = {
    pitches,
    rootIndex: 0,
  };
  const actual1 = cache.getOrCreate(pitchesKey);
  const actual2 = cache.getOrCreate( {
    ...pitchesKey,
    rootIndex: 1,
  } );

  expect(actual1).not.toBe(actual2);
} );
