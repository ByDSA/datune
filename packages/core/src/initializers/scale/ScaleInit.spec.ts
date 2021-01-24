import { MainInit } from "initializers/main/MainInit";
import { initInitTest } from "initializers/TestsCommon";
import { ScaleInit } from "./ScaleInit";

const TMP = "tmpScaleInit";
initInitTest(TMP);
beforeEach(() =>
    ScaleInit.singleton.clearData()
)

it("initialized", () => {
    const actual = ScaleInit.singleton.initialized();
    expect(actual).toBeFalsy();
})

it("load ok", () => {
    MainInit.singleton.precalc();
    MainInit.singleton.saveTo(TMP);
    MainInit.singleton.clearData();
    ScaleInit.singleton.clearData();
    ScaleInit.singleton.loadFrom(TMP);
    const actual = ScaleInit.singleton.initialized();
    expect(actual).toBeTruthy();
})

it("precalc ok", () => {
    ScaleInit.singleton.precalc();
    const actual = ScaleInit.singleton.initialized();
    expect(actual).toBeTruthy();
})