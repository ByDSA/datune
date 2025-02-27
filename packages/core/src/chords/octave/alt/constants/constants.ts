/* eslint-disable camelcase */
import ChordArray from "../Array";
import fromRootVoicing from "../building/root-voicing";
import Chord from "../Chord";
import { inv } from "../modifiers";
import { Voicings } from "voicings/alt";
import { Pitches as DA } from "pitches/alt";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  const { NINTH, POWER_CHORD, SEVENTH, SEVENTH_b5, SEVENTH_MAJ7, SEVENTH_MINOR, SEVENTH_MINOR_MAJ7, THIRTEENTH_MAJ13_b5a9, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_SUS2, TRIAD_SUS4 } = Voicings;

  C = fromRootVoicing(DA.C, TRIAD_MAJOR);
  CC = fromRootVoicing(DA.CC, TRIAD_MAJOR);
  Db = fromRootVoicing(DA.Db, TRIAD_MAJOR);
  D = fromRootVoicing(DA.D, TRIAD_MAJOR);
  DD = fromRootVoicing(DA.DD, TRIAD_MAJOR);
  Eb = fromRootVoicing(DA.Eb, TRIAD_MAJOR);
  E = fromRootVoicing(DA.E, TRIAD_MAJOR);
  F = fromRootVoicing(DA.F, TRIAD_MAJOR);
  FF = fromRootVoicing(DA.FF, TRIAD_MAJOR);
  G = fromRootVoicing(DA.G, TRIAD_MAJOR);
  GG = fromRootVoicing(DA.GG, TRIAD_MAJOR);
  Ab = fromRootVoicing(DA.Ab, TRIAD_MAJOR);
  A = fromRootVoicing(DA.A, TRIAD_MAJOR);
  AA = fromRootVoicing(DA.AA, TRIAD_MAJOR);
  Bb = fromRootVoicing(DA.Bb, TRIAD_MAJOR);
  B = fromRootVoicing(DA.B, TRIAD_MAJOR);
  C5 = fromRootVoicing(DA.C, POWER_CHORD);
  CC5 = fromRootVoicing(DA.CC, POWER_CHORD);
  D5 = fromRootVoicing(DA.D, POWER_CHORD);
  DD5 = fromRootVoicing(DA.DD, POWER_CHORD);
  E5 = fromRootVoicing(DA.E, POWER_CHORD);
  F5 = fromRootVoicing(DA.F, POWER_CHORD);
  FF5 = fromRootVoicing(DA.FF, POWER_CHORD);
  G5 = fromRootVoicing(DA.G, POWER_CHORD);
  GG5 = fromRootVoicing(DA.GG, POWER_CHORD);
  A5 = fromRootVoicing(DA.A, POWER_CHORD);
  AA5 = fromRootVoicing(DA.AA, POWER_CHORD);
  B5 = fromRootVoicing(DA.B, POWER_CHORD);
  C0 = fromRootVoicing(DA.C, TRIAD_DIMINISHED);
  CC0 = fromRootVoicing(DA.CC, TRIAD_DIMINISHED);
  D0 = fromRootVoicing(DA.D, TRIAD_DIMINISHED);
  DD0 = fromRootVoicing(DA.DD, TRIAD_DIMINISHED);
  E0 = fromRootVoicing(DA.E, TRIAD_DIMINISHED);
  F0 = fromRootVoicing(DA.F, TRIAD_DIMINISHED);
  FF0 = fromRootVoicing(DA.FF, TRIAD_DIMINISHED);
  G0 = fromRootVoicing(DA.G, TRIAD_DIMINISHED);
  GG0 = fromRootVoicing(DA.GG, TRIAD_DIMINISHED);
  A0 = fromRootVoicing(DA.A, TRIAD_DIMINISHED);
  AA0 = fromRootVoicing(DA.AA, TRIAD_DIMINISHED);
  B0 = fromRootVoicing(DA.B, TRIAD_DIMINISHED);
  Csus4 = fromRootVoicing(DA.C, TRIAD_SUS4);
  CCsus4 = fromRootVoicing(DA.CC, TRIAD_SUS4);
  Dsus4 = fromRootVoicing(DA.D, TRIAD_SUS4);
  DDsus4 = fromRootVoicing(DA.DD, TRIAD_SUS4);
  Esus4 = fromRootVoicing(DA.E, TRIAD_SUS4);
  Fsus4 = fromRootVoicing(DA.F, TRIAD_SUS4);
  FFsus4 = fromRootVoicing(DA.FF, TRIAD_SUS4);
  Gsus4 = fromRootVoicing(DA.G, TRIAD_SUS4);
  GGsus4 = fromRootVoicing(DA.GG, TRIAD_SUS4);
  Asus4 = fromRootVoicing(DA.A, TRIAD_SUS4);
  AAsus4 = fromRootVoicing(DA.AA, TRIAD_SUS4);
  Bsus4 = fromRootVoicing(DA.B, TRIAD_SUS4);
  Csus2 = fromRootVoicing(DA.C, TRIAD_SUS2);
  CCsus2 = fromRootVoicing(DA.CC, TRIAD_SUS2);
  Dsus2 = fromRootVoicing(DA.D, TRIAD_SUS2);
  DDsus2 = fromRootVoicing(DA.DD, TRIAD_SUS2);
  Esus2 = fromRootVoicing(DA.E, TRIAD_SUS2);
  Fsus2 = fromRootVoicing(DA.F, TRIAD_SUS2);
  FFsus2 = fromRootVoicing(DA.FF, TRIAD_SUS2);
  Gsus2 = fromRootVoicing(DA.G, TRIAD_SUS2);
  GGsus2 = fromRootVoicing(DA.GG, TRIAD_SUS2);
  Asus2 = fromRootVoicing(DA.A, TRIAD_SUS2);
  AAsus2 = fromRootVoicing(DA.AA, TRIAD_SUS2);
  Bsus2 = fromRootVoicing(DA.B, TRIAD_SUS2);
  CMaj7 = fromRootVoicing(DA.C, SEVENTH_MAJ7);
  CCMaj7 = fromRootVoicing(DA.CC, SEVENTH_MAJ7);
  DMaj7 = fromRootVoicing(DA.D, SEVENTH_MAJ7);
  DDMaj7 = fromRootVoicing(DA.DD, SEVENTH_MAJ7);
  EMaj7 = fromRootVoicing(DA.E, SEVENTH_MAJ7);
  FMaj7 = fromRootVoicing(DA.F, SEVENTH_MAJ7);
  FFMaj7 = fromRootVoicing(DA.FF, SEVENTH_MAJ7);
  GMaj7 = fromRootVoicing(DA.G, SEVENTH_MAJ7);
  GGMaj7 = fromRootVoicing(DA.GG, SEVENTH_MAJ7);
  AMaj7 = fromRootVoicing(DA.A, SEVENTH_MAJ7);
  AAMaj7 = fromRootVoicing(DA.AA, SEVENTH_MAJ7);
  BMaj7 = fromRootVoicing(DA.B, SEVENTH_MAJ7);
  CmMaj7 = fromRootVoicing(DA.C, SEVENTH_MINOR_MAJ7);
  CCmMaj7 = fromRootVoicing(DA.CC, SEVENTH_MINOR_MAJ7);
  DmMaj7 = fromRootVoicing(DA.D, SEVENTH_MINOR_MAJ7);
  DDmMaj7 = fromRootVoicing(DA.DD, SEVENTH_MINOR_MAJ7);
  EmMaj7 = fromRootVoicing(DA.E, SEVENTH_MINOR_MAJ7);
  FmMaj7 = fromRootVoicing(DA.F, SEVENTH_MINOR_MAJ7);
  FFmMaj7 = fromRootVoicing(DA.FF, SEVENTH_MINOR_MAJ7);
  GmMaj7 = fromRootVoicing(DA.G, SEVENTH_MINOR_MAJ7);
  GGmMaj7 = fromRootVoicing(DA.GG, SEVENTH_MINOR_MAJ7);
  AmMaj7 = fromRootVoicing(DA.A, SEVENTH_MINOR_MAJ7);
  AAmMaj7 = fromRootVoicing(DA.AA, SEVENTH_MINOR_MAJ7);
  BmMaj7 = fromRootVoicing(DA.B, SEVENTH_MINOR_MAJ7);
  Cm = fromRootVoicing(DA.C, TRIAD_MINOR);
  CCm = fromRootVoicing(DA.CC, TRIAD_MINOR);
  Dbm = fromRootVoicing(DA.Db, TRIAD_MINOR);
  Dm = fromRootVoicing(DA.D, TRIAD_MINOR);
  DDm = fromRootVoicing(DA.DD, TRIAD_MINOR);
  Ebm = fromRootVoicing(DA.Eb, TRIAD_MINOR);
  Em = fromRootVoicing(DA.E, TRIAD_MINOR);
  Fm = fromRootVoicing(DA.F, TRIAD_MINOR);
  FFm = fromRootVoicing(DA.FF, TRIAD_MINOR);
  Gbm = fromRootVoicing(DA.Gb, TRIAD_MINOR);
  Gm = fromRootVoicing(DA.G, TRIAD_MINOR);
  GGm = fromRootVoicing(DA.GG, TRIAD_MINOR);
  Am = fromRootVoicing(DA.A, TRIAD_MINOR);
  Abm = fromRootVoicing(DA.Ab, TRIAD_MINOR);
  AAm = fromRootVoicing(DA.AA, TRIAD_MINOR);
  Bbm = fromRootVoicing(DA.Bb, TRIAD_MINOR);
  Bm = fromRootVoicing(DA.B, TRIAD_MINOR);
  C7 = fromRootVoicing(DA.C, SEVENTH);
  CC7 = fromRootVoicing(DA.CC, SEVENTH);
  D7 = fromRootVoicing(DA.D, SEVENTH);
  DD7 = fromRootVoicing(DA.DD, SEVENTH);
  E7 = fromRootVoicing(DA.E, SEVENTH);
  F7 = fromRootVoicing(DA.F, SEVENTH);
  FF7 = fromRootVoicing(DA.FF, SEVENTH);
  G7 = fromRootVoicing(DA.G, SEVENTH);
  GG7 = fromRootVoicing(DA.GG, SEVENTH);
  A7 = fromRootVoicing(DA.A, SEVENTH);
  AA7 = fromRootVoicing(DA.AA, SEVENTH);
  B7 = fromRootVoicing(DA.B, SEVENTH);
  Cm7 = fromRootVoicing(DA.C, SEVENTH_MINOR);
  CCm7 = fromRootVoicing(DA.CC, SEVENTH_MINOR);
  Dm7 = fromRootVoicing(DA.D, SEVENTH_MINOR);
  DDm7 = fromRootVoicing(DA.DD, SEVENTH_MINOR);
  Em7 = fromRootVoicing(DA.E, SEVENTH_MINOR);
  Fm7 = fromRootVoicing(DA.F, SEVENTH_MINOR);
  FFm7 = fromRootVoicing(DA.FF, SEVENTH_MINOR);
  Gm7 = fromRootVoicing(DA.G, SEVENTH_MINOR);
  GGm7 = fromRootVoicing(DA.GG, SEVENTH_MINOR);
  Am7 = fromRootVoicing(DA.A, SEVENTH_MINOR);
  AAm7 = fromRootVoicing(DA.AA, SEVENTH_MINOR);
  Bm7 = fromRootVoicing(DA.B, SEVENTH_MINOR);
  C13b5a9 = fromRootVoicing(DA.C, THIRTEENTH_MAJ13_b5a9);
  CC13b5a9 = fromRootVoicing(DA.CC, THIRTEENTH_MAJ13_b5a9);
  D13b5a9 = fromRootVoicing(DA.D, THIRTEENTH_MAJ13_b5a9);
  DD13b5a9 = fromRootVoicing(DA.DD, THIRTEENTH_MAJ13_b5a9);
  E13b5a9 = fromRootVoicing(DA.E, THIRTEENTH_MAJ13_b5a9);
  F13b5a9 = fromRootVoicing(DA.F, THIRTEENTH_MAJ13_b5a9);
  FF13b5a9 = fromRootVoicing(DA.FF, THIRTEENTH_MAJ13_b5a9);
  G13b5a9 = fromRootVoicing(DA.G, THIRTEENTH_MAJ13_b5a9);
  GG13b5a9 = fromRootVoicing(DA.GG, THIRTEENTH_MAJ13_b5a9);
  A13b5a9 = fromRootVoicing(DA.A, THIRTEENTH_MAJ13_b5a9);
  AA13b5a9 = fromRootVoicing(DA.AA, THIRTEENTH_MAJ13_b5a9);
  B13b5a9 = fromRootVoicing(DA.A, THIRTEENTH_MAJ13_b5a9);
  CAlt = fromRootVoicing(DA.C, SEVENTH_b5);
  CCAlt = fromRootVoicing(DA.CC, SEVENTH_b5);
  DAlt = fromRootVoicing(DA.D, SEVENTH_b5);
  DDAlt = fromRootVoicing(DA.DD, SEVENTH_b5);
  EAlt = fromRootVoicing(DA.E, SEVENTH_b5);
  FAlt = fromRootVoicing(DA.F, SEVENTH_b5);
  FFAlt = fromRootVoicing(DA.FF, SEVENTH_b5);
  GAlt = fromRootVoicing(DA.G, SEVENTH_b5);
  GGAlt = fromRootVoicing(DA.GG, SEVENTH_b5);
  AAlt = fromRootVoicing(DA.A, SEVENTH_b5);
  AAAlt = fromRootVoicing(DA.AA, SEVENTH_b5);
  BAlt = fromRootVoicing(DA.A, SEVENTH_b5);
  C9 = fromRootVoicing(DA.C, NINTH);
  CC9 = fromRootVoicing(DA.CC, NINTH);
  D9 = fromRootVoicing(DA.D, NINTH);
  DD9 = fromRootVoicing(DA.DD, NINTH);
  E9 = fromRootVoicing(DA.E, NINTH);
  F9 = fromRootVoicing(DA.F, NINTH);
  FF9 = fromRootVoicing(DA.FF, NINTH);
  G9 = fromRootVoicing(DA.G, NINTH);
  GG9 = fromRootVoicing(DA.GG, NINTH);
  A9 = fromRootVoicing(DA.A, NINTH);
  AA9 = fromRootVoicing(DA.AA, NINTH);
  B9 = fromRootVoicing(DA.B, NINTH);

  ALL = calcAll();
  ALL_NON_INVERSIONS = calculateAllNonInversions();
}

