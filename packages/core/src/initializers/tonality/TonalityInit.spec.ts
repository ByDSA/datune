import { MainInit } from "initializers/main/MainInit";
import { initInitTest } from "initializers/TestsCommon";
import { TonalityInit } from "./TonalityInit";

const TMP = "tmpKeyInit";
initInitTest(TMP);
beforeEach(() =>
    TonalityInit.singleton.clearData()
)

it("initialized", () => {
    const actual = TonalityInit.singleton.initialized();
    expect(actual).toBeFalsy();
})

it("load ok", () => {
    MainInit.singleton.precalc();
    MainInit.singleton.saveTo(TMP);
    MainInit.singleton.clearData();
    TonalityInit.singleton.clearData();
    TonalityInit.singleton.loadFrom(TMP);
    const actual = TonalityInit.singleton.initialized();
    expect(actual).toBeTruthy();
})

it("precalc ok", () => {
    TonalityInit.singleton.precalc();
    const actual = TonalityInit.singleton.initialized();
    expect(actual).toBeTruthy();
})