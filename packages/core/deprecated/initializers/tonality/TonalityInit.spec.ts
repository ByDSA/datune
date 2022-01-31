import { MainInit } from "initializers/main/MainInit";
import { initInitTest } from "initializers/TestsCommon";
import { KeyInit } from "./KeyInit";

const TMP = "tmpKeyInit";

initInitTest(TMP);
beforeEach(() => KeyInit.singleton.clearData());

it("initialized", () => {
  const actual = KeyInit.singleton.initialized();

  expect(actual).toBeFalsy();
} );

it("load ok", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.saveTo(TMP);
  MainInit.singleton.clearData();
  KeyInit.singleton.clearData();
  KeyInit.singleton.loadFrom(TMP);
  const actual = KeyInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );

it("precalc ok", () => {
  KeyInit.singleton.precalc();
  const actual = KeyInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );
