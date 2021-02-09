import { SingleStep } from "./SingleStep";

it("cache", () => {
    let actual = SingleStep.from(0, 1);
    let expected = SingleStep.from(0, 1);

    expect(actual).toBe(expected);
})

it("try to change private variables: _index", () => {
    const t = () => {
        (<any>SingleStep.from(0, 1))._index = 1;
    };
    expect(t).toThrow(TypeError);
})

it("try to change private variables: _interval", () => {
    const t = () => {
        (<any>SingleStep.from(0, 1))._interval = 1;
    };
    expect(t).toThrow(TypeError);
})