import { ChordAlt } from "../../../chords";
import { DegreeAlt } from "../../../scales";
import { TonalityAlt } from "../../alt/TonalityAlt";
import { FunctionsFacade } from "../FunctionsFacade";
import { CompoundFunction } from "./CompoundFunction";

describe.each([
    [CompoundFunction.from(FunctionsFacade.V, DegreeAlt.V), TonalityAlt.C, ChordAlt.D],
    [CompoundFunction.from(FunctionsFacade.V7, DegreeAlt.V), TonalityAlt.C, ChordAlt.D7],
    [CompoundFunction.from(FunctionsFacade.V7, DegreeAlt.V, DegreeAlt.V), TonalityAlt.C, ChordAlt.A7]
])("test", (func, tonalityAlt, expectedAlt) => {
    it(`${func} of ${tonalityAlt} = ${expectedAlt}`, () => {
        let actual = func.getChord(tonalityAlt.tonality);

        expect(actual).toBe(expectedAlt.chord);
    })

    it(`${func} of ${tonalityAlt} = ${expectedAlt}`, () => {
        let actual = func.getChordAlt(tonalityAlt);

        expect(actual).toBe(expectedAlt);
    })
})