/* eslint-disable camelcase */
import { bIII as F_bIII, bIIIMaj7 as F_bIIIMaj7, bVI as F_bVI, bVII as F_bVII, bVII7 as F_bVII7,
  bVIISUS4 as F_bVII7SUS4, bVIMaj7 as F_bVIMaj7, bVIMaj7b5 as F_bVIMaj7b5, I as F_I,
  II0 as F_II0, IIIm as F_IIIm, IIIm7 as F_IIIm7, IIm as F_IIm, IIm7 as F_IIm7, IIm7b5 as F_IIm7b5,
  Im as F_Im, Im7 as F_Im7, IMaj7 as F_IMaj7, ISUS4 as F_ISUS4, IV as F_IV, IVm as F_IVm,
  IVm7 as F_IVm7, IVMaj7 as F_IVMaj7, V as F_V, V7 as F_V7,
  V7SUS4 as F_V7SUS4, V7SUS4b9 as F_V7SUS4b9, VII0 as F_VII0, VIIm7b5 as F_VIIm7b5, VIm as F_VIm, VIm7 as F_VIm7, Vm as F_Vm, Vm7 as F_Vm7, VSUS4 as F_VSUS4 } from "functions/alt";
import { TestInit } from "tests";
import { MAJOR, MINOR } from "../constants";
import getDegreeFunctions from "./degreeFunctions";

TestInit.diatonicAltScale();
TestInit.diatonicAltVoicing();
TestInit.diatonicAltFunction();

it("Scale - degreeFunctions: MAJOR", () => {
  const scale = MAJOR;
  const actual = getDegreeFunctions(scale);
  const someFunctions = [
    F_I,
    F_ISUS4,
    F_IIm,
    F_IIIm,
    F_IV,
    F_V,
    F_VSUS4,
    F_VIm,
    F_VII0,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("Scale - degreeFunctions: MAJOR seventh", () => {
  const scale = MAJOR;
  const actual = getDegreeFunctions(scale);
  const someFunctions = [
    F_IMaj7,
    F_IIm7,
    F_IIIm7,
    F_IVMaj7,
    F_V7,
    F_V7SUS4,
    F_VIm7,
    F_VIIm7b5,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("Scale - degreeFunctions: MINOR", () => {
  const scale = MINOR;
  const actual = getDegreeFunctions(scale);
  const someFunctions = [
    F_Im,
    F_II0,
    F_bIII,
    F_IVm,
    F_Vm,
    F_bVI,
    F_bVII,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("Scale - degreeFunctions: MINOR seventh", () => {
  const scale = MINOR;
  const actual = getDegreeFunctions(scale);
  const someFunctions = [
    F_Im7,
    F_IIm7b5,
    F_bIIIMaj7,
    F_IVm7,
    F_Vm7,
    F_V7SUS4b9,
    F_bVIMaj7,
    F_bVIMaj7b5,
    F_bVII7,
    F_bVII7SUS4,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );
