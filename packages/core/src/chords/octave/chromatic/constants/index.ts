/* eslint-disable camelcase */
import type { ChordArray } from "../Array";
import type { Chord } from "../Chord";
import { initialize as initializeVoicings, TRIAD_MAJOR } from "voicings/relative/chromatic/constants";
import { Voicings as V } from "voicings/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { fromRootVoicing } from "../building/root-voicing";
import { inv } from "../modifiers";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  if (!TRIAD_MAJOR)
    initializeVoicings();

  // eslint-disable-next-line max-len, @typescript-eslint/naming-convention
  const { NINTH, POWER_CHORD, SEVENTH, SEVENTH_MAJ7, SEVENTH_MINOR, SEVENTH_MINOR_MAJ7, THIRTEENTH_MAJ13_b5a9, TRIAD_DIMINISHED, TRIAD_MINOR, TRIAD_SUS2, TRIAD_SUS4, THIRTEENTH_b5a9, TRIAD_AUGMENTED } = V;

  C = fromRootVoicing(P.C, TRIAD_MAJOR);
  CC = fromRootVoicing(P.CC, TRIAD_MAJOR);
  D = fromRootVoicing(P.D, TRIAD_MAJOR);
  DD = fromRootVoicing(P.DD, TRIAD_MAJOR);
  E = fromRootVoicing(P.E, TRIAD_MAJOR);
  F = fromRootVoicing(P.F, TRIAD_MAJOR);
  FF = fromRootVoicing(P.FF, TRIAD_MAJOR);
  G = fromRootVoicing(P.G, TRIAD_MAJOR);
  GG = fromRootVoicing(P.GG, TRIAD_MAJOR);
  A = fromRootVoicing(P.A, TRIAD_MAJOR);
  AA = fromRootVoicing(P.AA, TRIAD_MAJOR);
  B = fromRootVoicing(P.B, TRIAD_MAJOR);
  C5 = fromRootVoicing(P.C, POWER_CHORD);
  CC5 = fromRootVoicing(P.CC, POWER_CHORD);
  D5 = fromRootVoicing(P.D, POWER_CHORD);
  DD5 = fromRootVoicing(P.DD, POWER_CHORD);
  E5 = fromRootVoicing(P.E, POWER_CHORD);
  F5 = fromRootVoicing(P.F, POWER_CHORD);
  FF5 = fromRootVoicing(P.FF, POWER_CHORD);
  G5 = fromRootVoicing(P.G, POWER_CHORD);
  GG5 = fromRootVoicing(P.GG, POWER_CHORD);
  A5 = fromRootVoicing(P.A, POWER_CHORD);
  AA5 = fromRootVoicing(P.AA, POWER_CHORD);
  B5 = fromRootVoicing(P.B, POWER_CHORD);
  C0 = fromRootVoicing(P.C, TRIAD_DIMINISHED);
  CC0 = fromRootVoicing(P.CC, TRIAD_DIMINISHED);
  D0 = fromRootVoicing(P.D, TRIAD_DIMINISHED);
  DD0 = fromRootVoicing(P.DD, TRIAD_DIMINISHED);
  E0 = fromRootVoicing(P.E, TRIAD_DIMINISHED);
  F0 = fromRootVoicing(P.F, TRIAD_DIMINISHED);
  FF0 = fromRootVoicing(P.FF, TRIAD_DIMINISHED);
  G0 = fromRootVoicing(P.G, TRIAD_DIMINISHED);
  GG0 = fromRootVoicing(P.GG, TRIAD_DIMINISHED);
  A0 = fromRootVoicing(P.A, TRIAD_DIMINISHED);
  AA0 = fromRootVoicing(P.AA, TRIAD_DIMINISHED);
  B0 = fromRootVoicing(P.B, TRIAD_DIMINISHED);
  Csus4 = fromRootVoicing(P.C, TRIAD_SUS4);
  CCsus4 = fromRootVoicing(P.CC, TRIAD_SUS4);
  Dsus4 = fromRootVoicing(P.D, TRIAD_SUS4);
  DDsus4 = fromRootVoicing(P.DD, TRIAD_SUS4);
  Esus4 = fromRootVoicing(P.E, TRIAD_SUS4);
  Fsus4 = fromRootVoicing(P.F, TRIAD_SUS4);
  FFsus4 = fromRootVoicing(P.FF, TRIAD_SUS4);
  Gsus4 = fromRootVoicing(P.G, TRIAD_SUS4);
  GGsus4 = fromRootVoicing(P.GG, TRIAD_SUS4);
  Asus4 = fromRootVoicing(P.A, TRIAD_SUS4);
  AAsus4 = fromRootVoicing(P.AA, TRIAD_SUS4);
  Bsus4 = fromRootVoicing(P.B, TRIAD_SUS4);
  Csus2 = fromRootVoicing(P.C, TRIAD_SUS2);
  CCsus2 = fromRootVoicing(P.CC, TRIAD_SUS2);
  Dsus2 = fromRootVoicing(P.D, TRIAD_SUS2);
  DDsus2 = fromRootVoicing(P.DD, TRIAD_SUS2);
  Esus2 = fromRootVoicing(P.E, TRIAD_SUS2);
  Fsus2 = fromRootVoicing(P.F, TRIAD_SUS2);
  FFsus2 = fromRootVoicing(P.FF, TRIAD_SUS2);
  Gsus2 = fromRootVoicing(P.G, TRIAD_SUS2);
  GGsus2 = fromRootVoicing(P.GG, TRIAD_SUS2);
  Asus2 = fromRootVoicing(P.A, TRIAD_SUS2);
  AAsus2 = fromRootVoicing(P.AA, TRIAD_SUS2);
  Bsus2 = fromRootVoicing(P.B, TRIAD_SUS2);
  CMaj7 = fromRootVoicing(P.C, SEVENTH_MAJ7);
  CCMaj7 = fromRootVoicing(P.CC, SEVENTH_MAJ7);
  DMaj7 = fromRootVoicing(P.D, SEVENTH_MAJ7);
  DDMaj7 = fromRootVoicing(P.DD, SEVENTH_MAJ7);
  EMaj7 = fromRootVoicing(P.E, SEVENTH_MAJ7);
  FMaj7 = fromRootVoicing(P.F, SEVENTH_MAJ7);
  FFMaj7 = fromRootVoicing(P.FF, SEVENTH_MAJ7);
  GMaj7 = fromRootVoicing(P.G, SEVENTH_MAJ7);
  GGMaj7 = fromRootVoicing(P.GG, SEVENTH_MAJ7);
  AMaj7 = fromRootVoicing(P.A, SEVENTH_MAJ7);
  AAMaj7 = fromRootVoicing(P.AA, SEVENTH_MAJ7);
  BMaj7 = fromRootVoicing(P.B, SEVENTH_MAJ7);
  CmMaj7 = fromRootVoicing(P.C, SEVENTH_MINOR_MAJ7);
  CCmMaj7 = fromRootVoicing(P.CC, SEVENTH_MINOR_MAJ7);
  DmMaj7 = fromRootVoicing(P.D, SEVENTH_MINOR_MAJ7);
  DDmMaj7 = fromRootVoicing(P.DD, SEVENTH_MINOR_MAJ7);
  EmMaj7 = fromRootVoicing(P.E, SEVENTH_MINOR_MAJ7);
  FmMaj7 = fromRootVoicing(P.F, SEVENTH_MINOR_MAJ7);
  FFmMaj7 = fromRootVoicing(P.FF, SEVENTH_MINOR_MAJ7);
  GmMaj7 = fromRootVoicing(P.G, SEVENTH_MINOR_MAJ7);
  GGmMaj7 = fromRootVoicing(P.GG, SEVENTH_MINOR_MAJ7);
  AmMaj7 = fromRootVoicing(P.A, SEVENTH_MINOR_MAJ7);
  AAmMaj7 = fromRootVoicing(P.AA, SEVENTH_MINOR_MAJ7);
  BmMaj7 = fromRootVoicing(P.B, SEVENTH_MINOR_MAJ7);
  Cm = fromRootVoicing(P.C, TRIAD_MINOR);
  CCm = fromRootVoicing(P.CC, TRIAD_MINOR);
  Dm = fromRootVoicing(P.D, TRIAD_MINOR);
  DDm = fromRootVoicing(P.DD, TRIAD_MINOR);
  Em = fromRootVoicing(P.E, TRIAD_MINOR);
  Fm = fromRootVoicing(P.F, TRIAD_MINOR);
  FFm = fromRootVoicing(P.FF, TRIAD_MINOR);
  Gm = fromRootVoicing(P.G, TRIAD_MINOR);
  GGm = fromRootVoicing(P.GG, TRIAD_MINOR);
  Am = fromRootVoicing(P.A, TRIAD_MINOR);
  AAm = fromRootVoicing(P.AA, TRIAD_MINOR);
  Bm = fromRootVoicing(P.B, TRIAD_MINOR);
  C7 = fromRootVoicing(P.C, SEVENTH);
  CC7 = fromRootVoicing(P.CC, SEVENTH);
  D7 = fromRootVoicing(P.D, SEVENTH);
  DD7 = fromRootVoicing(P.DD, SEVENTH);
  E7 = fromRootVoicing(P.E, SEVENTH);
  F7 = fromRootVoicing(P.F, SEVENTH);
  FF7 = fromRootVoicing(P.FF, SEVENTH);
  G7 = fromRootVoicing(P.G, SEVENTH);
  GG7 = fromRootVoicing(P.GG, SEVENTH);
  A7 = fromRootVoicing(P.A, SEVENTH);
  AA7 = fromRootVoicing(P.AA, SEVENTH);
  B7 = fromRootVoicing(P.B, SEVENTH);
  Cm7 = fromRootVoicing(P.C, SEVENTH_MINOR);
  CCm7 = fromRootVoicing(P.CC, SEVENTH_MINOR);
  Dm7 = fromRootVoicing(P.D, SEVENTH_MINOR);
  DDm7 = fromRootVoicing(P.DD, SEVENTH_MINOR);
  Em7 = fromRootVoicing(P.E, SEVENTH_MINOR);
  Fm7 = fromRootVoicing(P.F, SEVENTH_MINOR);
  FFm7 = fromRootVoicing(P.FF, SEVENTH_MINOR);
  Gm7 = fromRootVoicing(P.G, SEVENTH_MINOR);
  GGm7 = fromRootVoicing(P.GG, SEVENTH_MINOR);
  Am7 = fromRootVoicing(P.A, SEVENTH_MINOR);
  AAm7 = fromRootVoicing(P.AA, SEVENTH_MINOR);
  Bm7 = fromRootVoicing(P.B, SEVENTH_MINOR);
  CMaj13b5a9 = fromRootVoicing(P.C, THIRTEENTH_MAJ13_b5a9);
  CCMaj13b5a9 = fromRootVoicing(P.CC, THIRTEENTH_MAJ13_b5a9);
  DMaj13b5a9 = fromRootVoicing(P.D, THIRTEENTH_MAJ13_b5a9);
  DDMaj13b5a9 = fromRootVoicing(P.DD, THIRTEENTH_MAJ13_b5a9);
  EMaj13b5a9 = fromRootVoicing(P.E, THIRTEENTH_MAJ13_b5a9);
  FMaj13b5a9 = fromRootVoicing(P.F, THIRTEENTH_MAJ13_b5a9);
  FFMaj13b5a9 = fromRootVoicing(P.FF, THIRTEENTH_MAJ13_b5a9);
  GMaj13b5a9 = fromRootVoicing(P.G, THIRTEENTH_MAJ13_b5a9);
  GGMaj13b5a9 = fromRootVoicing(P.GG, THIRTEENTH_MAJ13_b5a9);
  AMaj13b5a9 = fromRootVoicing(P.A, THIRTEENTH_MAJ13_b5a9);
  AAMaj13b5a9 = fromRootVoicing(P.AA, THIRTEENTH_MAJ13_b5a9);
  BMaj13b5a9 = fromRootVoicing(P.A, THIRTEENTH_MAJ13_b5a9);
  C13b5a9 = fromRootVoicing(P.C, THIRTEENTH_b5a9);
  CC13b5a9 = fromRootVoicing(P.CC, THIRTEENTH_b5a9);
  D13b5a9 = fromRootVoicing(P.D, THIRTEENTH_b5a9);
  DD13b5a9 = fromRootVoicing(P.DD, THIRTEENTH_b5a9);
  E13b5a9 = fromRootVoicing(P.E, THIRTEENTH_b5a9);
  F13b5a9 = fromRootVoicing(P.F, THIRTEENTH_b5a9);
  FF13b5a9 = fromRootVoicing(P.FF, THIRTEENTH_b5a9);
  G13b5a9 = fromRootVoicing(P.G, THIRTEENTH_b5a9);
  GG13b5a9 = fromRootVoicing(P.GG, THIRTEENTH_b5a9);
  A13b5a9 = fromRootVoicing(P.A, THIRTEENTH_b5a9);
  AA13b5a9 = fromRootVoicing(P.AA, THIRTEENTH_b5a9);
  B13b5a9 = fromRootVoicing(P.A, THIRTEENTH_b5a9);
  C9 = fromRootVoicing(P.C, NINTH);
  CC9 = fromRootVoicing(P.CC, NINTH);
  D9 = fromRootVoicing(P.D, NINTH);
  DD9 = fromRootVoicing(P.DD, NINTH);
  E9 = fromRootVoicing(P.E, NINTH);
  F9 = fromRootVoicing(P.F, NINTH);
  FF9 = fromRootVoicing(P.FF, NINTH);
  G9 = fromRootVoicing(P.G, NINTH);
  GG9 = fromRootVoicing(P.GG, NINTH);
  A9 = fromRootVoicing(P.A, NINTH);
  AA9 = fromRootVoicing(P.AA, NINTH);
  B9 = fromRootVoicing(P.B, NINTH);

  Caug = fromRootVoicing(P.C, TRIAD_AUGMENTED);
  CCaug = fromRootVoicing(P.CC, TRIAD_AUGMENTED);
  Daug = fromRootVoicing(P.D, TRIAD_AUGMENTED);
  DDaug = fromRootVoicing(P.DD, TRIAD_AUGMENTED);
  Eaug = fromRootVoicing(P.E, TRIAD_AUGMENTED);
  Faug = fromRootVoicing(P.F, TRIAD_AUGMENTED);
  FFaug = fromRootVoicing(P.FF, TRIAD_AUGMENTED);
  Gaug = fromRootVoicing(P.G, TRIAD_AUGMENTED);
  GGaug = fromRootVoicing(P.GG, TRIAD_AUGMENTED);
  Aaug = fromRootVoicing(P.A, TRIAD_AUGMENTED);
  AAaug = fromRootVoicing(P.AA, TRIAD_AUGMENTED);
  Baug = fromRootVoicing(P.B, TRIAD_AUGMENTED);

  ALL = calcAll();
  ALL_NON_INVERSIONS = calculateAllNonInversions();
}

function calculateAllNonInversions(): ChordArray {
  const { COMMON_NON_INVERSIONS: VOICINGS_ALL_NON_INVERSIONS } = V;
  const ret: ChordArray = [] as any;

  for (const voicing of VOICINGS_ALL_NON_INVERSIONS) {
    for (const pitch of P.ALL) {
      const chord = fromRootVoicing(pitch, voicing);

      ret.push(chord);
    }
  }

  return ret;
}

function calcAll(): ChordArray {
  const { COMMON_NON_INVERSIONS: VOICINGS_ALL_NON_INVERSIONS } = V;
  const set = new Set<Chord>();

  for (const voicing of VOICINGS_ALL_NON_INVERSIONS) {
    for (const pitch of P.ALL) {
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
