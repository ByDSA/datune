/* eslint-disable camelcase */
import type { DegreeFunc } from "./DegreeFunc";
import { Degrees as D } from "degrees/alt";
import * as Voicings from "voicings/relative/alt/constants";
import { fromDegreeVoicing } from "./building";

export function initialize() {
  if (I5)
    throw new Error("Already initialized");

  if (!Voicings.TRIAD_MAJOR)
    Voicings.initialize();

  // eslint-disable-next-line max-len, @typescript-eslint/naming-convention
  const { POWER_CHORD, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_b5, SEVENTH_SUS4, SEVENTH_SUS4_b9, SIXTH, SIXTH_MINOR, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_SUS4 } = Voicings;

  I5 = fromDegreeVoicing(D.I, POWER_CHORD);
  bII5 = fromDegreeVoicing(D.bII, POWER_CHORD);
  II5 = fromDegreeVoicing(D.II, POWER_CHORD);
  bIII5 = fromDegreeVoicing(D.bIII, POWER_CHORD);
  III5 = fromDegreeVoicing(D.III, POWER_CHORD);
  IV5 = fromDegreeVoicing(D.IV, POWER_CHORD);
  bV5 = fromDegreeVoicing(D.bV, POWER_CHORD);
  V5 = fromDegreeVoicing(D.V, POWER_CHORD);
  bVI5 = fromDegreeVoicing(D.bVI, POWER_CHORD);
  VI5 = fromDegreeVoicing(D.VI, POWER_CHORD);
  bVII5 = fromDegreeVoicing(D.bVII, POWER_CHORD);
  VII5 = fromDegreeVoicing(D.VII, POWER_CHORD);

  I = fromDegreeVoicing(D.I, TRIAD_MAJOR);
  bII = fromDegreeVoicing(D.bII, TRIAD_MAJOR);
  II = fromDegreeVoicing(D.II, TRIAD_MAJOR);
  bIII = fromDegreeVoicing(D.bIII, TRIAD_MAJOR);
  III = fromDegreeVoicing(D.III, TRIAD_MAJOR);
  IV = fromDegreeVoicing(D.IV, TRIAD_MAJOR);
  bV = fromDegreeVoicing(D.bV, TRIAD_MAJOR);
  V = fromDegreeVoicing(D.V, TRIAD_MAJOR);
  bVI = fromDegreeVoicing(D.bVI, TRIAD_MAJOR);
  VI = fromDegreeVoicing(D.VI, TRIAD_MAJOR);
  bVII = fromDegreeVoicing(D.bVII, TRIAD_MAJOR);
  VII = fromDegreeVoicing(D.VII, TRIAD_MAJOR);

  ISUS4 = fromDegreeVoicing(D.I, TRIAD_SUS4);
  bIISUS4 = fromDegreeVoicing(D.bII, TRIAD_SUS4);
  IISUS4 = fromDegreeVoicing(D.II, TRIAD_SUS4);
  bIIISUS4 = fromDegreeVoicing(D.bIII, TRIAD_SUS4);
  IIISUS4 = fromDegreeVoicing(D.III, TRIAD_SUS4);
  IVSUS4 = fromDegreeVoicing(D.IV, TRIAD_SUS4);
  bVSUS4 = fromDegreeVoicing(D.bV, TRIAD_SUS4);
  VSUS4 = fromDegreeVoicing(D.V, TRIAD_SUS4);
  bVISUS4 = fromDegreeVoicing(D.bVI, TRIAD_SUS4);
  VISUS4 = fromDegreeVoicing(D.VI, TRIAD_SUS4);
  bVIISUS4 = fromDegreeVoicing(D.bVII, TRIAD_SUS4);
  VIISUS4 = fromDegreeVoicing(D.VII, TRIAD_SUS4);

  Im = fromDegreeVoicing(D.I, TRIAD_MINOR);
  bIIm = fromDegreeVoicing(D.bII, TRIAD_MINOR);
  IIm = fromDegreeVoicing(D.II, TRIAD_MINOR);
  bIIIm = fromDegreeVoicing(D.bIII, TRIAD_MINOR);
  IIIm = fromDegreeVoicing(D.III, TRIAD_MINOR);
  IVm = fromDegreeVoicing(D.IV, TRIAD_MINOR);
  bVm = fromDegreeVoicing(D.bV, TRIAD_MINOR);
  Vm = fromDegreeVoicing(D.V, TRIAD_MINOR);
  bVIm = fromDegreeVoicing(D.bVI, TRIAD_MINOR);
  VIm = fromDegreeVoicing(D.VI, TRIAD_MINOR);
  bVIIm = fromDegreeVoicing(D.bVII, TRIAD_MINOR);
  VIIm = fromDegreeVoicing(D.VII, TRIAD_MINOR);

  I0 = fromDegreeVoicing(D.I, TRIAD_DIMINISHED);
  bII0 = fromDegreeVoicing(D.bII, TRIAD_DIMINISHED);
  II0 = fromDegreeVoicing(D.II, TRIAD_DIMINISHED);
  bIII0 = fromDegreeVoicing(D.bIII, TRIAD_DIMINISHED);
  III0 = fromDegreeVoicing(D.III, TRIAD_DIMINISHED);
  IV0 = fromDegreeVoicing(D.IV, TRIAD_DIMINISHED);
  bV0 = fromDegreeVoicing(D.bV, TRIAD_DIMINISHED);
  V0 = fromDegreeVoicing(D.V, TRIAD_DIMINISHED);
  bVI0 = fromDegreeVoicing(D.bVI, TRIAD_DIMINISHED);
  VI0 = fromDegreeVoicing(D.VI, TRIAD_DIMINISHED);
  bVII0 = fromDegreeVoicing(D.bVII, TRIAD_DIMINISHED);
  VII0 = fromDegreeVoicing(D.VII, TRIAD_DIMINISHED);

  Iaug = fromDegreeVoicing(D.I, TRIAD_AUGMENTED);
  bIIaug = fromDegreeVoicing(D.bII, TRIAD_AUGMENTED);
  IIaug = fromDegreeVoicing(D.II, TRIAD_AUGMENTED);
  bIIIaug = fromDegreeVoicing(D.bIII, TRIAD_AUGMENTED);
  IIIaug = fromDegreeVoicing(D.III, TRIAD_AUGMENTED);
  IVaug = fromDegreeVoicing(D.IV, TRIAD_AUGMENTED);
  bVaug = fromDegreeVoicing(D.bV, TRIAD_AUGMENTED);
  Vaug = fromDegreeVoicing(D.V, TRIAD_AUGMENTED);
  bVIaug = fromDegreeVoicing(D.bVI, TRIAD_AUGMENTED);
  VIaug = fromDegreeVoicing(D.VI, TRIAD_AUGMENTED);
  bVIIaug = fromDegreeVoicing(D.bVII, TRIAD_AUGMENTED);
  VIIaug = fromDegreeVoicing(D.VII, TRIAD_AUGMENTED);

  /* Seventh */
  I7 = fromDegreeVoicing(D.I, SEVENTH);
  bII7 = fromDegreeVoicing(D.bII, SEVENTH);
  SUBV7 = bII7;
  II7 = fromDegreeVoicing(D.II, SEVENTH);
  bIII7 = fromDegreeVoicing(D.bIII, SEVENTH);
  III7 = fromDegreeVoicing(D.III, SEVENTH);
  IV7 = fromDegreeVoicing(D.IV, SEVENTH);
  bV7 = fromDegreeVoicing(D.bV, SEVENTH);
  V7 = fromDegreeVoicing(D.V, SEVENTH);
  bVI7 = fromDegreeVoicing(D.bVI, SEVENTH);
  VI7 = fromDegreeVoicing(D.VI, SEVENTH);
  bVII7 = fromDegreeVoicing(D.bVII, SEVENTH);
  VII7 = fromDegreeVoicing(D.VII, SEVENTH);

  I7SUS4 = fromDegreeVoicing(D.I, SEVENTH_SUS4);
  bII7SUS4 = fromDegreeVoicing(D.bII, SEVENTH_SUS4);
  II7SUS4 = fromDegreeVoicing(D.II, SEVENTH_SUS4);
  bIII7SUS4 = fromDegreeVoicing(D.bIII, SEVENTH_SUS4);
  III7SUS4 = fromDegreeVoicing(D.III, SEVENTH_SUS4);
  IV7SUS4 = fromDegreeVoicing(D.IV, SEVENTH_SUS4);
  bV7SUS4 = fromDegreeVoicing(D.bV, SEVENTH_SUS4);
  V7SUS4 = fromDegreeVoicing(D.V, SEVENTH_SUS4);
  bVI7SUS4 = fromDegreeVoicing(D.bVI, SEVENTH_SUS4);
  VI7SUS4 = fromDegreeVoicing(D.VI, SEVENTH_SUS4);
  bVII7SUS4 = fromDegreeVoicing(D.bVII, SEVENTH_SUS4);
  VII7SUS4 = fromDegreeVoicing(D.VII, SEVENTH_SUS4);

  I7SUS4b9 = fromDegreeVoicing(D.I, SEVENTH_SUS4_b9);
  bII7SUS4b9 = fromDegreeVoicing(D.bII, SEVENTH_SUS4_b9);
  II7SUS4b9 = fromDegreeVoicing(D.II, SEVENTH_SUS4_b9);
  bIII7SUS4b9 = fromDegreeVoicing(D.bIII, SEVENTH_SUS4_b9);
  III7SUS4b9 = fromDegreeVoicing(D.III, SEVENTH_SUS4_b9);
  IV7SUS4b9 = fromDegreeVoicing(D.IV, SEVENTH_SUS4_b9);
  bV7SUS4b9 = fromDegreeVoicing(D.bV, SEVENTH_SUS4_b9);
  V7SUS4b9 = fromDegreeVoicing(D.V, SEVENTH_SUS4_b9);
  bVI7SUS4b9 = fromDegreeVoicing(D.bVI, SEVENTH_SUS4_b9);
  VI7SUS4b9 = fromDegreeVoicing(D.VI, SEVENTH_SUS4_b9);
  bVII7SUS4b9 = fromDegreeVoicing(D.bVII, SEVENTH_SUS4_b9);
  VII7SUS4b9 = fromDegreeVoicing(D.VII, SEVENTH_SUS4_b9);

  I6 = fromDegreeVoicing(D.I, SIXTH);
  bII6 = fromDegreeVoicing(D.bII, SIXTH);
  II6 = fromDegreeVoicing(D.II, SIXTH);
  bIII6 = fromDegreeVoicing(D.bIII, SIXTH);
  III6 = fromDegreeVoicing(D.III, SIXTH);
  IV6 = fromDegreeVoicing(D.IV, SIXTH);
  bV6 = fromDegreeVoicing(D.bV, SIXTH);
  V6 = fromDegreeVoicing(D.V, SIXTH);
  bVI6 = fromDegreeVoicing(D.bVI, SIXTH);
  VI6 = fromDegreeVoicing(D.VI, SIXTH);
  bVII6 = fromDegreeVoicing(D.bVII, SIXTH);
  VII6 = fromDegreeVoicing(D.VII, SIXTH);

  Im6 = fromDegreeVoicing(D.I, SIXTH_MINOR);
  bIIm6 = fromDegreeVoicing(D.bII, SIXTH_MINOR);
  IIm6 = fromDegreeVoicing(D.II, SIXTH_MINOR);
  bIIIm6 = fromDegreeVoicing(D.bIII, SIXTH_MINOR);
  IIIm6 = fromDegreeVoicing(D.III, SIXTH_MINOR);
  IVm6 = fromDegreeVoicing(D.IV, SIXTH_MINOR);
  bVm6 = fromDegreeVoicing(D.bV, SIXTH_MINOR);
  Vm6 = fromDegreeVoicing(D.V, SIXTH_MINOR);
  bVIm6 = fromDegreeVoicing(D.bVI, SIXTH_MINOR);
  VIm6 = fromDegreeVoicing(D.VI, SIXTH_MINOR);
  bVIIm6 = fromDegreeVoicing(D.bVII, SIXTH_MINOR);
  VIIm6 = fromDegreeVoicing(D.VII, SIXTH_MINOR);

  IMaj7 = fromDegreeVoicing(D.I, SEVENTH_MAJ7);
  bIIMaj7 = fromDegreeVoicing(D.bII, SEVENTH_MAJ7);
  IIMaj7 = fromDegreeVoicing(D.II, SEVENTH_MAJ7);
  bIIIMaj7 = fromDegreeVoicing(D.bIII, SEVENTH_MAJ7);
  IIIMaj7 = fromDegreeVoicing(D.III, SEVENTH_MAJ7);
  IVMaj7 = fromDegreeVoicing(D.IV, SEVENTH_MAJ7);
  bVMaj7 = fromDegreeVoicing(D.bV, SEVENTH_MAJ7);
  VMaj7 = fromDegreeVoicing(D.V, SEVENTH_MAJ7);
  bVIMaj7 = fromDegreeVoicing(D.bVI, SEVENTH_MAJ7);
  VIMaj7 = fromDegreeVoicing(D.VI, SEVENTH_MAJ7);
  bVIIMaj7 = fromDegreeVoicing(D.bVII, SEVENTH_MAJ7);
  VIIMaj7 = fromDegreeVoicing(D.VII, SEVENTH_MAJ7);

  IMaj7b5 = fromDegreeVoicing(D.I, SEVENTH_MAJ7_b5);
  bIIMaj7b5 = fromDegreeVoicing(D.bII, SEVENTH_MAJ7_b5);
  IIMaj7b5 = fromDegreeVoicing(D.II, SEVENTH_MAJ7_b5);
  bIIIMaj7b5 = fromDegreeVoicing(D.bIII, SEVENTH_MAJ7_b5);
  IIIMaj7b5 = fromDegreeVoicing(D.III, SEVENTH_MAJ7_b5);
  IVMaj7b5 = fromDegreeVoicing(D.IV, SEVENTH_MAJ7_b5);
  bVMaj7b5 = fromDegreeVoicing(D.bV, SEVENTH_MAJ7_b5);
  VMaj7b5 = fromDegreeVoicing(D.V, SEVENTH_MAJ7_b5);
  bVIMaj7b5 = fromDegreeVoicing(D.bVI, SEVENTH_MAJ7_b5);
  VIMaj7b5 = fromDegreeVoicing(D.VI, SEVENTH_MAJ7_b5);
  bVIIMaj7b5 = fromDegreeVoicing(D.bVII, SEVENTH_MAJ7_b5);
  VIIMaj7b5 = fromDegreeVoicing(D.VII, SEVENTH_MAJ7_b5);

  Im7 = fromDegreeVoicing(D.I, SEVENTH_MINOR);
  bIIm7 = fromDegreeVoicing(D.bII, SEVENTH_MINOR);
  IIm7 = fromDegreeVoicing(D.II, SEVENTH_MINOR);
  bIIIm7 = fromDegreeVoicing(D.bIII, SEVENTH_MINOR);
  IIIm7 = fromDegreeVoicing(D.III, SEVENTH_MINOR);
  IVm7 = fromDegreeVoicing(D.IV, SEVENTH_MINOR);
  bVm7 = fromDegreeVoicing(D.bV, SEVENTH_MINOR);
  Vm7 = fromDegreeVoicing(D.V, SEVENTH_MINOR);
  bVIm7 = fromDegreeVoicing(D.bVI, SEVENTH_MINOR);
  VIm7 = fromDegreeVoicing(D.VI, SEVENTH_MINOR);
  bVIIm7 = fromDegreeVoicing(D.bVII, SEVENTH_MINOR);
  VIIm7 = fromDegreeVoicing(D.VII, SEVENTH_MINOR);

  Im7b5 = fromDegreeVoicing(D.I, SEVENTH_MINOR_b5);
  bIIm7b5 = fromDegreeVoicing(D.bII, SEVENTH_MINOR_b5);
  IIm7b5 = fromDegreeVoicing(D.II, SEVENTH_MINOR_b5);
  bIIIm7b5 = fromDegreeVoicing(D.bIII, SEVENTH_MINOR_b5);
  IIIm7b5 = fromDegreeVoicing(D.III, SEVENTH_MINOR_b5);
  IVm7b5 = fromDegreeVoicing(D.IV, SEVENTH_MINOR_b5);
  bVm7b5 = fromDegreeVoicing(D.bV, SEVENTH_MINOR_b5);
  Vm7b5 = fromDegreeVoicing(D.V, SEVENTH_MINOR_b5);
  bVIm7b5 = fromDegreeVoicing(D.bVI, SEVENTH_MINOR_b5);
  VIm7b5 = fromDegreeVoicing(D.VI, SEVENTH_MINOR_b5);
  bVIIm7b5 = fromDegreeVoicing(D.bVII, SEVENTH_MINOR_b5);
  VIIm7b5 = fromDegreeVoicing(D.VII, SEVENTH_MINOR_b5);
}