function calculateAllNonInversions(): ChordArray {
  const { COMMON_NON_INVERSIONS } = Voicings;
  const ret: ChordArray = [] as any;

  for (const voicing of COMMON_NON_INVERSIONS) {
    for (const pitch of DA.ALL) {
      const chord = fromRootVoicing(pitch, voicing);

      ret.push(chord);
    }
  }

  return ret;
}

function calcAll(): ChordArray {
  const { COMMON_NON_INVERSIONS } = Voicings;
  const set = new Set<Chord>();

  for (const voicing of COMMON_NON_INVERSIONS) {
    for (const pitch of DA.ALL) {
      const chord = fromRootVoicing(pitch, voicing);

      set.add(chord);
      let chordInv = chord;

      for (let i = 1; i < chord.length; i++) {
        chordInv = inv(chordInv);
        set.add(chordInv);
      }
    }
  }

  return [...set] as ChordArray;
}

export let C: Chord;

export let CC: Chord;

export let Db: Chord;

export let D: Chord;

export let DD: Chord;

export let Eb: Chord;

export let E: Chord;

export let F: Chord;

export let FF: Chord;

export let G: Chord;

export let GG: Chord;

export let Ab: Chord;

export let A: Chord;

export let AA: Chord;

export let Bb: Chord;

