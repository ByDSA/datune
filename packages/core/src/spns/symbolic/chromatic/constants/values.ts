import { Pitches as P } from "pitches/chromatic";
import { Spn } from "../Spn";

export function initializeValues() {
  // El negativo es por compatibilidad con MidiPitch
  C_S1 = new (Spn as any)( {
    pitch: P.C,
    octave: -1,
  } );
  CC_S1 = new (Spn as any)( {
    pitch: P.CC,
    octave: -1,
  } );
  D_S1 = new (Spn as any)( {
    pitch: P.D,
    octave: -1,
  } );
  DD_S1 = new (Spn as any)( {
    pitch: P.DD,
    octave: -1,
  } );
  E_S1 = new (Spn as any)( {
    pitch: P.E,
    octave: -1,
  } );
  F_S1 = new (Spn as any)( {
    pitch: P.F,
    octave: -1,
  } );
  FF_S1 = new (Spn as any)( {
    pitch: P.FF,
    octave: -1,
  } );
  G_S1 = new (Spn as any)( {
    pitch: P.G,
    octave: -1,
  } );
  GG_S1 = new (Spn as any)( {
    pitch: P.GG,
    octave: -1,
  } );
  A_S1 = new (Spn as any)( {
    pitch: P.A,
    octave: -1,
  } );
  AA_S1 = new (Spn as any)( {
    pitch: P.AA,
    octave: -1,
  } );
  B_S1 = new (Spn as any)( {
    pitch: P.B,
    octave: -1,
  } );
  C0 = new (Spn as any)( {
    pitch: P.C,
    octave: 0,
  } );
  CC0 = new (Spn as any)( {
    pitch: P.CC,
    octave: 0,
  } );
  D0 = new (Spn as any)( {
    pitch: P.D,
    octave: 0,
  } );
  DD0 = new (Spn as any)( {
    pitch: P.DD,
    octave: 0,
  } );
  E0 = new (Spn as any)( {
    pitch: P.E,
    octave: 0,
  } );
  F0 = new (Spn as any)( {
    pitch: P.F,
    octave: 0,
  } );
  FF0 = new (Spn as any)( {
    pitch: P.FF,
    octave: 0,
  } );
  G0 = new (Spn as any)( {
    pitch: P.G,
    octave: 0,
  } );
  GG0 = new (Spn as any)( {
    pitch: P.GG,
    octave: 0,
  } );
  A0 = new (Spn as any)( {
    pitch: P.A,
    octave: 0,
  } );
  AA0 = new (Spn as any)( {
    pitch: P.AA,
    octave: 0,
  } );
  B0 = new (Spn as any)( {
    pitch: P.B,
    octave: 0,
  } );
  C1 = new (Spn as any)( {
    pitch: P.C,
    octave: 1,
  } );
  CC1 = new (Spn as any)( {
    pitch: P.CC,
    octave: 1,
  } );
  D1 = new (Spn as any)( {
    pitch: P.D,
    octave: 1,
  } );
  DD1 = new (Spn as any)( {
    pitch: P.DD,
    octave: 1,
  } );
  E1 = new (Spn as any)( {
    pitch: P.E,
    octave: 1,
  } );
  F1 = new (Spn as any)( {
    pitch: P.F,
    octave: 1,
  } );
  FF1 = new (Spn as any)( {
    pitch: P.FF,
    octave: 1,
  } );
  G1 = new (Spn as any)( {
    pitch: P.G,
    octave: 1,
  } );
  GG1 = new (Spn as any)( {
    pitch: P.GG,
    octave: 1,
  } );
  A1 = new (Spn as any)( {
    pitch: P.A,
    octave: 1,
  } );
  AA1 = new (Spn as any)( {
    pitch: P.AA,
    octave: 1,
  } );
  B1 = new (Spn as any)( {
    pitch: P.B,
    octave: 1,
  } );
  C2 = new (Spn as any)( {
    pitch: P.C,
    octave: 2,
  } );
  CC2 = new (Spn as any)( {
    pitch: P.CC,
    octave: 2,
  } );
  D2 = new (Spn as any)( {
    pitch: P.D,
    octave: 2,
  } );
  DD2 = new (Spn as any)( {
    pitch: P.DD,
    octave: 2,
  } );
  E2 = new (Spn as any)( {
    pitch: P.E,
    octave: 2,
  } );
  F2 = new (Spn as any)( {
    pitch: P.F,
    octave: 2,
  } );
  FF2 = new (Spn as any)( {
    pitch: P.FF,
    octave: 2,
  } );
  G2 = new (Spn as any)( {
    pitch: P.G,
    octave: 2,
  } );
  GG2 = new (Spn as any)( {
    pitch: P.GG,
    octave: 2,
  } );
  A2 = new (Spn as any)( {
    pitch: P.A,
    octave: 2,
  } );
  AA2 = new (Spn as any)( {
    pitch: P.AA,
    octave: 2,
  } );
  B2 = new (Spn as any)( {
    pitch: P.B,
    octave: 2,
  } );
  C3 = new (Spn as any)( {
    pitch: P.C,
    octave: 3,
  } );
  CC3 = new (Spn as any)( {
    pitch: P.CC,
    octave: 3,
  } );
  D3 = new (Spn as any)( {
    pitch: P.D,
    octave: 3,
  } );
  DD3 = new (Spn as any)( {
    pitch: P.DD,
    octave: 3,
  } );
  E3 = new (Spn as any)( {
    pitch: P.E,
    octave: 3,
  } );
  F3 = new (Spn as any)( {
    pitch: P.F,
    octave: 3,
  } );
  FF3 = new (Spn as any)( {
    pitch: P.FF,
    octave: 3,
  } );
  G3 = new (Spn as any)( {
    pitch: P.G,
    octave: 3,
  } );
  GG3 = new (Spn as any)( {
    pitch: P.GG,
    octave: 3,
  } );
  A3 = new (Spn as any)( {
    pitch: P.A,
    octave: 3,
  } );
  AA3 = new (Spn as any)( {
    pitch: P.AA,
    octave: 3,
  } );
  B3 = new (Spn as any)( {
    pitch: P.B,
    octave: 3,
  } );
  C4 = new (Spn as any)( {
    pitch: P.C,
    octave: 4,
  } );
  CC4 = new (Spn as any)( {
    pitch: P.CC,
    octave: 4,
  } );
  D4 = new (Spn as any)( {
    pitch: P.D,
    octave: 4,
  } );
  DD4 = new (Spn as any)( {
    pitch: P.DD,
    octave: 4,
  } );
  E4 = new (Spn as any)( {
    pitch: P.E,
    octave: 4,
  } );
  F4 = new (Spn as any)( {
    pitch: P.F,
    octave: 4,
  } );
  FF4 = new (Spn as any)( {
    pitch: P.FF,
    octave: 4,
  } );
  G4 = new (Spn as any)( {
    pitch: P.G,
    octave: 4,
  } );
  GG4 = new (Spn as any)( {
    pitch: P.GG,
    octave: 4,
  } );
  A4 = new (Spn as any)( {
    pitch: P.A,
    octave: 4,
  } );
  AA4 = new (Spn as any)( {
    pitch: P.AA,
    octave: 4,
  } );
  B4 = new (Spn as any)( {
    pitch: P.B,
    octave: 4,
  } );
  C5 = new (Spn as any)( {
    pitch: P.C,
    octave: 5,
  } );
  CC5 = new (Spn as any)( {
    pitch: P.CC,
    octave: 5,
  } );
  D5 = new (Spn as any)( {
    pitch: P.D,
    octave: 5,
  } );
  DD5 = new (Spn as any)( {
    pitch: P.DD,
    octave: 5,
  } );
  E5 = new (Spn as any)( {
    pitch: P.E,
    octave: 5,
  } );
  F5 = new (Spn as any)( {
    pitch: P.F,
    octave: 5,
  } );
  FF5 = new (Spn as any)( {
    pitch: P.FF,
    octave: 5,
  } );
  G5 = new (Spn as any)( {
    pitch: P.G,
    octave: 5,
  } );
  GG5 = new (Spn as any)( {
    pitch: P.GG,
    octave: 5,
  } );
  A5 = new (Spn as any)( {
    pitch: P.A,
    octave: 5,
  } );
  AA5 = new (Spn as any)( {
    pitch: P.AA,
    octave: 5,
  } );
  B5 = new (Spn as any)( {
    pitch: P.B,
    octave: 5,
  } );
  C6 = new (Spn as any)( {
    pitch: P.C,
    octave: 6,
  } );
  CC6 = new (Spn as any)( {
    pitch: P.CC,
    octave: 6,
  } );
  D6 = new (Spn as any)( {
    pitch: P.D,
    octave: 6,
  } );
  DD6 = new (Spn as any)( {
    pitch: P.DD,
    octave: 6,
  } );
  E6 = new (Spn as any)( {
    pitch: P.E,
    octave: 6,
  } );
  F6 = new (Spn as any)( {
    pitch: P.F,
    octave: 6,
  } );
  FF6 = new (Spn as any)( {
    pitch: P.FF,
    octave: 6,
  } );
  G6 = new (Spn as any)( {
    pitch: P.G,
    octave: 6,
  } );
  GG6 = new (Spn as any)( {
    pitch: P.GG,
    octave: 6,
  } );
  A6 = new (Spn as any)( {
    pitch: P.A,
    octave: 6,
  } );
  AA6 = new (Spn as any)( {
    pitch: P.AA,
    octave: 6,
  } );
  B6 = new (Spn as any)( {
    pitch: P.B,
    octave: 6,
  } );
  C7 = new (Spn as any)( {
    pitch: P.C,
    octave: 7,
  } );
  CC7 = new (Spn as any)( {
    pitch: P.CC,
    octave: 7,
  } );
  D7 = new (Spn as any)( {
    pitch: P.D,
    octave: 7,
  } );
  DD7 = new (Spn as any)( {
    pitch: P.DD,
    octave: 7,
  } );
  E7 = new (Spn as any)( {
    pitch: P.E,
    octave: 7,
  } );
  F7 = new (Spn as any)( {
    pitch: P.F,
    octave: 7,
  } );
  FF7 = new (Spn as any)( {
    pitch: P.FF,
    octave: 7,
  } );
  G7 = new (Spn as any)( {
    pitch: P.G,
    octave: 7,
  } );
  GG7 = new (Spn as any)( {
    pitch: P.GG,
    octave: 7,
  } );
  A7 = new (Spn as any)( {
    pitch: P.A,
    octave: 7,
  } );
  AA7 = new (Spn as any)( {
    pitch: P.AA,
    octave: 7,
  } );
  B7 = new (Spn as any)( {
    pitch: P.B,
    octave: 7,
  } );
  C8 = new (Spn as any)( {
    pitch: P.C,
    octave: 8,
  } );
  CC8 = new (Spn as any)( {
    pitch: P.CC,
    octave: 8,
  } );
  D8 = new (Spn as any)( {
    pitch: P.D,
    octave: 8,
  } );
  DD8 = new (Spn as any)( {
    pitch: P.DD,
    octave: 8,
  } );
  E8 = new (Spn as any)( {
    pitch: P.E,
    octave: 8,
  } );
  F8 = new (Spn as any)( {
    pitch: P.F,
    octave: 8,
  } );
  FF8 = new (Spn as any)( {
    pitch: P.FF,
    octave: 8,
  } );
  G8 = new (Spn as any)( {
    pitch: P.G,
    octave: 8,
  } );
  GG8 = new (Spn as any)( {
    pitch: P.GG,
    octave: 8,
  } );
  A8 = new (Spn as any)( {
    pitch: P.A,
    octave: 8,
  } );
  AA8 = new (Spn as any)( {
    pitch: P.AA,
    octave: 8,
  } );
  B8 = new (Spn as any)( {
    pitch: P.B,
    octave: 8,
  } );
  C9 = new (Spn as any)( {
    pitch: P.C,
    octave: 9,
  } );
  CC9 = new (Spn as any)( {
    pitch: P.CC,
    octave: 9,
  } );
  D9 = new (Spn as any)( {
    pitch: P.D,
    octave: 9,
  } );
  DD9 = new (Spn as any)( {
    pitch: P.DD,
    octave: 9,
  } );
  E9 = new (Spn as any)( {
    pitch: P.E,
    octave: 9,
  } );
  F9 = new (Spn as any)( {
    pitch: P.F,
    octave: 9,
  } );
  FF9 = new (Spn as any)( {
    pitch: P.FF,
    octave: 9,
  } );
  G9 = new (Spn as any)( {
    pitch: P.G,
    octave: 9,
  } );
  GG9 = new (Spn as any)( {
    pitch: P.GG,
    octave: 9,
  } );
  A9 = new (Spn as any)( {
    pitch: P.A,
    octave: 9,
  } );
  AA9 = new (Spn as any)( {
    pitch: P.AA,
    octave: 9,
  } );
  B9 = new (Spn as any)( {
    pitch: P.B,
    octave: 9,
  } );
}

export let C_S1: Spn;

export let CC_S1: Spn;

export let D_S1: Spn;

export let DD_S1: Spn;

export let E_S1: Spn;

export let F_S1: Spn;

export let FF_S1: Spn;

export let G_S1: Spn;

export let GG_S1: Spn;

export let A_S1: Spn;

export let AA_S1: Spn;

export let B_S1: Spn;

export let C0: Spn;

export let CC0: Spn;

export let D0: Spn;

export let DD0: Spn;

export let E0: Spn;

export let F0: Spn;

export let FF0: Spn;

export let G0: Spn;

export let GG0: Spn;

export let A0: Spn;

export let AA0: Spn;

export let B0: Spn;

export let C1: Spn;

export let CC1: Spn;

export let D1: Spn;

export let DD1: Spn;

export let E1: Spn;

export let F1: Spn;

export let FF1: Spn;

export let G1: Spn;

export let GG1: Spn;

export let A1: Spn;

export let AA1: Spn;

export let B1: Spn;

export let C2: Spn;

export let CC2: Spn;

export let D2: Spn;

export let DD2: Spn;

export let E2: Spn;

export let F2: Spn;

export let FF2: Spn;

export let G2: Spn;

export let GG2: Spn;

export let A2: Spn;

export let AA2: Spn;

export let B2: Spn;

export let C3: Spn;

export let CC3: Spn;

export let D3: Spn;

export let DD3: Spn;

export let E3: Spn;

export let F3: Spn;

export let FF3: Spn;

export let G3: Spn;

export let GG3: Spn;

export let A3: Spn;

export let AA3: Spn;

export let B3: Spn;

export let C4: Spn;

export let CC4: Spn;

export let D4: Spn;

export let DD4: Spn;

export let E4: Spn;

export let F4: Spn;

export let FF4: Spn;

export let G4: Spn;

export let GG4: Spn;

export let A4: Spn;

export let AA4: Spn;

export let B4: Spn;

export let C5: Spn;

export let CC5: Spn;

export let D5: Spn;

export let DD5: Spn;

export let E5: Spn;

export let F5: Spn;

export let FF5: Spn;

export let G5: Spn;

export let GG5: Spn;

export let A5: Spn;

export let AA5: Spn;

export let B5: Spn;

export let C6: Spn;

export let CC6: Spn;

export let D6: Spn;

export let DD6: Spn;

export let E6: Spn;

export let F6: Spn;

export let FF6: Spn;

export let G6: Spn;

export let GG6: Spn;

export let A6: Spn;

export let AA6: Spn;

export let B6: Spn;

export let C7: Spn;

export let CC7: Spn;

export let D7: Spn;

export let DD7: Spn;

export let E7: Spn;

export let F7: Spn;

export let FF7: Spn;

export let G7: Spn;

export let GG7: Spn;

export let A7: Spn;

export let AA7: Spn;

export let B7: Spn;

export let C8: Spn;

export let CC8: Spn;

export let D8: Spn;

export let DD8: Spn;

export let E8: Spn;

export let F8: Spn;

export let FF8: Spn;

export let G8: Spn;

export let GG8: Spn;

export let A8: Spn;

export let AA8: Spn;

export let B8: Spn;

export let C9: Spn;

export let CC9: Spn;

export let D9: Spn;

export let DD9: Spn;

export let E9: Spn;

export let F9: Spn;

export let FF9: Spn;

export let G9: Spn;

export let GG9: Spn;

export let A9: Spn;

export let AA9: Spn;

export let B9: Spn;
