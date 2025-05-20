import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { cache, Key } from "./cache";

it("same instance", () => {
  const { C, E, G } = P;
  const pitches = [C, E, G] as PitchArray;
  const key: Key = {
    pitches,
    rootIndex: 0,
  };
  const actual1 = cache.getOrCreate(key);
  const actual2 = cache.getOrCreate( {
    ...key,
  } );

  expect(actual1).toBe(actual2);
} );
