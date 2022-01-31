/* eslint-disable import/no-mutable-exports */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { A as P_A, AA as P_AA, Ab as P_Ab, ALL as P_ALL, B as P_B, Bb as P_Bb, C as P_C, CC as P_CC, D as P_D, Db as P_Db, DD as P_DD, E as P_E, Eb as P_Eb, F as P_F, FF as P_FF, G as P_G, Gb as P_Gb, GG as P_GG } from "pitches/alt";
import { COMMON_NON_INVERSIONS, NINTH, POWER_CHORD, SEVENTH, SEVENTH_b5, SEVENTH_MAJ7, SEVENTH_MINOR, SEVENTH_MINOR_MAJ7, THIRTEENTH_MAJ13_b5a9, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_SUS2, TRIAD_SUS4 } from "voicings/alt";
import ChordArray from "../Array";
import fromRootVoicing from "../building/root-voicing";
import Chord from "../Chord";
import { inv } from "../modifiers";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  C = fromRootVoicing(P_C, TRIAD_MAJOR);
  CC = fromRootVoicing(P_CC, TRIAD_MAJOR);
  Db = fromRootVoicing(P_Db, TRIAD_MAJOR);
  D = fromRootVoicing(P_D, TRIAD_MAJOR);
  DD = fromRootVoicing(P_DD, TRIAD_MAJOR);
  Eb = fromRootVoicing(P_Eb, TRIAD_MAJOR);
  E = fromRootVoicing(P_E, TRIAD_MAJOR);
  F = fromRootVoicing(P_F, TRIAD_MAJOR);
  FF = fromRootVoicing(P_FF, TRIAD_MAJOR);
  G = fromRootVoicing(P_G, TRIAD_MAJOR);
  GG = fromRootVoicing(P_GG, TRIAD_MAJOR);
  Ab = fromRootVoicing(P_Ab, TRIAD_MAJOR);
  A = fromRootVoicing(P_A, TRIAD_MAJOR);
  AA = fromRootVoicing(P_AA, TRIAD_MAJOR);
  Bb = fromRootVoicing(P_Bb, TRIAD_MAJOR);
  B = fromRootVoicing(P_B, TRIAD_MAJOR);
  C5 = fromRootVoicing(P_C, POWER_CHORD);
  CC5 = fromRootVoicing(P_CC, POWER_CHORD);
  D5 = fromRootVoicing(P_D, POWER_CHORD);
  DD5 = fromRootVoicing(P_DD, POWER_CHORD);
  E5 = fromRootVoicing(P_E, POWER_CHORD);
  F5 = fromRootVoicing(P_F, POWER_CHORD);
  FF5 = fromRootVoicing(P_FF, POWER_CHORD);
  G5 = fromRootVoicing(P_G, POWER_CHORD);
  GG5 = fromRootVoicing(P_GG, POWER_CHORD);
  A5 = fromRootVoicing(P_A, POWER_CHORD);
  AA5 = fromRootVoicing(P_AA, POWER_CHORD);
  B5 = fromRootVoicing(P_B, POWER_CHORD);
  C0 = fromRootVoicing(P_C, TRIAD_DIMINISHED);
  CC0 = fromRootVoicing(P_CC, TRIAD_DIMINISHED);
  D0 = fromRootVoicing(P_D, TRIAD_DIMINISHED);
  DD0 = fromRootVoicing(P_DD, TRIAD_DIMINISHED);
  E0 = fromRootVoicing(P_E, TRIAD_DIMINISHED);
  F0 = fromRootVoicing(P_F, TRIAD_DIMINISHED);
  FF0 = fromRootVoicing(P_FF, TRIAD_DIMINISHED);
  G0 = fromRootVoicing(P_G, TRIAD_DIMINISHED);
  GG0 = fromRootVoicing(P_GG, TRIAD_DIMINISHED);
  A0 = fromRootVoicing(P_A, TRIAD_DIMINISHED);
  AA0 = fromRootVoicing(P_AA, TRIAD_DIMINISHED);
  B0 = fromRootVoicing(P_B, TRIAD_DIMINISHED);
  Csus4 = fromRootVoicing(P_C, TRIAD_SUS4);
  CCsus4 = fromRootVoicing(P_CC, TRIAD_SUS4);
  Dsus4 = fromRootVoicing(P_D, TRIAD_SUS4);
  DDsus4 = fromRootVoicing(P_DD, TRIAD_SUS4);
  Esus4 = fromRootVoicing(P_E, TRIAD_SUS4);
  Fsus4 = fromRootVoicing(P_F, TRIAD_SUS4);
  FFsus4 = fromRootVoicing(P_FF, TRIAD_SUS4);
  Gsus4 = fromRootVoicing(P_G, TRIAD_SUS4);
  GGsus4 = fromRootVoicing(P_GG, TRIAD_SUS4);
  Asus4 = fromRootVoicing(P_A, TRIAD_SUS4);
  AAsus4 = fromRootVoicing(P_AA, TRIAD_SUS4);
  Bsus4 = fromRootVoicing(P_B, TRIAD_SUS4);
  Csus2 = fromRootVoicing(P_C, TRIAD_SUS2);
  CCsus2 = fromRootVoicing(P_CC, TRIAD_SUS2);
  Dsus2 = fromRootVoicing(P_D, TRIAD_SUS2);
  DDsus2 = fromRootVoicing(P_DD, TRIAD_SUS2);
  Esus2 = fromRootVoicing(P_E, TRIAD_SUS2);
  Fsus2 = fromRootVoicing(P_F, TRIAD_SUS2);
  FFsus2 = fromRootVoicing(P_FF, TRIAD_SUS2);
  Gsus2 = fromRootVoicing(P_G, TRIAD_SUS2);
  GGsus2 = fromRootVoicing(P_GG, TRIAD_SUS2);
  Asus2 = fromRootVoicing(P_A, TRIAD_SUS2);
  AAsus2 = fromRootVoicing(P_AA, TRIAD_SUS2);
  Bsus2 = fromRootVoicing(P_B, TRIAD_SUS2);
  CMaj7 = fromRootVoicing(P_C, SEVENTH_MAJ7);
  CCMaj7 = fromRootVoicing(P_CC, SEVENTH_MAJ7);
  DMaj7 = fromRootVoicing(P_D, SEVENTH_MAJ7);
  DDMaj7 = fromRootVoicing(P_DD, SEVENTH_MAJ7);
  EMaj7 = fromRootVoicing(P_E, SEVENTH_MAJ7);
  FMaj7 = fromRootVoicing(P_F, SEVENTH_MAJ7);
  FFMaj7 = fromRootVoicing(P_FF, SEVENTH_MAJ7);
  GMaj7 = fromRootVoicing(P_G, SEVENTH_MAJ7);
  GGMaj7 = fromRootVoicing(P_GG, SEVENTH_MAJ7);
  AMaj7 = fromRootVoicing(P_A, SEVENTH_MAJ7);
  AAMaj7 = fromRootVoicing(P_AA, SEVENTH_MAJ7);
  BMaj7 = fromRootVoicing(P_B, SEVENTH_MAJ7);
  CmMaj7 = fromRootVoicing(P_C, SEVENTH_MINOR_MAJ7);
  CCmMaj7 = fromRootVoicing(P_CC, SEVENTH_MINOR_MAJ7);
  DmMaj7 = fromRootVoicing(P_D, SEVENTH_MINOR_MAJ7);
  DDmMaj7 = fromRootVoicing(P_DD, SEVENTH_MINOR_MAJ7);
  EmMaj7 = fromRootVoicing(P_E, SEVENTH_MINOR_MAJ7);
  FmMaj7 = fromRootVoicing(P_F, SEVENTH_MINOR_MAJ7);
  FFmMaj7 = fromRootVoicing(P_FF, SEVENTH_MINOR_MAJ7);
  GmMaj7 = fromRootVoicing(P_G, SEVENTH_MINOR_MAJ7);
  GGmMaj7 = fromRootVoicing(P_GG, SEVENTH_MINOR_MAJ7);
  AmMaj7 = fromRootVoicing(P_A, SEVENTH_MINOR_MAJ7);
  AAmMaj7 = fromRootVoicing(P_AA, SEVENTH_MINOR_MAJ7);
  BmMaj7 = fromRootVoicing(P_B, SEVENTH_MINOR_MAJ7);
  Cm = fromRootVoicing(P_C, TRIAD_MINOR);
  CCm = fromRootVoicing(P_CC, TRIAD_MINOR);
  Dbm = fromRootVoicing(P_Db, TRIAD_MINOR);
  Dm = fromRootVoicing(P_D, TRIAD_MINOR);
  DDm = fromRootVoicing(P_DD, TRIAD_MINOR);
  Ebm = fromRootVoicing(P_Eb, TRIAD_MINOR);
  Em = fromRootVoicing(P_E, TRIAD_MINOR);
  Fm = fromRootVoicing(P_F, TRIAD_MINOR);
  FFm = fromRootVoicing(P_FF, TRIAD_MINOR);
  Gbm = fromRootVoicing(P_Gb, TRIAD_MINOR);
  Gm = fromRootVoicing(P_G, TRIAD_MINOR);
  GGm = fromRootVoicing(P_GG, TRIAD_MINOR);
  Am = fromRootVoicing(P_A, TRIAD_MINOR);
  Abm = fromRootVoicing(P_Ab, TRIAD_MINOR);
  AAm = fromRootVoicing(P_AA, TRIAD_MINOR);
  Bbm = fromRootVoicing(P_Bb, TRIAD_MINOR);
  Bm = fromRootVoicing(P_B, TRIAD_MINOR);
  C7 = fromRootVoicing(P_C, SEVENTH);
  CC7 = fromRootVoicing(P_CC, SEVENTH);
  D7 = fromRootVoicing(P_D, SEVENTH);
  DD7 = fromRootVoicing(P_DD, SEVENTH);
  E7 = fromRootVoicing(P_E, SEVENTH);
  F7 = fromRootVoicing(P_F, SEVENTH);
  FF7 = fromRootVoicing(P_FF, SEVENTH);
  G7 = fromRootVoicing(P_G, SEVENTH);
  GG7 = fromRootVoicing(P_GG, SEVENTH);
  A7 = fromRootVoicing(P_A, SEVENTH);
  AA7 = fromRootVoicing(P_AA, SEVENTH);
  B7 = fromRootVoicing(P_B, SEVENTH);
  Cm7 = fromRootVoicing(P_C, SEVENTH_MINOR);
  CCm7 = fromRootVoicing(P_CC, SEVENTH_MINOR);
  Dm7 = fromRootVoicing(P_D, SEVENTH_MINOR);
  DDm7 = fromRootVoicing(P_DD, SEVENTH_MINOR);
  Em7 = fromRootVoicing(P_E, SEVENTH_MINOR);
  Fm7 = fromRootVoicing(P_F, SEVENTH_MINOR);
  FFm7 = fromRootVoicing(P_FF, SEVENTH_MINOR);
  Gm7 = fromRootVoicing(P_G, SEVENTH_MINOR);
  GGm7 = fromRootVoicing(P_GG, SEVENTH_MINOR);
  Am7 = fromRootVoicing(P_A, SEVENTH_MINOR);
  AAm7 = fromRootVoicing(P_AA, SEVENTH_MINOR);
  Bm7 = fromRootVoicing(P_B, SEVENTH_MINOR);
  C13b5a9 = fromRootVoicing(P_C, THIRTEENTH_MAJ13_b5a9);
  CC13b5a9 = fromRootVoicing(P_CC, THIRTEENTH_MAJ13_b5a9);
  D13b5a9 = fromRootVoicing(P_D, THIRTEENTH_MAJ13_b5a9);
  DD13b5a9 = fromRootVoicing(P_DD, THIRTEENTH_MAJ13_b5a9);
  E13b5a9 = fromRootVoicing(P_E, THIRTEENTH_MAJ13_b5a9);
  F13b5a9 = fromRootVoicing(P_F, THIRTEENTH_MAJ13_b5a9);
  FF13b5a9 = fromRootVoicing(P_FF, THIRTEENTH_MAJ13_b5a9);
  G13b5a9 = fromRootVoicing(P_G, THIRTEENTH_MAJ13_b5a9);
  GG13b5a9 = fromRootVoicing(P_GG, THIRTEENTH_MAJ13_b5a9);
  A13b5a9 = fromRootVoicing(P_A, THIRTEENTH_MAJ13_b5a9);
  AA13b5a9 = fromRootVoicing(P_AA, THIRTEENTH_MAJ13_b5a9);
  B13b5a9 = fromRootVoicing(P_A, THIRTEENTH_MAJ13_b5a9);
  CAlt = fromRootVoicing(P_C, SEVENTH_b5);
  CCAlt = fromRootVoicing(P_CC, SEVENTH_b5);
  DAlt = fromRootVoicing(P_D, SEVENTH_b5);
  DDAlt = fromRootVoicing(P_DD, SEVENTH_b5);
  EAlt = fromRootVoicing(P_E, SEVENTH_b5);
  FAlt = fromRootVoicing(P_F, SEVENTH_b5);
  FFAlt = fromRootVoicing(P_FF, SEVENTH_b5);
  GAlt = fromRootVoicing(P_G, SEVENTH_b5);
  GGAlt = fromRootVoicing(P_GG, SEVENTH_b5);
  AAlt = fromRootVoicing(P_A, SEVENTH_b5);
  AAAlt = fromRootVoicing(P_AA, SEVENTH_b5);
  BAlt = fromRootVoicing(P_A, SEVENTH_b5);
  C9 = fromRootVoicing(P_C, NINTH);
  CC9 = fromRootVoicing(P_CC, NINTH);
  D9 = fromRootVoicing(P_D, NINTH);
  DD9 = fromRootVoicing(P_DD, NINTH);
  E9 = fromRootVoicing(P_E, NINTH);
  F9 = fromRootVoicing(P_F, NINTH);
  FF9 = fromRootVoicing(P_FF, NINTH);
  G9 = fromRootVoicing(P_G, NINTH);
  GG9 = fromRootVoicing(P_GG, NINTH);
  A9 = fromRootVoicing(P_A, NINTH);
  AA9 = fromRootVoicing(P_AA, NINTH);
  B9 = fromRootVoicing(P_B, NINTH);

  ALL = calcAll();
  ALL_NON_INVERSIONS = calculateAllNonInversions();
}

function calculateAllNonInversions(): ChordArray {
  const ret: ChordArray = [] as any;

  for (const voicing of COMMON_NON_INVERSIONS) {
    for (const pitch of P_ALL) {
      const chord = fromRootVoicing(pitch, voicing);

      ret.push(chord);
    }
  }

  return ret;
}

function calcAll(): ChordArray {
  const set = new Set<Chord>();

  for (const voicing of COMMON_NON_INVERSIONS) {
    for (const pitch of P_ALL) {
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
