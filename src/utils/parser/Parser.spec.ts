import { ParserBottomUp } from "./Parser";
import { Diatonic } from "../../degrees/Diatonic";

import * as init from "../../initializer";
init.chromatics.default();
init.diatonics.default();
init.diatonicAlts.default();
init.intervalDiatonicAlts.default();
init.settings.default();

test('CD - diatonic diatonic', () => {
    let str = "CD";
    let parser = new ParserBottomUp()
    .add(Diatonic.name, function(str:string): Diatonic {
        return Diatonic.fromString(str);
    })
    .from(str)
    .expected([Diatonic.name, Diatonic.name]);

    let actual = parser.parse();
    let expected = [Diatonic.C, Diatonic.D];
    
    expect(actual).toEqual(expected);
});