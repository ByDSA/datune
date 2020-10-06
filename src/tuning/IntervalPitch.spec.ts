import * as init from "../initializer";
import { IntervalPitch } from "./IntervalPitch";
init.intervalPitches.default();

describe.each([
    [IntervalPitch.UNISON, 0],
    [IntervalPitch.OCTAVE, 1200],
    [IntervalPitch.CENT, 1],
    [IntervalPitch.ET12.QUARTER_TONE, 50],
    [IntervalPitch.COMMAS.PYTHAGOREAN_COMMA, 23.46],
    [IntervalPitch.JUST.QUARTER_TONE, 49.98],
])("cents", (intervalPitch, cents) => {
    it(`${intervalPitch}.cents = ${cents}`, async () => {
        let actual = intervalPitch.cents;

        if (cents % 1 === 0)
            expect(actual).toBe(cents);
        else
            expect(actual).toBeCloseTo(cents);
    }, 500);
})

describe.each([
    [IntervalPitch.UNISON, 1],
    [IntervalPitch.OCTAVE, 2],
])("ratio", (intervalPitch, ratio) => {
    it(`${intervalPitch}.ratio = ${ratio}`, async () => {
        let actual = intervalPitch.ratio.value;

        if (ratio % 1 === 0)
            expect(actual).toBe(ratio);
        else
            expect(actual).toBeCloseTo(ratio);
    }, 500);
})