/* eslint-disable camelcase */
import type { ChordArray } from "../Array";
import type { Chord } from "../Chord";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { initialize as initializeIntervalSets, TRIAD_MAJOR } from "sets/interval-sets/chromatic/constants";
import { IntervalSets } from "sets/interval-sets/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { fromRootIntervalSet } from "../building/rootIntervalSet";
import { inv } from "../modifiers";

export function initialize() {
  assertNotInitialized(C);

  if (!TRIAD_MAJOR)
    initializeIntervalSets();

  // eslint-disable-next-line max-len, @typescript-eslint/naming-convention
  const { NINTH, POWER_CHORD, SEVENTH, SEVENTH_MAJ7, SEVENTH_MINOR, SEVENTH_MINOR_MAJ7, THIRTEENTH_MAJ13_b5a9, TRIAD_DIMINISHED, TRIAD_MINOR, TRIAD_SUS2, TRIAD_SUS4, THIRTEENTH_b5a9, TRIAD_AUGMENTED } = IntervalSets;

  C = fromRootIntervalSet(P.C, TRIAD_MAJOR);
  CC = fromRootIntervalSet(P.CC, TRIAD_MAJOR);
  D = fromRootIntervalSet(P.D, TRIAD_MAJOR);
  DD = fromRootIntervalSet(P.DD, TRIAD_MAJOR);
  E = fromRootIntervalSet(P.E, TRIAD_MAJOR);
  F = fromRootIntervalSet(P.F, TRIAD_MAJOR);
  FF = fromRootIntervalSet(P.FF, TRIAD_MAJOR);
  G = fromRootIntervalSet(P.G, TRIAD_MAJOR);
  GG = fromRootIntervalSet(P.GG, TRIAD_MAJOR);
  A = fromRootIntervalSet(P.A, TRIAD_MAJOR);
  AA = fromRootIntervalSet(P.AA, TRIAD_MAJOR);
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
  Dm = fromRootIntervalSet(P.D, TRIAD_MINOR);
  DDm = fromRootIntervalSet(P.DD, TRIAD_MINOR);
  Em = fromRootIntervalSet(P.E, TRIAD_MINOR);
  Fm = fromRootIntervalSet(P.F, TRIAD_MINOR);
  FFm = fromRootIntervalSet(P.FF, TRIAD_MINOR);
  Gm = fromRootIntervalSet(P.G, TRIAD_MINOR);
  GGm = fromRootIntervalSet(P.GG, TRIAD_MINOR);
  Am = fromRootIntervalSet(P.A, TRIAD_MINOR);
  AAm = fromRootIntervalSet(P.AA, TRIAD_MINOR);
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
  C13b5a9 = fromRootIntervalSet(P.C, THIRTEENTH_b5a9);
  CC13b5a9 = fromRootIntervalSet(P.CC, THIRTEENTH_b5a9);
  D13b5a9 = fromRootIntervalSet(P.D, THIRTEENTH_b5a9);
  DD13b5a9 = fromRootIntervalSet(P.DD, THIRTEENTH_b5a9);
  E13b5a9 = fromRootIntervalSet(P.E, THIRTEENTH_b5a9);
  F13b5a9 = fromRootIntervalSet(P.F, THIRTEENTH_b5a9);
  FF13b5a9 = fromRootIntervalSet(P.FF, THIRTEENTH_b5a9);
  G13b5a9 = fromRootIntervalSet(P.G, THIRTEENTH_b5a9);
  GG13b5a9 = fromRootIntervalSet(P.GG, THIRTEENTH_b5a9);
  A13b5a9 = fromRootIntervalSet(P.A, THIRTEENTH_b5a9);
  AA13b5a9 = fromRootIntervalSet(P.AA, THIRTEENTH_b5a9);
  B13b5a9 = fromRootIntervalSet(P.A, THIRTEENTH_b5a9);
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

  Caug = fromRootIntervalSet(P.C, TRIAD_AUGMENTED);
  CCaug = fromRootIntervalSet(P.CC, TRIAD_AUGMENTED);
  Daug = fromRootIntervalSet(P.D, TRIAD_AUGMENTED);
  DDaug = fromRootIntervalSet(P.DD, TRIAD_AUGMENTED);
  Eaug = fromRootIntervalSet(P.E, TRIAD_AUGMENTED);
  Faug = fromRootIntervalSet(P.F, TRIAD_AUGMENTED);
  FFaug = fromRootIntervalSet(P.FF, TRIAD_AUGMENTED);
  Gaug = fromRootIntervalSet(P.G, TRIAD_AUGMENTED);
  GGaug = fromRootIntervalSet(P.GG, TRIAD_AUGMENTED);
  Aaug = fromRootIntervalSet(P.A, TRIAD_AUGMENTED);
  AAaug = fromRootIntervalSet(P.AA, TRIAD_AUGMENTED);
  Baug = fromRootIntervalSet(P.B, TRIAD_AUGMENTED);

  ALL = calcAll();
  ALL_NON_INVERSIONS = calculateAllNonInversions();
}

function calculateAllNonInversions(): ChordArray {
  const { COMMON_NON_INVERSIONS: INTEVAL_SETS_ALL_NON_INVERSIONS } = IntervalSets;
  const ret: ChordArray = [] as any;

  for (const intervalSet of INTEVAL_SETS_ALL_NON_INVERSIONS) {
    for (const pitch of P.ALL) {
      const chord = fromRootIntervalSet(pitch, intervalSet);

      ret.push(chord);
    }
  }

  return ret;
}

function calcAll(): ChordArray {
  const { COMMON_NON_INVERSIONS: INTERVAL_SETS_ALL_NON_INVERSIONS } = IntervalSets;
  const set = new Set<Chord>();

  for (const intervalSet of INTERVAL_SETS_ALL_NON_INVERSIONS) {
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

export let D: Chord;

export let DD: Chord;

export let E: Chord;

export let F: Chord;

export let FF: Chord;

export let G: Chord;

export let GG: Chord;

export let A: Chord;

export let AA: Chord;

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

export let Cm: Chord;

export let CCm: Chord;

export let Dm: Chord;

export let DDm: Chord;

export let Em: Chord;

export let Fm: Chord;

export let FFm: Chord;

export let Gm: Chord;

export let GGm: Chord;

export let Am: Chord;

export let AAm: Chord;

export let Bm: Chord;

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

export let Caug: Chord;

export let CCaug: Chord;

export let Daug: Chord;

export let DDaug: Chord;

export let Eaug: Chord;

export let Faug: Chord;

export let FFaug: Chord;

export let Gaug: Chord;

export let GGaug: Chord;

export let Aaug: Chord;

export let AAaug: Chord;

export let Baug: Chord;

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

export let ALL: ChordArray;

export let ALL_NON_INVERSIONS: ChordArray;
