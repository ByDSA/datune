import { Chord, fromPitches, inv } from "chords/chromatic";
import { Array as ChromaticArray, Pitch as Chromatic } from "pitches/chromatic";
import { SPN } from "spns/chromatic";
import { CombinationResult } from "../../../applier/StepCombinationsApplier";
import { Target } from "../../../Step";
import { MotionCreatorResult } from "./MotionCreatorResult";

export function transformToChords(result: MotionCreatorResult): Chord[] {
  const chordsArray1: Chord[] = getValidChordsFromCombinationResults(result.combinationResults);
  const chordsSet = new Set(chordsArray1);

  return [...chordsSet];
}

export function transformToChordsRootPosition(result: MotionCreatorResult): Chord[] {
  const chordsArray1 = getValidChordsFromCombinationResults(result.combinationResults).map(
    (c) => {
      const inversionNumber = 0; // TODO

      return inv(c, -inversionNumber);
    },
  );
  const chordsSet = new Set(chordsArray1);

  return [...chordsSet];
}

function getValidChordsFromCombinationResults(combinationResults: CombinationResult[]): Chord[] {
  return <Chord[]>combinationResults.map((mcr) => {
    const notes = getValidNotesFromTarget(mcr.target);

    if (notes.length === 0)
      return null;

    return fromPitches(...<ChromaticArray>notes);
  } ).filter((c) => c);
}

export function transformToSPNArray(result: MotionCreatorResult): SPN[][] {
  return <SPN[][]>result.combinationResults.map((mcr) => mcr.target.filter((s) => s));
}

function getValidNotesFromTarget(target: Target): Chromatic[] {
  return <Chromatic[]>target.map((s) => s?.pitch || null).filter((s) => s);
}
