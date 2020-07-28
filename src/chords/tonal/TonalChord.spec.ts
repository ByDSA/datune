import { DegreeFunction } from "../../function/DegreeFunction";
import * as precalc from "../../precalc";
import { Tonality } from "../../tonality/Tonality";
import { TonalChord } from "./TonalChord";
precalc.tonalities();
precalc.degreeFunctions();

test('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let tonalChord = TonalChord.from(Tonality.C, DegreeFunction.I);
    expect(tonalChord.tonality).toBe(Tonality.C);
    expect(tonalChord.harmonicFunction).toBe(DegreeFunction.I);
});