export let I5: DegreeFunc;

export let bII5: DegreeFunc;

export let II5: DegreeFunc;

export let bIII5: DegreeFunc;

export let III5: DegreeFunc;

export let IV5: DegreeFunc;

export let bV5: DegreeFunc;

export let V5: DegreeFunc;

export let bVI5: DegreeFunc;

export let VI5: DegreeFunc;

export let bVII5: DegreeFunc;

export let VII5: DegreeFunc;

export let I: DegreeFunc;

export let bII: DegreeFunc;

export let II: DegreeFunc;

export let bIII: DegreeFunc;

export let III: DegreeFunc;

export let IV: DegreeFunc;

export let bV: DegreeFunc;

export let V: DegreeFunc;

export let bVI: DegreeFunc;

export let VI: DegreeFunc;

export let bVII: DegreeFunc;

export let VII: DegreeFunc;

export let ISUS4: DegreeFunc;

export let bIISUS4: DegreeFunc;

export let IISUS4: DegreeFunc;

export let bIIISUS4: DegreeFunc;

export let IIISUS4: DegreeFunc;

export let IVSUS4: DegreeFunc;

export let bVSUS4: DegreeFunc;

export let VSUS4: DegreeFunc;

export let bVISUS4: DegreeFunc;

export let VISUS4: DegreeFunc;

