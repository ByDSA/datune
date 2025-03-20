/* eslint-disable camelcase */
import { Keys as K } from "@datune/core/keys/chromatic";
import { Pitches as P, PitchArray } from "@datune/core/pitches/chromatic";
import { Chords as C } from "@datune/core/chords/chromatic";
import { SpnArray, Spns as N } from "@datune/core/spns/chromatic";
import { VoicingArray, Voicings as V } from "@datune/core/voicings/chromatic";
import { getAllInversions } from "@datune/core/voicings/relative/chromatic/utils";
import { TestInit } from "tests";
import { createHasSomeVoicingFilter } from "voice-leading/appliers/processors/filters";
import { VoiceLeadings as VL } from "voice-leading";
import { generate } from "./VoiceLeading";
import { expectTargets, removeDuplicatedSpnArrays } from "./tests/targets";

TestInit.loadAll();
const { rootChord3, rootChord4 } = K;
const { A5, B4, C5, C6, D5, E5, F5, G5, GG5 } = N;
// eslint-disable-next-line max-len, @typescript-eslint/naming-convention
const { COMMON_TRIADS, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_SUS4, SIXTH_MINOR, TRIADS_MAJOR_MINOR, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = V;
const TRIADS_MAJOR_MINOR_ARRAY = [...TRIADS_MAJOR_MINOR] as VoicingArray;
const COMMON_TRIADS_ARRAY = [...COMMON_TRIADS] as VoicingArray;

it("voice leading C (default=near)", () => {
  const base: SpnArray = [C5, E5, G5];
  const result = generate(base);

  expect(result.meta.combinerResult.combinations).toHaveLength((5 * 5 * 5) - 1);
  expect(result.targets).toHaveLength(104); // Quitando voice crossing y overlapping
} );

it("voice leading C (near + voice filters off)", () => {
  const base: SpnArray = [C5, E5, G5];
  const result = generate(base, {
    combinationApplierConfig: {
      voiceCrossing: true,
      voiceOverlapping: true,
    },
  } );

  expect(result.targets).toHaveLength(
    result.meta.combinerResult.combinations.length,
  ); // (5 * 5 * 5) - 1
} );

it("voice leading C (near off) should be empty", () => {
  const base: SpnArray = [C5, E5, G5];
  const result = generate(base, {
    multipleGenConfig: {
      near: {
        enabled: false,
      },
    },
  } );

  expect(result.targets).toHaveLength(0);
} );

it("c near Key.C", () => {
  const base: SpnArray = [C5, E5, G5];
  const voicings = [
    ...getAllInversions(TRIAD_MAJOR),
    ...getAllInversions(TRIAD_MINOR),
    TRIAD_DIMINISHED,
  ] as VoicingArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
    },
    combinationApplierConfig: {
      voiceOverlapping: true,
      afterFilters: [
        createHasSomeVoicingFilter(...voicings),
      ],
    },
  } );
  const expected = [
    C.Dm,
    C.Em.withInv(2),
    C.F.withInv(2),
    C.G.withInv(),
    C.Am.withInv(),
    C.B0,
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("csus4 resolution no key", () => {
  const base: SpnArray = [C5, F5, G5];
  const result = generate(base, {
    multipleGenConfig: {
      voicingResolution: {
        required: true,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...TRIADS_MAJOR_MINOR_ARRAY),
      ],
    },
  } );
  const expected = [
    C.C,
    C.Cm,
    C.CC, // near +1, res 0, res +1
    C.Dm, // near +1, res 0, res +2
    C.DD.withInv(2),
    C.Em.withInv(2), // near -1, res -1, res 0
    C.F.withInv(2),
    C.Fm.withInv(2),
  ];

  expectTargets(result.targets).toContainChords(...expected);

  expect(result.targets).toHaveLength(8);
} );

it("csus4 resolution in C", () => {
  const base: SpnArray = [C5, F5, G5];
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      voicingResolution: {
        required: true,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...COMMON_TRIADS_ARRAY),
      ],
    },
  } );
  const expected = [
    C.C,
    C.Dm,
    C.Em.withInv(2),
    C.F.withInv(2),
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("bº resolution", () => {
  const base: SpnArray = [B4, D5, F5];
  const voicings: VoicingArray = [
    ...getAllInversions(TRIAD_MAJOR),
    ...getAllInversions(TRIAD_MINOR),
  ];
  const result = generate(base, {
    multipleGenConfig: {
      maxInterval: 3,
      voicingResolution: {
        required: true,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...voicings),
      ],
    },
  } );
  const expected = [
    C.Cm,
    C.C,
    C.FF.withInv(),
    C.DDm.withInv(2),
    C.DD.withInv(2),
    C.Gm.withInv(),
    C.FFm.withInv(),
    C.D.withInv(2),
    C.Am,
    C.A,
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("c+ resolution", () => {
  const base: SpnArray = [C5, E5, GG5];
  const result = generate(base, {
    multipleGenConfig: {
      voicingResolution: {
        required: true,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...TRIADS_MAJOR_MINOR_ARRAY),
      ],
    },
  } );
  const expected = [
    C.A.withInv(),
    C.Am.withInv(),
    C.AA.withInv(),
    C.AAm.withInv(),
    C.B,
    C.Bm,
    C.C,
    C.Cm,
    C.CC,
    C.CCm,
    C.D,
    C.Dm,
    C.DD.withInv(2),
    C.DDm.withInv(2),
    C.E.withInv(2),
    C.Em.withInv(2),
    C.F.withInv(2),
    C.Fm.withInv(2),
    C.FF.withInv(2),
    C.FFm.withInv(2),
    C.G.withInv(),
    C.Gm.withInv(),
    C.GG.withInv(),
    C.GGm.withInv(),
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("bº resolution in Key C", () => {
  const base: SpnArray = [B4, D5, F5];
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      voicingResolution: {
        required: true,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...COMMON_TRIADS_ARRAY),
      ],
    },
  } );
  const expected = [
    C.C,
    C.Am,
    C.Csus2,
    C.Asus4,
    C.Gsus2.withInv(), // Aquartal
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("dm resolution in Key C (resting=root3) common triads", () => {
  const base: SpnArray = [D5, F5, A5];
  const rootChord = rootChord3(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
    combinationApplierConfig: {
      voiceCrossing: true,
      voiceOverlapping: true,
      afterFilters: [
        createHasSomeVoicingFilter(...COMMON_TRIADS_ARRAY),
      ],
    },
  } );
  const expected = [
    C.Am.withInv(),
    C.C,
    C.Csus4,
    C.Dsus2,
    C.Dsus4,
    C.Em,
    C.F.withInv(2),
    C.G.withInv(2),
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("d5 note resolution in Key C (resting=root3)", () => {
  const base: SpnArray = [D5];
  const rootChord = rootChord3(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
  } );
  const expected = [
    [E5],
    [C5],
  ];

  expectTargets(result.targets).toEqualSpnsArray(expected);
} );

it("c5 note resolution in Key C (resting=root4)", () => {
  const base: SpnArray = [C5];
  const rootChord = rootChord4(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
  } );
  const expected = [
    [B4],
  ];

  expectTargets(result.targets).toEqualSpnsArray(expected);
} );

it("d5 note resolution in Key C (resting=root4, maxInterval=3)", () => {
  const base: SpnArray = [D5];
  const rootChord = rootChord4(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      maxInterval: 3,
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
  } );
  const expected = [
    [E5],
    [C5],
    [B4],
  ];

  expectTargets(result.targets).toEqualSpnsArray(expected);
} );

it("dm resolution in Key C (resting=root3) triads major minor", () => {
  const base: SpnArray = [D5, F5, A5];
  const rootChord = rootChord3(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...TRIADS_MAJOR_MINOR_ARRAY),
      ],
    },
  } );
  const expected = [
    C.C,
    C.Am.withInv(),
    C.F.withInv(2),
    C.G.withInv(2),
    C.Em,
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("dm resolution in Key C (resting=root4)", () => {
  const base: SpnArray = [D5, F5, A5];
  const rootChord = rootChord4(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const result = generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...TRIADS_MAJOR_MINOR_ARRAY),
      ],
    },
  } );
  const expected = [
    C.C,
    C.Am.withInv(),
    C.F.withInv(2),
    C.G.withInv(2),
    C.Em,
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("dm7 resolution in Key C (resting=root4 required, near=true)", () => {
  const base: SpnArray = [D5, F5, A5, C6];
  const rootChord = rootChord4(K.C);
  const restingPitches: PitchArray = rootChord?.pitches as PitchArray;
  const voicings: VoicingArray = [
    ...getAllInversions(SEVENTH),
    ...getAllInversions(SEVENTH_SUS4),
    ...getAllInversions(SEVENTH_MINOR),
    ...getAllInversions(SEVENTH_MINOR_b5),
    ...getAllInversions(SEVENTH_MAJ7),
    ...getAllInversions(SEVENTH_MAJ7_b5),
    ...getAllInversions(SEVENTH_MINOR_a5),
  ];
  const result = generate(base, {
    multipleGenConfig: {
      filters: [
        VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray),
      ],
      near: {
        enabled: true,
      },
      keyResolution: {
        required: true,
        restingPitches,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        createHasSomeVoicingFilter(...voicings),
      ],
    },
  } );
  const expected = [
    C.CMaj7,
    C.CMaj7.withInv(),
    C.Am7.withInv(2),
    C.FMaj7.withInv(3),
    C.Em7,
    C.Em7.withInv(3),
    C.fromRootVoicing(P.E, SEVENTH_SUS4).withInv(3),
    C.fromRootVoicing(P.B, SEVENTH_MINOR_a5).withInv(), // D6sus4
    C.G7.withInv(2),
    C.fromRootVoicing(P.D, SIXTH_MINOR), // Bm7b5/D
    C.fromRootVoicing(P.A, SEVENTH_SUS4).withInv(2),
    C.fromRootVoicing(P.F, SEVENTH_MAJ7_b5).withInv(3),
    C.fromRootVoicing(P.E, SEVENTH_MINOR_a5).withInv(3),
    C.fromRootVoicing(P.D, SEVENTH_SUS4),
    C.fromRootVoicing(P.G, SEVENTH_SUS4).withInv(2),
  ];

  expectTargets(result.targets).toEqualChords(expected);
} );

it("chord G resolution in C Major Key should not have duplicates", () => {
  const base = [N.G4, N.B4, N.D5] as SpnArray;
  const result = VL.generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      near: {
        enabled: false,
      },
      keyResolution: {
        restingPitches: rootChord3(K.C)?.pitches!,
      },
    },
  } );

  expect(removeDuplicatedSpnArrays(result.targets)).toHaveLength(result.targets.length);
} );

it("chord G7 resolution in C Major Key (near=false)", () => {
  const base = [N.G4, N.B4, N.D5, N.F5] as SpnArray;
  const result = VL.generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches as PitchArray)],
      near: {
        enabled: false,
      },
      keyResolution: {
        restingPitches: rootChord3(K.C)?.pitches!,
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        VL.Appliers.processors.createDisallowInnerVoicingsFilter(V.M2, V.m2),
      ],
    },
  } );

  expect(result.targets).toHaveLength(3);

  expectTargets(result.targets).toContainChords(
    C.fromPitches(...C.C.withInv(2).pitches, P.G), // G-C-E-G
    C.fromPitches(...C.Em.withInv().pitches, P.G), // G-B-E-G
    C.fromPitches(...C.G.pitches, P.G), // G-B-E-G
  );
} );

it("chord G7 (near=true, keyResolution=C, requireAnyResolution=true)", () => {
  const base = [N.G4, N.B4, N.D5, N.F5] as SpnArray;
  const result = VL.generate(base, {
    multipleGenConfig: {
      filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches)],
      requireAnyResolution: true,
      keyResolution: {
        restingPitches: [P.C, P.E, P.G],
      },
    },
    combinationApplierConfig: {
      afterFilters: [
        VL.Appliers.processors.createDisallowInnerVoicingsFilter(V.M2, V.m2, V.TRITONE, V.M7, V.m7),
      ],
    },
  } );

  expectTargets(result.targets).toContainChords(
    C.fromPitches(...C.C.withInv(2).pitches, P.G), // G-C-E-G
    C.fromPitches(P.G, ...C.Em.withInv(2).pitches), // G-B-E-G
    C.fromPitches(...C.G.pitches, P.G), // G-B-D-G
    C.fromPitches(P.F, ...C.F.withInv().pitches), // F-A-C-F
  );

  expect(result.targets).toHaveLength(4);
} );
