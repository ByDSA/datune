import type { PitchArray } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { PitchSets as PS } from "chromatic";
import { cache, Key } from "./cache";

it("same instance", () => {
  const pitches = [P.C, P.E, P.G] as PitchArray;
  const pitchesKey: Key = {
    pitchSet: PS.fromPitches(...pitches),
    root: pitches[0],
    bass: pitches[0],
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
    pitchSet: PS.fromPitches(...pitches),
    root: pitches[0],
    bass: pitches[0],
  };
  const actual1 = cache.getOrCreate(pitchesKey);
  const actual2 = cache.getOrCreate( {
    ...pitchesKey,
    root: pitches[0],
    bass: pitches[1],
  } );

  expect(actual1).not.toBe(actual2);
} );
