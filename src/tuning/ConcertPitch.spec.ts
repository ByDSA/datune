import { SPN } from "../pitch/symbolic/SPN";
import { SymbolicPitch } from "../pitch/symbolic/SymbolicPitch";
import * as precalc from "../precalc";
import { ConcertPitch } from "./ConcertPitch";
precalc.concertPitches();
precalc.spns();
precalc.settings(); // Por si salta excepción

describe.each([
    [ConcertPitch.A440, SPN.A4],
    [ConcertPitch.A444, SPN.A4],
    [ConcertPitch.A432, SPN.A4],
])("symbolicPitch", (concertPitch: ConcertPitch, expectedSymbolicPitch: SymbolicPitch) => {
    it(`${concertPitch}.frequency = ${expectedSymbolicPitch}`, async () => {
        let actual: SymbolicPitch = concertPitch.symbolicPitch;

        expect(actual).toBe(expectedSymbolicPitch);
    });
})

describe.each([
    [ConcertPitch.A440, 440],
    [ConcertPitch.A444, 444],
    [ConcertPitch.A432, 432],
])("frequency", (concertPitch: ConcertPitch, expectedFrequency: number) => {
    it(`${concertPitch}.frequency = ${expectedFrequency}`, async () => {
        let actual: number = concertPitch.frequency;

        expect(actual).toBe(expectedFrequency);
    });
})

it("static immutables cannot be reassigned", async () => {
    expect.assertions(1);
    try {
        ConcertPitch.A440 = ConcertPitch.A432;
    } catch (err) {
        expect(err).not.toBeNull();
    }
})