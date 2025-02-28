import { SPN } from "../SPN";
import { Pitches } from "pitches/chromatic";

export function initializeValues() {
  // El negativo es por compatibilidad con MidiPitch
  C_S1 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: -1,
  } );
  CC_S1 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: -1,
  } );
  D_S1 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: -1,
  } );
  DD_S1 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: -1,
  } );
  E_S1 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: -1,
  } );
  F_S1 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: -1,
  } );
  FF_S1 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: -1,
  } );
  G_S1 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: -1,
  } );
  GG_S1 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: -1,
  } );
  A_S1 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: -1,
  } );
  AA_S1 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: -1,
  } );
  B_S1 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: -1,
  } );
  C0 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 0,
  } );
  CC0 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 0,
  } );
  D0 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 0,
  } );
  DD0 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 0,
  } );
  E0 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 0,
  } );
  F0 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 0,
  } );
  FF0 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 0,
  } );
  G0 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 0,
  } );
  GG0 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 0,
  } );
  A0 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 0,
  } );
  AA0 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 0,
  } );
  B0 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 0,
  } );
  C1 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 1,
  } );
  CC1 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 1,
  } );
  D1 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 1,
  } );
  DD1 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 1,
  } );
  E1 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 1,
  } );
  F1 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 1,
  } );
  FF1 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 1,
  } );
  G1 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 1,
  } );
  GG1 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 1,
  } );
  A1 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 1,
  } );
  AA1 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 1,
  } );
  B1 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 1,
  } );
  C2 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 2,
  } );
  CC2 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 2,
  } );
  D2 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 2,
  } );
  DD2 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 2,
  } );
  E2 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 2,
  } );
  F2 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 2,
  } );
  FF2 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 2,
  } );
  G2 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 2,
  } );
  GG2 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 2,
  } );
  A2 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 2,
  } );
  AA2 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 2,
  } );
  B2 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 2,
  } );
  C3 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 3,
  } );
  CC3 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 3,
  } );
  D3 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 3,
  } );
  DD3 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 3,
  } );
  E3 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 3,
  } );
  F3 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 3,
  } );
  FF3 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 3,
  } );
  G3 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 3,
  } );
  GG3 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 3,
  } );
  A3 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 3,
  } );
  AA3 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 3,
  } );
  B3 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 3,
  } );
  C4 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 4,
  } );
  CC4 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 4,
  } );
  D4 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 4,
  } );
  DD4 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 4,
  } );
  E4 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 4,
  } );
  F4 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 4,
  } );
  FF4 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 4,
  } );
  G4 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 4,
  } );
  GG4 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 4,
  } );
  A4 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 4,
  } );
  AA4 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 4,
  } );
  B4 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 4,
  } );
  C5 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 5,
  } );
  CC5 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 5,
  } );
  D5 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 5,
  } );
  DD5 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 5,
  } );
  E5 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 5,
  } );
  F5 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 5,
  } );
  FF5 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 5,
  } );
  G5 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 5,
  } );
  GG5 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 5,
  } );
  A5 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 5,
  } );
  AA5 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 5,
  } );
  B5 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 5,
  } );
  C6 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 6,
  } );
  CC6 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 6,
  } );
  D6 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 6,
  } );
  DD6 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 6,
  } );
  E6 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 6,
  } );
  F6 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 6,
  } );
  FF6 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 6,
  } );
  G6 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 6,
  } );
  GG6 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 6,
  } );
  A6 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 6,
  } );
  AA6 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 6,
  } );
  B6 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 6,
  } );
  C7 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 7,
  } );
  CC7 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 7,
  } );
  D7 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 7,
  } );
  DD7 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 7,
  } );
  E7 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 7,
  } );
  F7 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 7,
  } );
  FF7 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 7,
  } );
  G7 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 7,
  } );
  GG7 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 7,
  } );
  A7 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 7,
  } );
  AA7 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 7,
  } );
  B7 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 7,
  } );
  C8 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 8,
  } );
  CC8 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 8,
  } );
  D8 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 8,
  } );
  DD8 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 8,
  } );
  E8 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 8,
  } );
  F8 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 8,
  } );
  FF8 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 8,
  } );
  G8 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 8,
  } );
  GG8 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 8,
  } );
  A8 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 8,
  } );
  AA8 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 8,
  } );
  B8 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 8,
  } );
  C9 = new (SPN as any)( {
    pitch: Pitches.C,
    octave: 9,
  } );
  CC9 = new (SPN as any)( {
    pitch: Pitches.CC,
    octave: 9,
  } );
  D9 = new (SPN as any)( {
    pitch: Pitches.D,
    octave: 9,
  } );
  DD9 = new (SPN as any)( {
    pitch: Pitches.DD,
    octave: 9,
  } );
  E9 = new (SPN as any)( {
    pitch: Pitches.E,
    octave: 9,
  } );
  F9 = new (SPN as any)( {
    pitch: Pitches.F,
    octave: 9,
  } );
  FF9 = new (SPN as any)( {
    pitch: Pitches.FF,
    octave: 9,
  } );
  G9 = new (SPN as any)( {
    pitch: Pitches.G,
    octave: 9,
  } );
  GG9 = new (SPN as any)( {
    pitch: Pitches.GG,
    octave: 9,
  } );
  A9 = new (SPN as any)( {
    pitch: Pitches.A,
    octave: 9,
  } );
  AA9 = new (SPN as any)( {
    pitch: Pitches.AA,
    octave: 9,
  } );
  B9 = new (SPN as any)( {
    pitch: Pitches.B,
    octave: 9,
  } );
}

export let C_S1: SPN;

export let CC_S1: SPN;

export let D_S1: SPN;

export let DD_S1: SPN;

export let E_S1: SPN;

export let F_S1: SPN;

export let FF_S1: SPN;

export let G_S1: SPN;

export let GG_S1: SPN;

export let A_S1: SPN;

export let AA_S1: SPN;

export let B_S1: SPN;

export let C0: SPN;

export let CC0: SPN;

export let D0: SPN;

export let DD0: SPN;

export let E0: SPN;

export let F0: SPN;

export let FF0: SPN;

export let G0: SPN;

export let GG0: SPN;

export let A0: SPN;

export let AA0: SPN;

export let B0: SPN;

export let C1: SPN;

export let CC1: SPN;

export let D1: SPN;

export let DD1: SPN;

export let E1: SPN;

export let F1: SPN;

export let FF1: SPN;

export let G1: SPN;

export let GG1: SPN;

export let A1: SPN;

export let AA1: SPN;

export let B1: SPN;

export let C2: SPN;

export let CC2: SPN;

export let D2: SPN;

export let DD2: SPN;

export let E2: SPN;

export let F2: SPN;

export let FF2: SPN;

export let G2: SPN;

export let GG2: SPN;

export let A2: SPN;

export let AA2: SPN;

export let B2: SPN;

export let C3: SPN;

export let CC3: SPN;

export let D3: SPN;

export let DD3: SPN;

export let E3: SPN;

export let F3: SPN;

export let FF3: SPN;

export let G3: SPN;

export let GG3: SPN;

export let A3: SPN;

export let AA3: SPN;

export let B3: SPN;

export let C4: SPN;

export let CC4: SPN;

export let D4: SPN;

export let DD4: SPN;

export let E4: SPN;

export let F4: SPN;

export let FF4: SPN;

export let G4: SPN;

export let GG4: SPN;

export let A4: SPN;

export let AA4: SPN;

export let B4: SPN;

export let C5: SPN;

export let CC5: SPN;

export let D5: SPN;

export let DD5: SPN;

export let E5: SPN;

export let F5: SPN;

export let FF5: SPN;

export let G5: SPN;

export let GG5: SPN;

export let A5: SPN;

export let AA5: SPN;

export let B5: SPN;

export let C6: SPN;

export let CC6: SPN;

export let D6: SPN;

export let DD6: SPN;

export let E6: SPN;

export let F6: SPN;

export let FF6: SPN;

export let G6: SPN;

export let GG6: SPN;

export let A6: SPN;

export let AA6: SPN;

export let B6: SPN;

export let C7: SPN;

export let CC7: SPN;

export let D7: SPN;

export let DD7: SPN;

export let E7: SPN;

export let F7: SPN;

export let FF7: SPN;

export let G7: SPN;

export let GG7: SPN;

export let A7: SPN;

export let AA7: SPN;

export let B7: SPN;

export let C8: SPN;

export let CC8: SPN;

export let D8: SPN;

export let DD8: SPN;

export let E8: SPN;

export let F8: SPN;

export let FF8: SPN;

export let G8: SPN;

export let GG8: SPN;

export let A8: SPN;

export let AA8: SPN;

export let B8: SPN;

export let C9: SPN;

export let CC9: SPN;

export let D9: SPN;

export let DD9: SPN;

export let E9: SPN;

export let F9: SPN;

export let FF9: SPN;

export let G9: SPN;

export let GG9: SPN;

export let A9: SPN;

export let AA9: SPN;

export let B9: SPN;
