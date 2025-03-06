import { Funcs as F } from "functions/alt";
import { Scales as S } from "..";
import { getDegreeFuncs } from "./degreeFuncs";

const { MAJOR, MINOR } = S;

it("scale - degreeFunctions: MAJOR", () => {
  const scale = MAJOR;
  const actual = getDegreeFuncs(scale);
  const someFunctions = [
    F.I,
    F.ISUS4,
    F.IIm,
    F.IIIm,
    F.IV,
    F.V,
    F.VSUS4,
    F.VIm,
    F.VII0,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("scale - degreeFunctions: MAJOR seventh", () => {
  const scale = MAJOR;
  const actual = getDegreeFuncs(scale);
  const someFunctions = [
    F.IMaj7,
    F.IIm7,
    F.IIIm7,
    F.IVMaj7,
    F.V7,
    F.V7SUS4,
    F.VIm7,
    F.VIIm7b5,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("scale - degreeFunctions: MINOR", () => {
  const scale = MINOR;
  const actual = getDegreeFuncs(scale);
  const someFunctions = [
    F.Im,
    F.II0,
    F.bIII,
    F.IVm,
    F.Vm,
    F.bVI,
    F.bVII,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );

it("scale - degreeFunctions: MINOR seventh", () => {
  const scale = MINOR;
  const actual = getDegreeFuncs(scale);
  const someFunctions = [
    F.Im7,
    F.IIm7b5,
    F.bIIIMaj7,
    F.IVm7,
    F.Vm7,
    F.V7SUS4b9,
    F.bVIMaj7,
    F.bVIMaj7b5,
    F.bVII7,
    F.bVII7SUS4,
  ];

  expect(actual).toEqual(expect.arrayContaining(someFunctions));
} );
