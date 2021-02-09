import { RhythmPattern } from "./RhythmPattern";

it("iterator", () => {
    const rhythm = RhythmPattern.fromArray(1, 0, 0, 0);
    const array = rhythm.array;
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(0);
    expect(array[2]).toBe(0);
    expect(array[3]).toBe(0);
})

it("fromInt", () => {
    const rhythm = RhythmPattern.fromArray(1, 0, 0, 0);
    const array = rhythm.array;
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(0);
    expect(array[2]).toBe(0);
    expect(array[3]).toBe(0);
})

it("get_exceed", () => {
    const rhythm = RhythmPattern.fromArray(1, 0, 0, 0);
    const array = rhythm.array;
    array[4];
})

it("from content", () => {
    const rhythm = RhythmPattern.from(2, 2, 2, 3);
    const array = rhythm.array;
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(0);
    expect(array[2]).toBe(1);
    expect(array[3]).toBe(0);
    expect(array[4]).toBe(1);
    expect(array[5]).toBe(0);
    expect(array[6]).toBe(1);
    expect(array[7]).toBe(0);
    expect(array[8]).toBe(0);
})

it("fromPattern size", () => {
    let rhythm = RhythmPattern.from(2, 2, 2, 3);
    expect(rhythm.array.length).toBe(9);
})

it("getRotation", () => {
    let rhythm = RhythmPattern.from(2, 2, 2, 3);

    let rotatedRhythm = rhythm.withRotation(1);

    expect(rotatedRhythm.values).toEqual([3, 2, 2, 2]);
})