import { Func, TonalityAlt } from "tonalities";
import { TonalityAltFunctionBuilder } from "./TonalityAltFunctionBuilder";

it('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let builder = TonalityAltFunctionBuilder
        .from(TonalityAlt.C, Func.I);
    expect(builder.tonality).toBe(TonalityAlt.C);
    expect(builder.function).toBe(Func.I);
})