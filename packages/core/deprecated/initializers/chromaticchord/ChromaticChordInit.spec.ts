import MainInit from "initializers/main/MainInit";
import { initInitTest } from "initializers/TestsCommon";
import { ChromaticChordInit } from "./ChromaticChordInit";

const TMP = "tmpChromaticChordInit";

initInitTest(TMP);
beforeEach(() => ChromaticChordInit.singleton.clearData());

it("initialized", () => {
  const actual = ChromaticChordInit.singleton.initialized();

  expect(actual).toBeFalsy();
} );

it("load ok", () => {
  MainInit.singleton.precalc();
  MainInit.singleton.saveTo(TMP);
  MainInit.singleton.clearData();
  ChromaticChordInit.singleton.clearData();
  ChromaticChordInit.singleton.loadFrom(TMP);
  const actual = ChromaticChordInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );

it("precalc ok", () => {
  ChromaticChordInit.singleton.precalc();
  const actual = ChromaticChordInit.singleton.initialized();

  expect(actual).toBeTruthy();
} );