export let bVIISUS4: DegreeFunc;

export let VIISUS4: DegreeFunc;

export let Im: DegreeFunc;

export let bIIm: DegreeFunc;

export let IIm: DegreeFunc;

export let bIIIm: DegreeFunc;

export let IIIm: DegreeFunc;

export let IVm: DegreeFunc;

export let bVm: DegreeFunc;

export let Vm: DegreeFunc;

export let bVIm: DegreeFunc;

export let VIm: DegreeFunc;

export let bVIIm: DegreeFunc;

export let VIIm: DegreeFunc;

export let I0: DegreeFunc;

export let bII0: DegreeFunc;

export let II0: DegreeFunc;

export let bIII0: DegreeFunc;

export let III0: DegreeFunc;

export let IV0: DegreeFunc;

export let bV0: DegreeFunc;

export let V0: DegreeFunc;

export let bVI0: DegreeFunc;

export let VI0: DegreeFunc;

export let bVII0: DegreeFunc;

export let VII0: DegreeFunc;

export let Iaug: DegreeFunc;

export let bIIaug: DegreeFunc;

export let IIaug: DegreeFunc;

export let bIIIaug: DegreeFunc;

export let IIIaug: DegreeFunc;

export let IVaug: DegreeFunc;

export let bVaug: DegreeFunc;

export let Vaug: DegreeFunc;

export let bVIaug: DegreeFunc;

export let VIaug: DegreeFunc;

export let bVIIaug: DegreeFunc;

export let VIIaug: DegreeFunc;

export let I7: DegreeFunc;

export let bII7: DegreeFunc;

export let II7: DegreeFunc;

export let bIII7: DegreeFunc;

export let III7: DegreeFunc;

export let IV7: DegreeFunc;

export let bV7: DegreeFunc;

export let V7: DegreeFunc;

export let bVI7: DegreeFunc;

export let VI7: DegreeFunc;

export let bVII7: DegreeFunc;

export let VII7: DegreeFunc;

export let I7SUS4: DegreeFunc;

export let bII7SUS4: DegreeFunc;

export let II7SUS4: DegreeFunc;

export let bIII7SUS4: DegreeFunc;

export let III7SUS4: DegreeFunc;

export let IV7SUS4: DegreeFunc;

export let bV7SUS4: DegreeFunc;

export let V7SUS4: DegreeFunc;

export let bVI7SUS4: DegreeFunc;

export let VI7SUS4: DegreeFunc;

export let bVII7SUS4: DegreeFunc;

export let VII7SUS4: DegreeFunc;

export let I7SUS4b9: DegreeFunc;

export let bII7SUS4b9: DegreeFunc;