export let B: Chord;

export let C7: Chord;

export let CC7: Chord;

export let D7: Chord;

export let DD7: Chord;

export let E7: Chord;

export let F7: Chord;

export let FF7: Chord;

export let G7: Chord;

export let GG7: Chord;

export let A7: Chord;

export let AA7: Chord;

export let B7: Chord;

export let Cm7: Chord;

export let CCm7: Chord;

export let Dm7: Chord;

export let DDm7: Chord;

export let Em7: Chord;

export let Fm7: Chord;

export let FFm7: Chord;

export let Gm7: Chord;

export let GGm7: Chord;

export let Am7: Chord;

export let AAm7: Chord;

export let Bm7: Chord;

export let C13b5a9: Chord;

export let CC13b5a9: Chord;

export let D13b5a9: Chord;

export let DD13b5a9: Chord;

export let E13b5a9: Chord;

export let F13b5a9: Chord;

export let FF13b5a9: Chord;

export let G13b5a9: Chord;

export let GG13b5a9: Chord;

export let A13b5a9: Chord;

export let AA13b5a9: Chord;

export let B13b5a9: Chord;

export let CAlt: Chord;

export let CCAlt: Chord;

export let DAlt: Chord;

export let DDAlt: Chord;

export let EAlt: Chord;

export let FAlt: Chord;

