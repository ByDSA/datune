/* eslint-disable camelcase */
import type { DegreeFunc } from "./DegreeFunc";
import { Degrees as D } from "degrees/chromatic";
import { Voicings } from "voicings/chromatic";
import { from } from "./building/from";

export function initialize() {
  if (I5)
    throw new Error("Already initialized");

  // eslint-disable-next-line max-len, @typescript-eslint/naming-convention
  const { POWER_CHORD, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_b5, SEVENTH_SUS4, SEVENTH_SUS4_b9, SIXTH, SIXTH_MINOR, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_SUS4 } = Voicings;

  I5 = from( {
    degree: D.I,
    voicing: POWER_CHORD,
  } );
  bII5 = from( {
    degree: D.bII,
    voicing: POWER_CHORD,
  } );
  II5 = from( {
    degree: D.II,
    voicing: POWER_CHORD,
  } );
  bIII5 = from( {
    degree: D.bIII,
    voicing: POWER_CHORD,
  } );
  III5 = from( {
    degree: D.III,
    voicing: POWER_CHORD,
  } );
  IV5 = from( {
    degree: D.IV,
    voicing: POWER_CHORD,
  } );
  bV5 = from( {
    degree: D.bV,
    voicing: POWER_CHORD,
  } );
  V5 = from( {
    degree: D.V,
    voicing: POWER_CHORD,
  } );
  bVI5 = from( {
    degree: D.bVI,
    voicing: POWER_CHORD,
  } );
  VI5 = from( {
    degree: D.VI,
    voicing: POWER_CHORD,
  } );
  bVII5 = from( {
    degree: D.bVII,
    voicing: POWER_CHORD,
  } );
  VII5 = from( {
    degree: D.VII,
    voicing: POWER_CHORD,
  } );

  I = from( {
    degree: D.I,
    voicing: TRIAD_MAJOR,
  } );
  bII = from( {
    degree: D.bII,
    voicing: TRIAD_MAJOR,
  } );
  II = from( {
    degree: D.II,
    voicing: TRIAD_MAJOR,
  } );
  bIII = from( {
    degree: D.bIII,
    voicing: TRIAD_MAJOR,
  } );
  III = from( {
    degree: D.III,
    voicing: TRIAD_MAJOR,
  } );
  IV = from( {
    degree: D.IV,
    voicing: TRIAD_MAJOR,
  } );
  bV = from( {
    degree: D.bV,
    voicing: TRIAD_MAJOR,
  } );
  V = from( {
    degree: D.V,
    voicing: TRIAD_MAJOR,
  } );
  bVI = from( {
    degree: D.bVI,
    voicing: TRIAD_MAJOR,
  } );
  VI = from( {
    degree: D.VI,
    voicing: TRIAD_MAJOR,
  } );
  bVII = from( {
    degree: D.bVII,
    voicing: TRIAD_MAJOR,
  } );
  VII = from( {
    degree: D.VII,
    voicing: TRIAD_MAJOR,
  } );

  ISUS4 = from( {
    degree: D.I,
    voicing: TRIAD_SUS4,
  } );
  bIISUS4 = from( {
    degree: D.bII,
    voicing: TRIAD_SUS4,
  } );
  IISUS4 = from( {
    degree: D.II,
    voicing: TRIAD_SUS4,
  } );
  bIIISUS4 = from( {
    degree: D.bIII,
    voicing: TRIAD_SUS4,
  } );
  IIISUS4 = from( {
    degree: D.III,
    voicing: TRIAD_SUS4,
  } );
  IVSUS4 = from( {
    degree: D.IV,
    voicing: TRIAD_SUS4,
  } );
  bVSUS4 = from( {
    degree: D.bV,
    voicing: TRIAD_SUS4,
  } );
  VSUS4 = from( {
    degree: D.V,
    voicing: TRIAD_SUS4,
  } );
  bVISUS4 = from( {
    degree: D.bVI,
    voicing: TRIAD_SUS4,
  } );
  VISUS4 = from( {
    degree: D.VI,
    voicing: TRIAD_SUS4,
  } );
  bVIISUS4 = from( {
    degree: D.bVII,
    voicing: TRIAD_SUS4,
  } );
  VIISUS4 = from( {
    degree: D.VII,
    voicing: TRIAD_SUS4,
  } );

  Im = from( {
    degree: D.I,
    voicing: TRIAD_MINOR,
  } );
  bIIm = from( {
    degree: D.bII,
    voicing: TRIAD_MINOR,
  } );
  IIm = from( {
    degree: D.II,
    voicing: TRIAD_MINOR,
  } );
  bIIIm = from( {
    degree: D.bIII,
    voicing: TRIAD_MINOR,
  } );
  IIIm = from( {
    degree: D.III,
    voicing: TRIAD_MINOR,
  } );
  IVm = from( {
    degree: D.IV,
    voicing: TRIAD_MINOR,
  } );
  bVm = from( {
    degree: D.bV,
    voicing: TRIAD_MINOR,
  } );
  Vm = from( {
    degree: D.V,
    voicing: TRIAD_MINOR,
  } );
  bVIm = from( {
    degree: D.bVI,
    voicing: TRIAD_MINOR,
  } );
  VIm = from( {
    degree: D.VI,
    voicing: TRIAD_MINOR,
  } );
  bVIIm = from( {
    degree: D.bVII,
    voicing: TRIAD_MINOR,
  } );
  VIIm = from( {
    degree: D.VII,
    voicing: TRIAD_MINOR,
  } );

  I0 = from( {
    degree: D.I,
    voicing: TRIAD_DIMINISHED,
  } );
  bII0 = from( {
    degree: D.bII,
    voicing: TRIAD_DIMINISHED,
  } );
  II0 = from( {
    degree: D.II,
    voicing: TRIAD_DIMINISHED,
  } );
  bIII0 = from( {
    degree: D.bIII,
    voicing: TRIAD_DIMINISHED,
  } );
  III0 = from( {
    degree: D.III,
    voicing: TRIAD_DIMINISHED,
  } );
  IV0 = from( {
    degree: D.IV,
    voicing: TRIAD_DIMINISHED,
  } );
  bV0 = from( {
    degree: D.bV,
    voicing: TRIAD_DIMINISHED,
  } );
  V0 = from( {
    degree: D.V,
    voicing: TRIAD_DIMINISHED,
  } );
  bVI0 = from( {
    degree: D.bVI,
    voicing: TRIAD_DIMINISHED,
  } );
  VI0 = from( {
    degree: D.VI,
    voicing: TRIAD_DIMINISHED,
  } );
  bVII0 = from( {
    degree: D.bVII,
    voicing: TRIAD_DIMINISHED,
  } );
  VII0 = from( {
    degree: D.VII,
    voicing: TRIAD_DIMINISHED,
  } );

  Iaug = from( {
    degree: D.I,
    voicing: TRIAD_AUGMENTED,
  } );
  bIIaug = from( {
    degree: D.bII,
    voicing: TRIAD_AUGMENTED,
  } );
  IIaug = from( {
    degree: D.II,
    voicing: TRIAD_AUGMENTED,
  } );
  bIIIaug = from( {
    degree: D.bIII,
    voicing: TRIAD_AUGMENTED,
  } );
  IIIaug = from( {
    degree: D.III,
    voicing: TRIAD_AUGMENTED,
  } );
  IVaug = from( {
    degree: D.IV,
    voicing: TRIAD_AUGMENTED,
  } );
  bVaug = from( {
    degree: D.bV,
    voicing: TRIAD_AUGMENTED,
  } );
  Vaug = from( {
    degree: D.V,
    voicing: TRIAD_AUGMENTED,
  } );
  bVIaug = from( {
    degree: D.bVI,
    voicing: TRIAD_AUGMENTED,
  } );
  VIaug = from( {
    degree: D.VI,
    voicing: TRIAD_AUGMENTED,
  } );
  bVIIaug = from( {
    degree: D.bVII,
    voicing: TRIAD_AUGMENTED,
  } );
  VIIaug = from( {
    degree: D.VII,
    voicing: TRIAD_AUGMENTED,
  } );

  /* Seventh */
  I7 = from( {
    degree: D.I,
    voicing: SEVENTH,
  } );
  bII7 = from( {
    degree: D.bII,
    voicing: SEVENTH,
  } );
  SUBV7 = bII7;
  II7 = from( {
    degree: D.II,
    voicing: SEVENTH,
  } );
  bIII7 = from( {
    degree: D.bIII,
    voicing: SEVENTH,
  } );
  III7 = from( {
    degree: D.III,
    voicing: SEVENTH,
  } );
  IV7 = from( {
    degree: D.IV,
    voicing: SEVENTH,
  } );
  bV7 = from( {
    degree: D.bV,
    voicing: SEVENTH,
  } );
  V7 = from( {
    degree: D.V,
    voicing: SEVENTH,
  } );
  bVI7 = from( {
    degree: D.bVI,
    voicing: SEVENTH,
  } );
  VI7 = from( {
    degree: D.VI,
    voicing: SEVENTH,
  } );
  bVII7 = from( {
    degree: D.bVII,
    voicing: SEVENTH,
  } );
  VII7 = from( {
    degree: D.VII,
    voicing: SEVENTH,
  } );

  I7SUS4 = from( {
    degree: D.I,
    voicing: SEVENTH_SUS4,
  } );
  bII7SUS4 = from( {
    degree: D.bII,
    voicing: SEVENTH_SUS4,
  } );
  II7SUS4 = from( {
    degree: D.II,
    voicing: SEVENTH_SUS4,
  } );
  bIII7SUS4 = from( {
    degree: D.bIII,
    voicing: SEVENTH_SUS4,
  } );
  III7SUS4 = from( {
    degree: D.III,
    voicing: SEVENTH_SUS4,
  } );
  IV7SUS4 = from( {
    degree: D.IV,
    voicing: SEVENTH_SUS4,
  } );
  bV7SUS4 = from( {
    degree: D.bV,
    voicing: SEVENTH_SUS4,
  } );
  V7SUS4 = from( {
    degree: D.V,
    voicing: SEVENTH_SUS4,
  } );
  bVI7SUS4 = from( {
    degree: D.bVI,
    voicing: SEVENTH_SUS4,
  } );
  VI7SUS4 = from( {
    degree: D.VI,
    voicing: SEVENTH_SUS4,
  } );
  bVII7SUS4 = from( {
    degree: D.bVII,
    voicing: SEVENTH_SUS4,
  } );
  VII7SUS4 = from( {
    degree: D.VII,
    voicing: SEVENTH_SUS4,
  } );

  I7SUS4b9 = from( {
    degree: D.I,
    voicing: SEVENTH_SUS4_b9,
  } );
  bII7SUS4b9 = from( {
    degree: D.bII,
    voicing: SEVENTH_SUS4_b9,
  } );
  II7SUS4b9 = from( {
    degree: D.II,
    voicing: SEVENTH_SUS4_b9,
  } );
  bIII7SUS4b9 = from( {
    degree: D.bIII,
    voicing: SEVENTH_SUS4_b9,
  } );
  III7SUS4b9 = from( {
    degree: D.III,
    voicing: SEVENTH_SUS4_b9,
  } );
  IV7SUS4b9 = from( {
    degree: D.IV,
    voicing: SEVENTH_SUS4_b9,
  } );
  bV7SUS4b9 = from( {
    degree: D.bV,
    voicing: SEVENTH_SUS4_b9,
  } );
  V7SUS4b9 = from( {
    degree: D.V,
    voicing: SEVENTH_SUS4_b9,
  } );
  bVI7SUS4b9 = from( {
    degree: D.bVI,
    voicing: SEVENTH_SUS4_b9,
  } );
  VI7SUS4b9 = from( {
    degree: D.VI,
    voicing: SEVENTH_SUS4_b9,
  } );
  bVII7SUS4b9 = from( {
    degree: D.bVII,
    voicing: SEVENTH_SUS4_b9,
  } );
  VII7SUS4b9 = from( {
    degree: D.VII,
    voicing: SEVENTH_SUS4_b9,
  } );

  I6 = from( {
    degree: D.I,
    voicing: SIXTH,
  } );
  bII6 = from( {
    degree: D.bII,
    voicing: SIXTH,
  } );
  II6 = from( {
    degree: D.II,
    voicing: SIXTH,
  } );
  bIII6 = from( {
    degree: D.bIII,
    voicing: SIXTH,
  } );
  III6 = from( {
    degree: D.III,
    voicing: SIXTH,
  } );
  IV6 = from( {
    degree: D.IV,
    voicing: SIXTH,
  } );
  bV6 = from( {
    degree: D.bV,
    voicing: SIXTH,
  } );
  V6 = from( {
    degree: D.V,
    voicing: SIXTH,
  } );
  bVI6 = from( {
    degree: D.bVI,
    voicing: SIXTH,
  } );
  VI6 = from( {
    degree: D.VI,
    voicing: SIXTH,
  } );
  bVII6 = from( {
    degree: D.bVII,
    voicing: SIXTH,
  } );
  VII6 = from( {
    degree: D.VII,
    voicing: SIXTH,
  } );

  Im6 = from( {
    degree: D.I,
    voicing: SIXTH_MINOR,
  } );
  bIIm6 = from( {
    degree: D.bII,
    voicing: SIXTH_MINOR,
  } );
  IIm6 = from( {
    degree: D.II,
    voicing: SIXTH_MINOR,
  } );
  bIIIm6 = from( {
    degree: D.bIII,
    voicing: SIXTH_MINOR,
  } );
  IIIm6 = from( {
    degree: D.III,
    voicing: SIXTH_MINOR,
  } );
  IVm6 = from( {
    degree: D.IV,
    voicing: SIXTH_MINOR,
  } );
  bVm6 = from( {
    degree: D.bV,
    voicing: SIXTH_MINOR,
  } );
  Vm6 = from( {
    degree: D.V,
    voicing: SIXTH_MINOR,
  } );
  bVIm6 = from( {
    degree: D.bVI,
    voicing: SIXTH_MINOR,
  } );
  VIm6 = from( {
    degree: D.VI,
    voicing: SIXTH_MINOR,
  } );
  bVIIm6 = from( {
    degree: D.bVII,
    voicing: SIXTH_MINOR,
  } );
  VIIm6 = from( {
    degree: D.VII,
    voicing: SIXTH_MINOR,
  } );

  IMaj7 = from( {
    degree: D.I,
    voicing: SEVENTH_MAJ7,
  } );
  bIIMaj7 = from( {
    degree: D.bII,
    voicing: SEVENTH_MAJ7,
  } );
  IIMaj7 = from( {
    degree: D.II,
    voicing: SEVENTH_MAJ7,
  } );
  bIIIMaj7 = from( {
    degree: D.bIII,
    voicing: SEVENTH_MAJ7,
  } );
  IIIMaj7 = from( {
    degree: D.III,
    voicing: SEVENTH_MAJ7,
  } );
  IVMaj7 = from( {
    degree: D.IV,
    voicing: SEVENTH_MAJ7,
  } );
  bVMaj7 = from( {
    degree: D.bV,
    voicing: SEVENTH_MAJ7,
  } );
  VMaj7 = from( {
    degree: D.V,
    voicing: SEVENTH_MAJ7,
  } );
  bVIMaj7 = from( {
    degree: D.bVI,
    voicing: SEVENTH_MAJ7,
  } );
  VIMaj7 = from( {
    degree: D.VI,
    voicing: SEVENTH_MAJ7,
  } );
  bVIIMaj7 = from( {
    degree: D.bVII,
    voicing: SEVENTH_MAJ7,
  } );
  VIIMaj7 = from( {
    degree: D.VII,
    voicing: SEVENTH_MAJ7,
  } );

  IMaj7b5 = from( {
    degree: D.I,
    voicing: SEVENTH_MAJ7_b5,
  } );
  bIIMaj7b5 = from( {
    degree: D.bII,
    voicing: SEVENTH_MAJ7_b5,
  } );
  IIMaj7b5 = from( {
    degree: D.II,
    voicing: SEVENTH_MAJ7_b5,
  } );
  bIIIMaj7b5 = from( {
    degree: D.bIII,
    voicing: SEVENTH_MAJ7_b5,
  } );
  IIIMaj7b5 = from( {
    degree: D.III,
    voicing: SEVENTH_MAJ7_b5,
  } );
  IVMaj7b5 = from( {
    degree: D.IV,
    voicing: SEVENTH_MAJ7_b5,
  } );
  bVMaj7b5 = from( {
    degree: D.bV,
    voicing: SEVENTH_MAJ7_b5,
  } );
  VMaj7b5 = from( {
    degree: D.V,
    voicing: SEVENTH_MAJ7_b5,
  } );
  bVIMaj7b5 = from( {
    degree: D.bVI,
    voicing: SEVENTH_MAJ7_b5,
  } );
  VIMaj7b5 = from( {
    degree: D.VI,
    voicing: SEVENTH_MAJ7_b5,
  } );
  bVIIMaj7b5 = from( {
    degree: D.bVII,
    voicing: SEVENTH_MAJ7_b5,
  } );
  VIIMaj7b5 = from( {
    degree: D.VII,
    voicing: SEVENTH_MAJ7_b5,
  } );

  Im7 = from( {
    degree: D.I,
    voicing: SEVENTH_MINOR,
  } );
  bIIm7 = from( {
    degree: D.bII,
    voicing: SEVENTH_MINOR,
  } );
  IIm7 = from( {
    degree: D.II,
    voicing: SEVENTH_MINOR,
  } );
  bIIIm7 = from( {
    degree: D.bIII,
    voicing: SEVENTH_MINOR,
  } );
  IIIm7 = from( {
    degree: D.III,
    voicing: SEVENTH_MINOR,
  } );
  IVm7 = from( {
    degree: D.IV,
    voicing: SEVENTH_MINOR,
  } );
  bVm7 = from( {
    degree: D.bV,
    voicing: SEVENTH_MINOR,
  } );
  Vm7 = from( {
    degree: D.V,
    voicing: SEVENTH_MINOR,
  } );
  bVIm7 = from( {
    degree: D.bVI,
    voicing: SEVENTH_MINOR,
  } );
  VIm7 = from( {
    degree: D.VI,
    voicing: SEVENTH_MINOR,
  } );
  bVIIm7 = from( {
    degree: D.bVII,
    voicing: SEVENTH_MINOR,
  } );
  VIIm7 = from( {
    degree: D.VII,
    voicing: SEVENTH_MINOR,
  } );

  Im7b5 = from( {
    degree: D.I,
    voicing: SEVENTH_MINOR_b5,
  } );
  bIIm7b5 = from( {
    degree: D.bII,
    voicing: SEVENTH_MINOR_b5,
  } );
  IIm7b5 = from( {
    degree: D.II,
    voicing: SEVENTH_MINOR_b5,
  } );
  bIIIm7b5 = from( {
    degree: D.bIII,
    voicing: SEVENTH_MINOR_b5,
  } );
  IIIm7b5 = from( {
    degree: D.III,
    voicing: SEVENTH_MINOR_b5,
  } );
  IVm7b5 = from( {
    degree: D.IV,
    voicing: SEVENTH_MINOR_b5,
  } );
  bVm7b5 = from( {
    degree: D.bV,
    voicing: SEVENTH_MINOR_b5,
  } );
  Vm7b5 = from( {
    degree: D.V,
    voicing: SEVENTH_MINOR_b5,
  } );
  bVIm7b5 = from( {
    degree: D.bVI,
    voicing: SEVENTH_MINOR_b5,
  } );
  VIm7b5 = from( {
    degree: D.VI,
    voicing: SEVENTH_MINOR_b5,
  } );
  bVIIm7b5 = from( {
    degree: D.bVII,
    voicing: SEVENTH_MINOR_b5,
  } );
  VIIm7b5 = from( {
    degree: D.VII,
    voicing: SEVENTH_MINOR_b5,
  } );
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
