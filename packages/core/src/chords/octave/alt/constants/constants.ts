/* eslint-disable camelcase */
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { Pitches as P } from "pitches/alt";
import { ELEVENTH_MINOR, NINTH, POWER_CHORD, SEVENTH, SEVENTH_b5, SEVENTH_MAJ7, SEVENTH_MINOR, SEVENTH_MINOR_MAJ7, THIRTEENTH_MAJ13_b5a9, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_SUS2, TRIAD_SUS4, ELEVENTH, NINTH_MINOR, initialize as initializeIntervalSets } from "sets/interval-sets/alt/constants";
import { ChordArray } from "../Array";
import { fromRootIntervalSet } from "../building/rootIntervalSet";
import { Chord } from "../Chord";
import { inv } from "../modifiers";

export function initialize() {
  assertNotInitialized(C);

  if (!TRIAD_MAJOR)
    initializeIntervalSets();

  C = fromRootIntervalSet(P.C, TRIAD_MAJOR);
  CC = fromRootIntervalSet(P.CC, TRIAD_MAJOR);
  Db = fromRootIntervalSet(P.Db, TRIAD_MAJOR);
  D = fromRootIntervalSet(P.D, TRIAD_MAJOR);
  DD = fromRootIntervalSet(P.DD, TRIAD_MAJOR);
  Eb = fromRootIntervalSet(P.Eb, TRIAD_MAJOR);
  E = fromRootIntervalSet(P.E, TRIAD_MAJOR);
  F = fromRootIntervalSet(P.F, TRIAD_MAJOR);
  FF = fromRootIntervalSet(P.FF, TRIAD_MAJOR);
  G = fromRootIntervalSet(P.G, TRIAD_MAJOR);
  GG = fromRootIntervalSet(P.GG, TRIAD_MAJOR);
  Ab = fromRootIntervalSet(P.Ab, TRIAD_MAJOR);
  A = fromRootIntervalSet(P.A, TRIAD_MAJOR);
  AA = fromRootIntervalSet(P.AA, TRIAD_MAJOR);
  Bb = fromRootIntervalSet(P.Bb, TRIAD_MAJOR);
  B = fromRootIntervalSet(P.B, TRIAD_MAJOR);
  C5 = fromRootIntervalSet(P.C, POWER_CHORD);
  CC5 = fromRootIntervalSet(P.CC, POWER_CHORD);
  D5 = fromRootIntervalSet(P.D, POWER_CHORD);
  DD5 = fromRootIntervalSet(P.DD, POWER_CHORD);
  E5 = fromRootIntervalSet(P.E, POWER_CHORD);
  F5 = fromRootIntervalSet(P.F, POWER_CHORD);
  FF5 = fromRootIntervalSet(P.FF, POWER_CHORD);
  G5 = fromRootIntervalSet(P.G, POWER_CHORD);
  GG5 = fromRootIntervalSet(P.GG, POWER_CHORD);
  A5 = fromRootIntervalSet(P.A, POWER_CHORD);
  AA5 = fromRootIntervalSet(P.AA, POWER_CHORD);
  B5 = fromRootIntervalSet(P.B, POWER_CHORD);
  C0 = fromRootIntervalSet(P.C, TRIAD_DIMINISHED);
  CC0 = fromRootIntervalSet(P.CC, TRIAD_DIMINISHED);
  D0 = fromRootIntervalSet(P.D, TRIAD_DIMINISHED);
  DD0 = fromRootIntervalSet(P.DD, TRIAD_DIMINISHED);
  E0 = fromRootIntervalSet(P.E, TRIAD_DIMINISHED);
  F0 = fromRootIntervalSet(P.F, TRIAD_DIMINISHED);
  FF0 = fromRootIntervalSet(P.FF, TRIAD_DIMINISHED);
  G0 = fromRootIntervalSet(P.G, TRIAD_DIMINISHED);
  GG0 = fromRootIntervalSet(P.GG, TRIAD_DIMINISHED);
  A0 = fromRootIntervalSet(P.A, TRIAD_DIMINISHED);
  AA0 = fromRootIntervalSet(P.AA, TRIAD_DIMINISHED);
  B0 = fromRootIntervalSet(P.B, TRIAD_DIMINISHED);
  Csus4 = fromRootIntervalSet(P.C, TRIAD_SUS4);
  CCsus4 = fromRootIntervalSet(P.CC, TRIAD_SUS4);
  Dsus4 = fromRootIntervalSet(P.D, TRIAD_SUS4);
  DDsus4 = fromRootIntervalSet(P.DD, TRIAD_SUS4);
  Esus4 = fromRootIntervalSet(P.E, TRIAD_SUS4);
  Fsus4 = fromRootIntervalSet(P.F, TRIAD_SUS4);
  FFsus4 = fromRootIntervalSet(P.FF, TRIAD_SUS4);
  Gsus4 = fromRootIntervalSet(P.G, TRIAD_SUS4);
  GGsus4 = fromRootIntervalSet(P.GG, TRIAD_SUS4);
  Asus4 = fromRootIntervalSet(P.A, TRIAD_SUS4);
  AAsus4 = fromRootIntervalSet(P.AA, TRIAD_SUS4);
  Bsus4 = fromRootIntervalSet(P.B, TRIAD_SUS4);
  Csus2 = fromRootIntervalSet(P.C, TRIAD_SUS2);
  CCsus2 = fromRootIntervalSet(P.CC, TRIAD_SUS2);
  Dsus2 = fromRootIntervalSet(P.D, TRIAD_SUS2);
  DDsus2 = fromRootIntervalSet(P.DD, TRIAD_SUS2);
  Esus2 = fromRootIntervalSet(P.E, TRIAD_SUS2);
  Fsus2 = fromRootIntervalSet(P.F, TRIAD_SUS2);
  FFsus2 = fromRootIntervalSet(P.FF, TRIAD_SUS2);
  Gsus2 = fromRootIntervalSet(P.G, TRIAD_SUS2);
  GGsus2 = fromRootIntervalSet(P.GG, TRIAD_SUS2);
  Asus2 = fromRootIntervalSet(P.A, TRIAD_SUS2);
  AAsus2 = fromRootIntervalSet(P.AA, TRIAD_SUS2);
  Bsus2 = fromRootIntervalSet(P.B, TRIAD_SUS2);
  CMaj7 = fromRootIntervalSet(P.C, SEVENTH_MAJ7);
  CCMaj7 = fromRootIntervalSet(P.CC, SEVENTH_MAJ7);
  DMaj7 = fromRootIntervalSet(P.D, SEVENTH_MAJ7);
  DDMaj7 = fromRootIntervalSet(P.DD, SEVENTH_MAJ7);
  EMaj7 = fromRootIntervalSet(P.E, SEVENTH_MAJ7);
  FMaj7 = fromRootIntervalSet(P.F, SEVENTH_MAJ7);
  FFMaj7 = fromRootIntervalSet(P.FF, SEVENTH_MAJ7);
  GMaj7 = fromRootIntervalSet(P.G, SEVENTH_MAJ7);
  GGMaj7 = fromRootIntervalSet(P.GG, SEVENTH_MAJ7);
  AMaj7 = fromRootIntervalSet(P.A, SEVENTH_MAJ7);
  AAMaj7 = fromRootIntervalSet(P.AA, SEVENTH_MAJ7);
  BMaj7 = fromRootIntervalSet(P.B, SEVENTH_MAJ7);
  CmMaj7 = fromRootIntervalSet(P.C, SEVENTH_MINOR_MAJ7);
  CCmMaj7 = fromRootIntervalSet(P.CC, SEVENTH_MINOR_MAJ7);
  DmMaj7 = fromRootIntervalSet(P.D, SEVENTH_MINOR_MAJ7);
  DDmMaj7 = fromRootIntervalSet(P.DD, SEVENTH_MINOR_MAJ7);
  EmMaj7 = fromRootIntervalSet(P.E, SEVENTH_MINOR_MAJ7);
  FmMaj7 = fromRootIntervalSet(P.F, SEVENTH_MINOR_MAJ7);
  FFmMaj7 = fromRootIntervalSet(P.FF, SEVENTH_MINOR_MAJ7);
  GmMaj7 = fromRootIntervalSet(P.G, SEVENTH_MINOR_MAJ7);
  GGmMaj7 = fromRootIntervalSet(P.GG, SEVENTH_MINOR_MAJ7);
  AmMaj7 = fromRootIntervalSet(P.A, SEVENTH_MINOR_MAJ7);
  AAmMaj7 = fromRootIntervalSet(P.AA, SEVENTH_MINOR_MAJ7);
  BmMaj7 = fromRootIntervalSet(P.B, SEVENTH_MINOR_MAJ7);
  Cm = fromRootIntervalSet(P.C, TRIAD_MINOR);
  CCm = fromRootIntervalSet(P.CC, TRIAD_MINOR);
  Dbm = fromRootIntervalSet(P.Db, TRIAD_MINOR);
  Dm = fromRootIntervalSet(P.D, TRIAD_MINOR);
  DDm = fromRootIntervalSet(P.DD, TRIAD_MINOR);
  Ebm = fromRootIntervalSet(P.Eb, TRIAD_MINOR);
  Em = fromRootIntervalSet(P.E, TRIAD_MINOR);
  Fm = fromRootIntervalSet(P.F, TRIAD_MINOR);
  FFm = fromRootIntervalSet(P.FF, TRIAD_MINOR);
  Gbm = fromRootIntervalSet(P.Gb, TRIAD_MINOR);
  Gm = fromRootIntervalSet(P.G, TRIAD_MINOR);
  GGm = fromRootIntervalSet(P.GG, TRIAD_MINOR);
  Am = fromRootIntervalSet(P.A, TRIAD_MINOR);
  Abm = fromRootIntervalSet(P.Ab, TRIAD_MINOR);
  AAm = fromRootIntervalSet(P.AA, TRIAD_MINOR);
  Bbm = fromRootIntervalSet(P.Bb, TRIAD_MINOR);
  Bm = fromRootIntervalSet(P.B, TRIAD_MINOR);
  C7 = fromRootIntervalSet(P.C, SEVENTH);
  CC7 = fromRootIntervalSet(P.CC, SEVENTH);
  D7 = fromRootIntervalSet(P.D, SEVENTH);
  DD7 = fromRootIntervalSet(P.DD, SEVENTH);
  E7 = fromRootIntervalSet(P.E, SEVENTH);
  F7 = fromRootIntervalSet(P.F, SEVENTH);
  FF7 = fromRootIntervalSet(P.FF, SEVENTH);
  G7 = fromRootIntervalSet(P.G, SEVENTH);
  GG7 = fromRootIntervalSet(P.GG, SEVENTH);
  A7 = fromRootIntervalSet(P.A, SEVENTH);
  AA7 = fromRootIntervalSet(P.AA, SEVENTH);
  B7 = fromRootIntervalSet(P.B, SEVENTH);
  Cm7 = fromRootIntervalSet(P.C, SEVENTH_MINOR);
  CCm7 = fromRootIntervalSet(P.CC, SEVENTH_MINOR);
  Dm7 = fromRootIntervalSet(P.D, SEVENTH_MINOR);
  DDm7 = fromRootIntervalSet(P.DD, SEVENTH_MINOR);
  Em7 = fromRootIntervalSet(P.E, SEVENTH_MINOR);
  Fm7 = fromRootIntervalSet(P.F, SEVENTH_MINOR);
  FFm7 = fromRootIntervalSet(P.FF, SEVENTH_MINOR);
  Gm7 = fromRootIntervalSet(P.G, SEVENTH_MINOR);
  GGm7 = fromRootIntervalSet(P.GG, SEVENTH_MINOR);
  Am7 = fromRootIntervalSet(P.A, SEVENTH_MINOR);
  AAm7 = fromRootIntervalSet(P.AA, SEVENTH_MINOR);
  Bm7 = fromRootIntervalSet(P.B, SEVENTH_MINOR);
  CMaj13b5a9 = fromRootIntervalSet(P.C, THIRTEENTH_MAJ13_b5a9);
  CCMaj13b5a9 = fromRootIntervalSet(P.CC, THIRTEENTH_MAJ13_b5a9);
  DMaj13b5a9 = fromRootIntervalSet(P.D, THIRTEENTH_MAJ13_b5a9);
  DDMaj13b5a9 = fromRootIntervalSet(P.DD, THIRTEENTH_MAJ13_b5a9);
  EMaj13b5a9 = fromRootIntervalSet(P.E, THIRTEENTH_MAJ13_b5a9);
  FMaj13b5a9 = fromRootIntervalSet(P.F, THIRTEENTH_MAJ13_b5a9);
  FFMaj13b5a9 = fromRootIntervalSet(P.FF, THIRTEENTH_MAJ13_b5a9);
  GMaj13b5a9 = fromRootIntervalSet(P.G, THIRTEENTH_MAJ13_b5a9);
  GGMaj13b5a9 = fromRootIntervalSet(P.GG, THIRTEENTH_MAJ13_b5a9);
  AMaj13b5a9 = fromRootIntervalSet(P.A, THIRTEENTH_MAJ13_b5a9);
  AAMaj13b5a9 = fromRootIntervalSet(P.AA, THIRTEENTH_MAJ13_b5a9);
  BMaj13b5a9 = fromRootIntervalSet(P.A, THIRTEENTH_MAJ13_b5a9);
  C7b5 = fromRootIntervalSet(P.C, SEVENTH_b5);
  CC7b5 = fromRootIntervalSet(P.CC, SEVENTH_b5);
  D7b5 = fromRootIntervalSet(P.D, SEVENTH_b5);
  DD7b5 = fromRootIntervalSet(P.DD, SEVENTH_b5);
  E7b5 = fromRootIntervalSet(P.E, SEVENTH_b5);
  F7b5 = fromRootIntervalSet(P.F, SEVENTH_b5);
  FF7b5 = fromRootIntervalSet(P.FF, SEVENTH_b5);
  G7b5 = fromRootIntervalSet(P.G, SEVENTH_b5);
  GG7b5 = fromRootIntervalSet(P.GG, SEVENTH_b5);
  A7b5 = fromRootIntervalSet(P.A, SEVENTH_b5);
  AA7b5 = fromRootIntervalSet(P.AA, SEVENTH_b5);
  B7b5 = fromRootIntervalSet(P.A, SEVENTH_b5);
  C9 = fromRootIntervalSet(P.C, NINTH);
  CC9 = fromRootIntervalSet(P.CC, NINTH);
  D9 = fromRootIntervalSet(P.D, NINTH);
  DD9 = fromRootIntervalSet(P.DD, NINTH);
  E9 = fromRootIntervalSet(P.E, NINTH);
  F9 = fromRootIntervalSet(P.F, NINTH);
  FF9 = fromRootIntervalSet(P.FF, NINTH);
  G9 = fromRootIntervalSet(P.G, NINTH);
  GG9 = fromRootIntervalSet(P.GG, NINTH);
  A9 = fromRootIntervalSet(P.A, NINTH);
  AA9 = fromRootIntervalSet(P.AA, NINTH);
  B9 = fromRootIntervalSet(P.B, NINTH);

  C11 = fromRootIntervalSet(P.C, ELEVENTH);
  CC11 = fromRootIntervalSet(P.CC, ELEVENTH);
  D11 = fromRootIntervalSet(P.D, ELEVENTH);
  DD11 = fromRootIntervalSet(P.DD, ELEVENTH);
  E11 = fromRootIntervalSet(P.E, ELEVENTH);
  F11 = fromRootIntervalSet(P.F, ELEVENTH);
  FF11 = fromRootIntervalSet(P.FF, ELEVENTH);
  G11 = fromRootIntervalSet(P.G, ELEVENTH);
  GG11 = fromRootIntervalSet(P.GG, ELEVENTH);
  A11 = fromRootIntervalSet(P.A, ELEVENTH);
  AA11 = fromRootIntervalSet(P.AA, ELEVENTH);
  B11 = fromRootIntervalSet(P.B, ELEVENTH);

  Cm9 = fromRootIntervalSet(P.C, NINTH_MINOR);
  CCm9 = fromRootIntervalSet(P.CC, NINTH_MINOR);
  Dm9 = fromRootIntervalSet(P.D, NINTH_MINOR);
  DDm9 = fromRootIntervalSet(P.DD, NINTH_MINOR);
  Em9 = fromRootIntervalSet(P.E, NINTH_MINOR);
  Fm9 = fromRootIntervalSet(P.F, NINTH_MINOR);
  FFm9 = fromRootIntervalSet(P.FF, NINTH_MINOR);
  Gm9 = fromRootIntervalSet(P.G, NINTH_MINOR);
  GGm9 = fromRootIntervalSet(P.GG, NINTH_MINOR);
  Am9 = fromRootIntervalSet(P.A, NINTH_MINOR);
  AAm9 = fromRootIntervalSet(P.AA, NINTH_MINOR);
  Bm9 = fromRootIntervalSet(P.B, NINTH_MINOR);

  Cm11 = fromRootIntervalSet(P.C, ELEVENTH_MINOR);
  CCm11 = fromRootIntervalSet(P.CC, ELEVENTH_MINOR);
  Dm11 = fromRootIntervalSet(P.D, ELEVENTH_MINOR);
  DDm11 = fromRootIntervalSet(P.DD, ELEVENTH_MINOR);
  Em11 = fromRootIntervalSet(P.E, ELEVENTH_MINOR);
  Fm11 = fromRootIntervalSet(P.F, ELEVENTH_MINOR);
  FFm11 = fromRootIntervalSet(P.FF, ELEVENTH_MINOR);
  Gm11 = fromRootIntervalSet(P.G, ELEVENTH_MINOR);
  GGm11 = fromRootIntervalSet(P.GG, ELEVENTH_MINOR);
  Am11 = fromRootIntervalSet(P.A, ELEVENTH_MINOR);
  AAm11 = fromRootIntervalSet(P.AA, ELEVENTH_MINOR);
  Bm11 = fromRootIntervalSet(P.B, ELEVENTH_MINOR);

  ALL = calcAll();
  ALL_NON_INVERSIONS = calculateAllNonInversions();
}

