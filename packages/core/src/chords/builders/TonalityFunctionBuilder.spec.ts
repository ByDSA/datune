import * as init from "../../initializer";
import { DegreeFunction } from "../../tonalities/functions/DegreeFunction";
import { Tonality } from "../../tonalities/Tonality";
import { TonalityFunctionBuilder } from "./TonalityFunctionBuilder";
init.tonalities.default();
init.degreeFunctions.default();

test('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let builder = TonalityFunctionBuilder.create()
        .setTonality(Tonality.C)
        .setFunction(DegreeFunction.I);
    expect(builder.getTonality()).toBe(Tonality.C);
    expect(builder.getFunction()).toBe(DegreeFunction.I);
});