export let II7SUS4b9: DegreeFunc;

export let bIII7SUS4b9: DegreeFunc;

export let III7SUS4b9: DegreeFunc;

export let IV7SUS4b9: DegreeFunc;

export let bV7SUS4b9: DegreeFunc;

export let V7SUS4b9: DegreeFunc;

export let bVI7SUS4b9: DegreeFunc;

export let VI7SUS4b9: DegreeFunc;

export let bVII7SUS4b9: DegreeFunc;

export let VII7SUS4b9: DegreeFunc;

export let I6: DegreeFunc;

export let bII6: DegreeFunc;

export let II6: DegreeFunc;

export let bIII6: DegreeFunc;

export let III6: DegreeFunc;

export let IV6: DegreeFunc;

export let bV6: DegreeFunc;

export let V6: DegreeFunc;

export let bVI6: DegreeFunc;

export let VI6: DegreeFunc;

export let bVII6: DegreeFunc;

export let VII6: DegreeFunc;

export let Im6: DegreeFunc;

export let bIIm6: DegreeFunc;

export let IIm6: DegreeFunc;

export let bIIIm6: DegreeFunc;

export let IIIm6: DegreeFunc;

export let IVm6: DegreeFunc;

export let bVm6: DegreeFunc;

export let Vm6: DegreeFunc;

