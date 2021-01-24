import { Chord, ChromaticArray } from "../../../../../chords";
import { Chromatic, SPN } from "../../../../../pitches";
import { CombinationResult } from "../../../../../voiceleading/steps/applier/StepCombinationsApplier";
import { Target } from "../../../../../voiceleading/steps/Step";
import { MotionCreatorResult } from "./MotionCreatorResult";

export function transformToChords(result: MotionCreatorResult): Chord[] {
    let chordsArray1: Chord[] = getValidChordsFromCombinationResults(result.combinationResults);
    let chordsSet = new Set(chordsArray1);
    return [...chordsSet];
}

export function transformToChordsRootPosition(result: MotionCreatorResult): Chord[] {
    let chordsArray1 = getValidChordsFromCombinationResults(result.combinationResults).map(c => c.withInv(-c.inversionNumber));

    let chordsSet = new Set(chordsArray1);
    return [...chordsSet];
}

function getValidChordsFromCombinationResults(combinationResults: CombinationResult[]): Chord[] {
    return <Chord[]>combinationResults.map(mcr => {
        const notes = getValidNotesFromTarget(mcr.target);
        if (notes.length === 0)
            return null;
        return Chord.fromNotes(...<ChromaticArray>notes);
    }).filter(c => c);
}

export function transformToSPNArray(result: MotionCreatorResult): SPN[][] {
    return <SPN[][]>result.combinationResults.map(mcr => {
        return mcr.target.filter(s => s);
    });
}

function getValidNotesFromTarget(target: Target): Chromatic[] {
    return <Chromatic[]>target.map(s => s?.degree || null).filter(s => s);
}