import { ParserBottomUp } from "@datune/utils";
import { Diatonic } from "../../src/pitches";

test('CD - diatonic diatonic', () => {
    let str = "CD";
    let parser = new ParserBottomUp()
        .add(Diatonic.name, function (str: string): Diatonic | null {
            return Diatonic.fromString(str);
        })
        .from(str)
        .expected([Diatonic.name, Diatonic.name]);

    let actual = parser.parse();
    let expected = [Diatonic.C, Diatonic.D];

    expect(actual).toEqual(expected);
});