export let FFAlt: Chord;

export let GAlt: Chord;

export let GGAlt: Chord;

export let AAlt: Chord;

export let AAAlt: Chord;

export let BAlt: Chord;

export let Cm7Alt: Chord;

export let CCm7Alt: Chord;

export let Dm7Alt: Chord;

export let DDm7Alt: Chord;

export let Em7Alt: Chord;

export let Fm7Alt: Chord;

export let FFm7Alt: Chord;

export let Gm7Alt: Chord;

export let GGm7Alt: Chord;

export let Am7Alt: Chord;

export let AAm7Alt: Chord;

export let Bm7Alt: Chord;

export let C7Alt: Chord;

export let CC7Alt: Chord;

export let D7Alt: Chord;

export let DD7Alt: Chord;

export let E7Alt: Chord;

export let F7Alt: Chord;

export let FF7Alt: Chord;

export let G7Alt: Chord;

export let GG7Alt: Chord;

export let A7Alt: Chord;

export let AA7Alt: Chord;

export let B7Alt: Chord;

export let C5: Chord;

export let CC5: Chord;

export let D5: Chord;

export let DD5: Chord;

export let E5: Chord;

export let F5: Chord;

export let FF5: Chord;

export let G5: Chord;

export let GG5: Chord;

export let A5: Chord;