export let bVIm6: DegreeFunc;

export let VIm6: DegreeFunc;

export let bVIIm6: DegreeFunc;

export let VIIm6: DegreeFunc;

export let IMaj7: DegreeFunc;

export let bIIMaj7: DegreeFunc;

export let IIMaj7: DegreeFunc;

export let bIIIMaj7: DegreeFunc;

export let IIIMaj7: DegreeFunc;

export let IVMaj7: DegreeFunc;

export let bVMaj7: DegreeFunc;

export let VMaj7: DegreeFunc;

export let bVIMaj7: DegreeFunc;

export let VIMaj7: DegreeFunc;

export let bVIIMaj7: DegreeFunc;

export let VIIMaj7: DegreeFunc;

export let IMaj7b5: DegreeFunc;

export let bIIMaj7b5: DegreeFunc;

export let IIMaj7b5: DegreeFunc;

export let bIIIMaj7b5: DegreeFunc;

export let IIIMaj7b5: DegreeFunc;

export let IVMaj7b5: DegreeFunc;

export let bVMaj7b5: DegreeFunc;

export let VMaj7b5: DegreeFunc;

export let bVIMaj7b5: DegreeFunc;

export let VIMaj7b5: DegreeFunc;

export let bVIIMaj7b5: DegreeFunc;

export let VIIMaj7b5: DegreeFunc;

export let Im7: DegreeFunc;

export let bIIm7: DegreeFunc;

export let IIm7: DegreeFunc;

export let bIIIm7: DegreeFunc;

export let IIIm7: DegreeFunc;

export let IVm7: DegreeFunc;

export let bVm7: DegreeFunc;

export let Vm7: DegreeFunc;

export let bVIm7: DegreeFunc;

export let VIm7: DegreeFunc;

export let bVIIm7: DegreeFunc;

export let VIIm7: DegreeFunc;

export let Im7b5: DegreeFunc;

export let bIIm7b5: DegreeFunc;

export let IIm7b5: DegreeFunc;

export let bIIIm7b5: DegreeFunc;

export let IIIm7b5: DegreeFunc;

export let IVm7b5: DegreeFunc;

export let bVm7b5: DegreeFunc;

export let Vm7b5: DegreeFunc;

export let bVIm7b5: DegreeFunc;

export let VIm7b5: DegreeFunc;

export let bVIIm7b5: DegreeFunc;

export let VIIm7b5: DegreeFunc;

export let SUBV7: DegreeFunc;
