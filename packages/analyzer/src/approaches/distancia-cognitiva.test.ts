import { Chords as C, Chord, Degrees as D, Funcs, Keys, Pitches as P, PitchSets as PS } from "@datune/core";
import { getSortedCantidates, lowestDistanceChord } from "approaches/chord-distances";

const key = Keys.FFm;
const harmonicRegion: Chord[] = [
  Funcs.Im.getChord(key),
  Funcs.ISUS4.getChord(key),
  Funcs.fromDegrees(D.I, D.bIII, D.bVI).getChord(key),
  Funcs.II0.getChord(key),
  Funcs.bIII.getChord(key),
  Funcs.IVm.getChord(key),
  Funcs.Vm.getChord(key),
  Funcs.bVI.getChord(key),
  Funcs.bVII.getChord(key),
];

it("test1", () => {
  const init = PS.fromPitches(P.FF, P.A, P.CC);
  const expected = C.FFm;
  const bass = P.FF;
  const eachDistance = getSortedCantidates(init, bass, harmonicRegion);
  const [actual] = eachDistance;

  expect(actual.chord).toBe(expected);
} );

it("test2", () => {
  const init = PS.fromPitches(P.E, P.GG, P.B, P.FF);
  const expected = C.E;
  const bass = P.E;
  const eachDistance = getSortedCantidates(init, bass, harmonicRegion);
  const [actual] = eachDistance;

  expect(actual.chord).toBe(expected);
} );

it("test3", () => {
  const init = PS.fromPitches(P.A, P.FF, P.GG, P.D);
  const expected = C.fromPitches(P.FF, P.A, P.D); // F#mb6
  const bass = P.FF;
  const actual = lowestDistanceChord(init, bass, harmonicRegion);

  expect(actual).toBe(expected);
} );
