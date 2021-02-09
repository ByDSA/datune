import { AbsolutePitchAny } from "../../symbolic/absolute/AbsolutePitch";
import { SPN } from "../../symbolic/absolute/spn/SPN";
import { ConcertPitch } from "./ConcertPitch";

describe.each([
    [ConcertPitch.A440, SPN.A4],
    [ConcertPitch.A444, SPN.A4],
    [ConcertPitch.A432, SPN.A4],
])("symbolicPitch", (concertPitch: ConcertPitch, expectedSymbolicPitch: AbsolutePitchAny) => {
    it(`${concertPitch}.frequency = ${expectedSymbolicPitch}`, async () => {
        let actual: AbsolutePitchAny = concertPitch.absPitch;

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
        (<any>ConcertPitch).A440 = ConcertPitch.A432;
    } catch (err) {
        expect(err).not.toBeNull();
    }
})