export let AA5: Chord;

export let B5: Chord;

export let C7b5: Chord;

export let CC7b5: Chord;

export let D7b5: Chord;

export let DD7b5: Chord;

export let E7b5: Chord;

export let F7b5: Chord;

export let FF7b5: Chord;

export let G7b5: Chord;

export let GG7b5: Chord;

export let A7b5: Chord;

export let AA7b5: Chord;

export let B7b5: Chord;

export let C9: Chord;

export let CC9: Chord;

export let D9: Chord;

export let DD9: Chord;

export let E9: Chord;

export let F9: Chord;

export let FF9: Chord;

export let G9: Chord;

export let GG9: Chord;

export let A9: Chord;

export let AA9: Chord;

export let B9: Chord;

export let C11: Chord;

export let CC11: Chord;

export let D11: Chord;

export let DD11: Chord;

export let E11: Chord;

export let F11: Chord;

export let FF11: Chord;

export let G11: Chord;

export let GG11: Chord;

export let A11: Chord;

export let AA11: Chord;

export let B11: Chord;

export let C0: Chord;

export let CC0: Chord;

export let D0: Chord;

export let DD0: Chord;

export let E0: Chord;

export let F0: Chord;

export let FF0: Chord;

export let G0: Chord;

export let GG0: Chord;

export let A0: Chord;

export let AA0: Chord;

export let B0: Chord;

export let Csus4: Chord;

export let CCsus4: Chord;

export let Dsus4: Chord;

export let DDsus4: Chord;

export let Esus4: Chord;

export let Fsus4: Chord;

export let FFsus4: Chord;

export let Gsus4: Chord;

export let GGsus4: Chord;

export let Asus4: Chord;

export let AAsus4: Chord;

export let Bsus4: Chord;

export let Csus2: Chord;

export let CCsus2: Chord;

export let Dsus2: Chord;

export let DDsus2: Chord;

export let Esus2: Chord;

export let Fsus2: Chord;

export let FFsus2: Chord;

export let Gsus2: Chord;

export let GGsus2: Chord;

export let Asus2: Chord;

export let AAsus2: Chord;

export let Bsus2: Chord;

export let CMaj7: Chord;

export let CCMaj7: Chord;

export let DMaj7: Chord;

export let DDMaj7: Chord;

export let EMaj7: Chord;

export let FMaj7: Chord;

export let FFMaj7: Chord;

export let GMaj7: Chord;

export let GGMaj7: Chord;

export let AMaj7: Chord;

export let AAMaj7: Chord;

export let BMaj7: Chord;

export let CmMaj7: Chord;

export let CCmMaj7: Chord;

export let DmMaj7: Chord;

export let DDmMaj7: Chord;

export let EmMaj7: Chord;

export let FmMaj7: Chord;

export let FFmMaj7: Chord;

export let GmMaj7: Chord;

export let GGmMaj7: Chord;

export let AmMaj7: Chord;

export let AAmMaj7: Chord;

export let BmMaj7: Chord;

export let Cm9: Chord;

export let CCm9: Chord;

export let Dm9: Chord;

export let DDm9: Chord;

export let Em9: Chord;

export let Fm9: Chord;

export let FFm9: Chord;

export let Gm9: Chord;

export let GGM9: Chord;

export let Am9: Chord;

export let AAm9: Chord;

export let Bm9: Chord;

export let Cm11: Chord;

export let CCm11: Chord;

export let Dm11: Chord;

export let DDm11: Chord;

export let Em11: Chord;

export let Fm11: Chord;

export let FFm11: Chord;

export let Gm11: Chord;

export let GGM11: Chord;

export let Am11: Chord;

export let AAm11: Chord;

export let Bm11: Chord;

export let Cm: Chord;

export let CCm: Chord;

export let Dbm: Chord;

export let Dm: Chord;

export let DDm: Chord;

export let Ebm: Chord;

export let Em: Chord;

export let Fm: Chord;

export let FFm: Chord;

export let Gbm: Chord;

export let Gm: Chord;

export let GGm: Chord;

export let Abm: Chord;

export let Am: Chord;

export let AAm: Chord;

export let Bbm: Chord;

export let Bm: Chord;

export let ALL: ChordArray;

export let ALL_NON_INVERSIONS: ChordArray;