function calculateAllNonInversions(): ChordArray {
  const { COMMON_NON_INVERSIONS } = IS;
  const ret: ChordArray = [] as any;

  for (const intervalSet of COMMON_NON_INVERSIONS) {
    for (const pitch of P.ALL) {
      const chord = fromRootIntervalSet(pitch, intervalSet);

      ret.push(chord);
    }
  }

  return ret;
}

function calcAll(): ChordArray {
  const { COMMON_NON_INVERSIONS } = IS;
  const set = new Set<Chord>();

  for (const intervalSet of COMMON_NON_INVERSIONS) {
    for (const pitch of P.ALL) {
      const chord = fromRootIntervalSet(pitch, intervalSet);

      set.add(chord);
      let chordInv = chord;

      for (let i = 1; i < chord.size; i++) {
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

export let CMaj13b5a9: Chord;

export let CCMaj13b5a9: Chord;

export let DMaj13b5a9: Chord;

export let DDMaj13b5a9: Chord;

export let EMaj13b5a9: Chord;

export let FMaj13b5a9: Chord;

export let FFMaj13b5a9: Chord;

export let GMaj13b5a9: Chord;

export let GGMaj13b5a9: Chord;

export let AMaj13b5a9: Chord;

export let AAMaj13b5a9: Chord;

export let BMaj13b5a9: Chord;

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

export let GGm9: Chord;

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

export let GGm11: Chord;

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
