import { DegreeFunction } from "../../tonalities/functions/DegreeFunction";
import * as init from "../../initializer";
import { Tonality } from "../../tonalities/Tonality";
import { FunctionalChord } from "./FunctionalChord";
init.tonalities.default();
init.degreeFunctions.default();

test('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let functionalChord = FunctionalChord.from(Tonality.C, DegreeFunction.I);
    expect(functionalChord.tonality).toBe(Tonality.C);
    expect(functionalChord.harmonicFunction).toBe(DegreeFunction.I);
});