import { Func, Tonality } from "tonalities";
import { TonalityFunctionBuilder } from "./TonalityFunctionBuilder";

it('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let builder = TonalityFunctionBuilder
        .from(Tonality.C, Func.I);
    expect(builder.tonality).toBe(Tonality.C);
    expect(builder.function).toBe(Func.I);
})