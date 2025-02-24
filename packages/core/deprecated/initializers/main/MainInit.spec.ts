import * as fs from "fs";
import { initInitTest } from "initializers/TestsCommon";
import MainInit from "./MainInit";

const TMP = "tmpMainInit";

initInitTest(TMP);

it("savee", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.save();
} );

it("not initialized at begin", () => {
  const actual = MainInit.singleton.initialized();

  expect(actual).toBeFalsy();
} );

it("cleardata ok", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.clearData();
  const actual = MainInit.singleton.initialized();

  expect(actual).toBeFalsy();
} );

it("precalc ok", () => {
  MainInit.singleton.precalc();
  const actual = MainInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );

it("save ok", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.saveTo(TMP);
  const actual = fs.existsSync(TMP);

  expect(actual).toBeTruthy();
} );

it("load if not exists", () => {
  MainInit.singleton.loadFrom(TMP);
  const actual = MainInit.singleton.initialized();

  expect(actual).toBeFalsy();
} );

it("save and load", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.saveTo(TMP);
  MainInit.singleton.clearData();
  MainInit.singleton.loadFrom(TMP);
  const actual = MainInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );
