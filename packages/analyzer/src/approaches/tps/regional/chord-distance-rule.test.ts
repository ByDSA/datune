import { Chords as C, Chord, Func, Funcs, Keys as K, Key, Pitches as P, Scales as S } from "@datune/core/alt";
import { calcI, regionalLevelChordDistanceRule } from "./chord-distance-rule";

type Case = {
  x: {
    chord: Chord;
    key: Key;
  };
  y: {
    chord: Chord;
    key: Key;
  };
  iExpected: number;
  jExpected: number;
  kExpected: number;
};
const cases: Case[] = [
  // Same region (i = 0):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.F,
      key: K.C,
    },
    iExpected: 0,
    jExpected: 1,
    kExpected: 4,
  },
  // Example p.61:
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.F,
      key: K.from(P.Ab, S.MAJOR),
    },
    iExpected: 4,
    jExpected: 1,
    kExpected: 8, // Not in the example
  },
  // p.61, Figure 2.18 a):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.G,
      key: K.C,
    },
    iExpected: 0,
    jExpected: 1,
    kExpected: 4,
  },
  // p.61, Figure 2.18 b):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.G,
      key: K.G,
    },
    iExpected: 1,
    jExpected: 1,
    kExpected: 5,
  },
  // p.61, Figure 2.18 c):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.A,
      key: K.Dm,
    },
    iExpected: 1,
    jExpected: 3,
    kExpected: 7,
  },
  // p.61, Figure 2.18 d):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.A,
      key: K.A,
    },
    iExpected: 3,
    jExpected: 3,
    kExpected: 8,
  },
  // p.62, Figure 2.19 a):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Dm,
      key: K.Dm,
    },
    iExpected: 1,
    jExpected: 2,
    kExpected: 7,
  },
  // p.62, Figure 2.19 b):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Em,
      key: K.Em,
    },
    iExpected: 1,
    jExpected: 3,
    kExpected: 5,
  },
  // p.62, Figure 2.19 c):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.B,
      key: K.Em,
    },
    iExpected: 1,
    jExpected: 2,
    kExpected: 8,
  },
  // p.62, Figure 2.19 d):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.F,
      key: K.F,
    },
    iExpected: 1,
    jExpected: 1,
    kExpected: 5,
  },
  // p.62, Figure 2.19 e):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.C7,
      key: K.F,
    },
    iExpected: 1,
    jExpected: 0,
    kExpected: 2,
  },
  // p.62, Figure 2.19 e) without 7:
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.C,
      key: K.F,
    },
    iExpected: 1,
    jExpected: 0,
    kExpected: 1,
  },
  // p.62, Figure 2.20 a):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Am,
      key: K.Am,
    },
    iExpected: 0,
    jExpected: 3,
    kExpected: 4,
  },
  // p.62, Figure 2.20 b):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Cm,
      key: K.Cm,
    },
    iExpected: 3,
    jExpected: 0,
    kExpected: 4,
  },
  // p.63, Figure 2.21 a):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Fm,
      key: K.C,
    },
    iExpected: 0,
    jExpected: 1,
    kExpected: 5,
  },
  // p.63, Figure 2.21 b):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.D7,
      key: K.G,
    },
    iExpected: 1,
    jExpected: 2,
    kExpected: 7,
  },
  // p.63, Figure 2.21 c):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.D7,
      key: K.C,
    },
    iExpected: 0,
    jExpected: 2,
    kExpected: 7,
  },
  // p.63, Figure 2.21 d):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      chord: C.Db,
      key: K.C,
    },
    iExpected: 0,
    jExpected: 2,
    kExpected: 8,
  },
  // p.63, Figure 2.21 e):
  {
    x: {
      chord: C.C,
      key: K.C,
    },
    y: {
      // p.63: "For the latter, following tradition (perhaps dubiously),
      // pc2 is assumed as the missing root; hence j=2"
      chord: C.fromPitches(P.FF, P.Ab, P.C).withRoot(P.D),
      key: K.C,
    },
    iExpected: 0,
    jExpected: 2,
    kExpected: 6,
  },
  // p.70, Figure 2.28 a):
  {
    x: {
      chord: C.Dm,
      key: K.Dm,
    },
    y: {
      chord: C.C,
      key: K.C,
    },
    iExpected: 1,
    jExpected: 2,
    kExpected: 7,
  },
  // p.70, Figure 2.28 b):
  {
    x: {
      chord: C.Em,
      key: K.Em,
    },
    y: {
      chord: C.FF,
      key: K.Bm,
    },
    iExpected: 1,
    jExpected: 2,
    kExpected: 8,
  },
  // Otros:
  {
    x: {
      chord: C.Em,
      key: K.Em,
    },
    y: {
      chord: C.E,
      key: K.E,
    },
    iExpected: 3,
    jExpected: 0,
    kExpected: 4,
  },
];

describe.each(cases)("regionalLevelChordDistanceRule", ( { x, y, iExpected, jExpected, kExpected } ) => {
  describe("(" + x.chord + " " + x.key + ") -> (" + y.chord + " " + y.key + ")", () => {
    describe("full distance", () => {
      const expected = iExpected + jExpected + kExpected;
      let actual = regionalLevelChordDistanceRule( {
        x,
        y,
      } );

      it("'i' result should be " + iExpected, () => {
        expect(actual.meta.i).toBe(iExpected);
      } );

      it("'j' result should be " + jExpected, () => {
        expect(actual.meta.j).toBe(jExpected);
      } );

      it("'k' result should be " + kExpected, () => {
        expect(actual.meta.k).toBe(kExpected);
      } );

      it("full result should be " + expected, () => {
        expect(actual.dist).toBe(expected);
      } );
    } );

    if (Math.random() > 1) {
      it("reversible distance", () => {
        const actualRight = regionalLevelChordDistanceRule( {
          x,
          y,
        } );
        const actualReversed = regionalLevelChordDistanceRule( {
          x: y,
          y: x,
        } );

        expect(actualReversed).toBe(actualRight);
      } );
    }
  } );
} );

const localFuncs = [
  // Major triads
  [Funcs.I, Funcs.I],
  [Funcs.I, Funcs.bII],
  [Funcs.I, Funcs.II],
  [Funcs.I, Funcs.bIII],
  [Funcs.I, Funcs.III],
  [Funcs.I, Funcs.IV],
  [Funcs.I, Funcs.bV],
  [Funcs.I, Funcs.V],
  [Funcs.I, Funcs.bVI],
  [Funcs.I, Funcs.VI],
  [Funcs.I, Funcs.bVII],
  [Funcs.I, Funcs.VII],
  // Minor triads
  [Funcs.I, Funcs.Im],
  [Funcs.I, Funcs.bIIm],
  [Funcs.I, Funcs.IIm],
  [Funcs.I, Funcs.bIIIm],
  [Funcs.I, Funcs.IIIm],
  [Funcs.I, Funcs.IVm],
  [Funcs.I, Funcs.bVm],
  [Funcs.I, Funcs.Vm],
  [Funcs.I, Funcs.bVIm],
  [Funcs.I, Funcs.VIm],
  [Funcs.I, Funcs.bVIIm],
  [Funcs.I, Funcs.VIIm],
  // Diminished triads
  [Funcs.I, Funcs.I0],
  [Funcs.I, Funcs.bII0],
  [Funcs.I, Funcs.II0],
  [Funcs.I, Funcs.bIII0],
  [Funcs.I, Funcs.III0],
  [Funcs.I, Funcs.IV0],
  [Funcs.I, Funcs.bV0],
  [Funcs.I, Funcs.V0],
  [Funcs.I, Funcs.bVI0],
  [Funcs.I, Funcs.VI0],
  [Funcs.I, Funcs.bVII0],
  [Funcs.I, Funcs.VII0],
  // Seventh
  [Funcs.I, Funcs.I7],
  [Funcs.I, Funcs.bII7],
  [Funcs.I, Funcs.II7],
  [Funcs.I, Funcs.bIII7],
  [Funcs.I, Funcs.III7],
  [Funcs.I, Funcs.IV7],
  [Funcs.I, Funcs.bV7],
  [Funcs.I, Funcs.V7],
  [Funcs.I, Funcs.bVI7],
  [Funcs.I, Funcs.VI7],
  [Funcs.I, Funcs.bVII7],
  [Funcs.I, Funcs.VII7],
  // Maj7
  [Funcs.I, Funcs.IMaj7],
  [Funcs.I, Funcs.bIIMaj7],
  [Funcs.I, Funcs.IIMaj7],
  [Funcs.I, Funcs.bIIIMaj7],
  [Funcs.I, Funcs.IIIMaj7],
  [Funcs.I, Funcs.IVMaj7],
  [Funcs.I, Funcs.bVMaj7],
  [Funcs.I, Funcs.VMaj7],
  [Funcs.I, Funcs.bVIMaj7],
  [Funcs.I, Funcs.VIMaj7],
  [Funcs.I, Funcs.bVIIMaj7],
  [Funcs.I, Funcs.VIIMaj7],
  // m7
  [Funcs.I, Funcs.Im7],
  [Funcs.I, Funcs.bIIm7],
  [Funcs.I, Funcs.IIm7],
  [Funcs.I, Funcs.bIIIm7],
  [Funcs.I, Funcs.IIIm7],
  [Funcs.I, Funcs.IVm7],
  [Funcs.I, Funcs.bVm7],
  [Funcs.I, Funcs.Vm7],
  [Funcs.I, Funcs.bVIm7],
  [Funcs.I, Funcs.VIm7],
  [Funcs.I, Funcs.bVIIm7],
  [Funcs.I, Funcs.VIIm7],
  // Triad augmented
  [Funcs.I, Funcs.Iaug],
  [Funcs.I, Funcs.bIIaug],
  [Funcs.I, Funcs.IIaug],
  [Funcs.I, Funcs.bIIIaug],
  [Funcs.I, Funcs.IIIaug],
  [Funcs.I, Funcs.IVaug],
  [Funcs.I, Funcs.bVaug],
  [Funcs.I, Funcs.Vaug],
  [Funcs.I, Funcs.bVIaug],
  [Funcs.I, Funcs.VIaug],
  [Funcs.I, Funcs.bVIIaug],
  [Funcs.I, Funcs.VIIaug],
  // Seventh sus4
  [Funcs.I, Funcs.I7SUS4],
  [Funcs.I, Funcs.bII7SUS4],
  [Funcs.I, Funcs.II7SUS4],
  [Funcs.I, Funcs.bIII7SUS4],
  [Funcs.I, Funcs.III7SUS4],
  [Funcs.I, Funcs.IV7SUS4],
  [Funcs.I, Funcs.bV7SUS4],
  [Funcs.I, Funcs.V7SUS4],
  [Funcs.I, Funcs.bVI7SUS4],
  [Funcs.I, Funcs.VI7SUS4],
  [Funcs.I, Funcs.bVII7SUS4],
  [Funcs.I, Funcs.VII7SUS4],
  // sus4
  [Funcs.I, Funcs.ISUS4],
  [Funcs.I, Funcs.bIISUS4],
  [Funcs.I, Funcs.IISUS4],
  [Funcs.I, Funcs.bIIISUS4],
  [Funcs.I, Funcs.IIISUS4],
  [Funcs.I, Funcs.IVSUS4],
  [Funcs.I, Funcs.bVSUS4],
  [Funcs.I, Funcs.VSUS4],
  [Funcs.I, Funcs.bVISUS4],
  [Funcs.I, Funcs.VISUS4],
  [Funcs.I, Funcs.bVIISUS4],
  [Funcs.I, Funcs.VIISUS4],
  // Power chords
  [Funcs.I, Funcs.I5],
  [Funcs.I, Funcs.bII5],
  [Funcs.I, Funcs.II5],
  [Funcs.I, Funcs.bIII5],
  [Funcs.I, Funcs.III5],
  [Funcs.I, Funcs.IV5],
  [Funcs.I, Funcs.bV5],
  [Funcs.I, Funcs.V5],
  [Funcs.I, Funcs.bVI5],
  [Funcs.I, Funcs.VI5],
  [Funcs.I, Funcs.bVII5],
  [Funcs.I, Funcs.VII5],
  // Seventh sus4 b9
  [Funcs.I, Funcs.I7SUS4b9],
  [Funcs.I, Funcs.bII7SUS4b9],
  [Funcs.I, Funcs.II7SUS4b9],
  [Funcs.I, Funcs.bIII7SUS4b9],
  [Funcs.I, Funcs.III7SUS4b9],
  [Funcs.I, Funcs.IV7SUS4b9],
  [Funcs.I, Funcs.bV7SUS4b9],
  [Funcs.I, Funcs.V7SUS4b9],
  [Funcs.I, Funcs.bVI7SUS4b9],
  [Funcs.I, Funcs.VI7SUS4b9],
  [Funcs.I, Funcs.bVII7SUS4b9],
  [Funcs.I, Funcs.VII7SUS4b9],
  // Sixth
  [Funcs.I, Funcs.I6],
  [Funcs.I, Funcs.bII6],
  [Funcs.I, Funcs.II6],
  [Funcs.I, Funcs.bIII6],
  [Funcs.I, Funcs.III6],
  [Funcs.I, Funcs.IV6],
  [Funcs.I, Funcs.bV6],
  [Funcs.I, Funcs.V6],
  [Funcs.I, Funcs.bVI6],
  [Funcs.I, Funcs.VI6],
  [Funcs.I, Funcs.bVII6],
  [Funcs.I, Funcs.VII6],
  // Minor sixth
  [Funcs.I, Funcs.Im6],
  [Funcs.I, Funcs.bIIm6],
  [Funcs.I, Funcs.IIm6],
  [Funcs.I, Funcs.bIIIm6],
  [Funcs.I, Funcs.IIIm6],
  [Funcs.I, Funcs.IVm6],
  [Funcs.I, Funcs.bVm6],
  [Funcs.I, Funcs.Vm6],
  [Funcs.I, Funcs.bVIm6],
  [Funcs.I, Funcs.VIm6],
  [Funcs.I, Funcs.bVIIm6],
  [Funcs.I, Funcs.VIIm6],
  // Seventh b5
  [Funcs.I, Funcs.Im7b5],
  [Funcs.I, Funcs.bIIm7b5],
  [Funcs.I, Funcs.IIm7b5],
  [Funcs.I, Funcs.bIIIm7b5],
  [Funcs.I, Funcs.IIIm7b5],
  [Funcs.I, Funcs.IVm7b5],
  [Funcs.I, Funcs.bVm7b5],
  [Funcs.I, Funcs.Vm7b5],
  [Funcs.I, Funcs.bVIm7b5],
  [Funcs.I, Funcs.VIm7b5],
  [Funcs.I, Funcs.bVIIm7b5],
  [Funcs.I, Funcs.VIIm7b5],
];

describe.each(localFuncs)("regionalLevelChordDistanceRule i=0", (fromF, toF) => {
  describe("(" + fromF.toString() + "/I) -> (" + toF.toString() + "/I)", () => {
    it("should have i = 0", () => {
      const { x, y } = genXY(fromF, toF);
      const i = calcI( {
        x,
        y,
      } );

      expect(i).toBe(0);
    } );
  } );
} );

describe.each(localFuncs)("regionalLevelChordDistanceRule no error", (fromF, toF) => {
  describe("(" + fromF.toString() + "/I) -> (" + toF.toString() + "/I)", () => {
    it("should not throw error", () => {
      const { x, y } = genXY(fromF, toF);

      expect(() => {
        regionalLevelChordDistanceRule( {
          x,
          y,
        } );
      } ).not.toThrow();
    } );
  } );
} );

function genXY(from: Func, to: Func) {
  const k = K.C;

  return {
    x: {
      chord: k.getChord(from),
      key: k,
    },
    y: {
      chord: k.getChord(to),
      key: k,
    },
  };
}
