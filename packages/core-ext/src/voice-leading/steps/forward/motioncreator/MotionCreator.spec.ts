/* eslint-disable camelcase */
import { Keys } from "@datune/core/keys/chromatic";
import { Pitches, PitchArray } from "@datune/core/pitches/chromatic";
import { Chords, type Chord } from "@datune/core/chords/chromatic";
import { SPNArray, SPN, SPNs } from "@datune/core/spns/chromatic";
import { VoicingArray, Voicings } from "@datune/core/voicings/chromatic";
import { getAllInversions } from "@datune/core/voicings/relative/chromatic/utils";
import { transformToChordsRootPosition, transformToSPNArray } from "./result/MotionCreatorResultTransforms";
import { MotionCreator } from "./MotionCreator";
import { TestInit } from "tests";

TestInit.loadAll();
const { C: T_C, rootChord3, rootChord4 } = Keys;
const { A: C_A, B: C_B, D: C_D, E: C_E, F: C_F, G: C_G } = Pitches;
const { A5, B4, C5, C6, D5, E5, F5, G5, GG5 } = SPNs;
// eslint-disable-next-line max-len, @typescript-eslint/naming-convention
const { A: CC_A, AA: CC_AA, AAm: CC_AAm, Am: CC_Am, Am7: CC_Am7, Asus4: CC_Asus4, B: CC_B, B0: CC_B0, Bm: CC_Bm, C: CC_C, CC: CC_CC, CCm: CC_CCm, Cm: CC_Cm, CMaj7: CC_CMaj7, Csus2: CC_Csus2, Csus4: CC_Csus4, D: CC_D, DD: CC_DD, DDm: CC_DDm, Dm: CC_Dm, Dsus2: CC_Dsus2, Dsus4: CC_Dsus4, E: CC_E, Em: CC_Em, Em7: CC_Em7, F: CC_F, FF: CC_FF, FFm: CC_FFm, Fm: CC_Fm, FMaj7: CC_FMaj7, fromRootVoicing: CCFromRootVoicing, G: CC_G, G7: CC_G7, GG: CC_GG, GGm: CC_GGm, Gm: CC_Gm, Gsus2: CC_Gsus2, inv } = Chords;
// eslint-disable-next-line max-len, @typescript-eslint/naming-convention
const { COMMON_TRIADS, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_SUS4, SIXTH_MINOR, TRIADS_MAJOR_MINOR, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
const TRIADS_MAJOR_MINOR_ARRAY = [...TRIADS_MAJOR_MINOR] as VoicingArray;
const COMMON_TRIADS_ARRAY = [...COMMON_TRIADS] as VoicingArray;

it("c near Key.C", () => {
  const fromNotes: SPNArray = [C5, E5, G5];
  const voicings = <VoicingArray>[
    ...getAllInversions(TRIAD_MAJOR),
    ...getAllInversions(TRIAD_MINOR),
    TRIAD_DIMINISHED,
  ];
  const resolution = MotionCreator.create()
    .fromNotes(...fromNotes)
    .configApplier((applier) => applier.letVoiceOverlapping())
    .filterByVoicings(...voicings)
    .keysAll(T_C);
  const motionCreatorResults = resolution.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_Dm,
    inv(CC_Em, 2),
    inv(CC_F, 2),
    inv(CC_G),
    inv(CC_Am),
    CC_B0,
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("csus4 resolution no key", () => {
  const fromNotes: SPNArray = [C5, F5, G5];
  const resolution = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireVoicingResolution()
    .filterByVoicings(...TRIADS_MAJOR_MINOR_ARRAY);
  const motionCreatorResults = resolution.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_C,
    CC_Cm,
    CC_CC,
    CC_Dm,
    inv(CC_DD, 2),
    inv(CC_Em, 2),
    inv(CC_F, 2),
    inv(CC_Fm, 2),
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("csus4 resolution in C", () => {
  const fromNotes: SPNArray = [C5, F5, G5];
  const resolution = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireVoicingResolution()
    .filterByVoicings(...COMMON_TRIADS_ARRAY)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = resolution.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_C,
    CC_Dm,
    inv(CC_Em, 2),
    inv(CC_F, 2),
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("bº resolution", () => {
  const fromNotes: SPNArray = [B4, D5, F5];
  const voicings: VoicingArray = <VoicingArray>[
    ...getAllInversions(TRIAD_MAJOR),
    ...getAllInversions(TRIAD_MINOR),
  ];
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .maxStep(3)
    .requireVoicingResolution()
    .filterByVoicings(...voicings);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_Cm,
    CC_C,
    inv(CC_FF, 1),
    inv(CC_DDm, 2),
    inv(CC_DD, 2),
    inv(CC_Gm),
    inv(CC_FFm, 1),
    inv(CC_D, 2),
    CC_Am,
    CC_A,
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("c+ resolution", () => {
  const fromNotes: SPNArray = [C5, E5, GG5];
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireVoicingResolution()
    .filterByVoicings(...TRIADS_MAJOR_MINOR_ARRAY);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    inv(CC_A),
    inv(CC_Am),
    inv(CC_AA),
    inv(CC_AAm),
    CC_B,
    CC_Bm,
    CC_C,
    CC_Cm,
    CC_CC,
    CC_CCm,
    CC_D,
    CC_Dm,
    inv(CC_DD, 2),
    inv(CC_DDm, 2),
    inv(CC_E, 2),
    inv(CC_Em, 2),
    inv(CC_F, 2),
    inv(CC_Fm, 2),
    inv(CC_FF, 2),
    inv(CC_FFm, 2),
    inv(CC_G),
    inv(CC_Gm),
    inv(CC_GG),
    inv(CC_GGm),
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("bº resolution in Key C", () => {
  const fromNotes: SPNArray = [B4, D5, F5];
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireVoicingResolution()
    .filterByAnyKeys(T_C)
    .filterByVoicings(...COMMON_TRIADS_ARRAY);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_C,
    CC_Am,
    CC_Csus2,
    CC_Asus4,
    inv(CC_Gsus2), // Aquartal
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("dm resolution in Key C (resting=root3) common triads", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord3(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByVoicings(...COMMON_TRIADS_ARRAY)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    inv(CC_Am),
    CC_C,
    CC_Csus4,
    CC_Dsus2,
    CC_Dsus4,
    CC_Em,
    inv(CC_F, 2),
    inv(CC_G, 2),
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("d5 note resolution in Key C (resting=root3)", () => {
  const fromNotes: SPNArray = [D5];
  const rootChord = rootChord3(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
  const expected: SPN[][] = [
    [E5],
    [C5],
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("c5 note resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [C5];
  const rootChord = rootChord4(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
  const expected: SPN[][] = [
    [B4],
  ].sort();

  expect(actual.sort()).toEqual(expected.sort());
} );

it("d5 note resolution in Key C (resting=root4, maxStep=3)", () => {
  const fromNotes: SPNArray = [D5];
  const rootChord = rootChord4(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .maxStep(3)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
  const expected: SPN[][] = [
    [E5],
    [C5],
    [B4],
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("dm resolution in Key C (resting=root3) triads major minor", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord3(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByVoicings(...TRIADS_MAJOR_MINOR_ARRAY)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_C,
    inv(CC_Am),
    inv(CC_F, 2),
    inv(CC_G, 2),
    CC_Em,
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("dm resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord4(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByVoicings(...TRIADS_MAJOR_MINOR_ARRAY)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_C,
    inv(CC_Am),
    inv(CC_F, 2),
    inv(CC_G, 2),
    CC_Em,
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );

it("dm7 resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [D5, F5, A5, C6];
  const rootChord = rootChord4(T_C);
  const restingNotes: PitchArray = rootChord?.pitches as PitchArray;
  const voicings: VoicingArray = <VoicingArray>[
    ...getAllInversions(SEVENTH),
    ...getAllInversions(SEVENTH_SUS4),
    ...getAllInversions(SEVENTH_MINOR),
    ...getAllInversions(SEVENTH_MINOR_b5),
    ...getAllInversions(SEVENTH_MAJ7),
    ...getAllInversions(SEVENTH_MAJ7_b5),
    ...getAllInversions(SEVENTH_MINOR_a5),
  ];
  const motionCreator = MotionCreator.create()
    .fromNotes(...fromNotes)
    .requireRestingResolution()
    .restingNotes(...restingNotes)
    .filterByVoicings(...voicings)
    .filterByAnyKeys(T_C);
  const motionCreatorResults = motionCreator.calc();
  const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
  const expected: Chord[] = [
    CC_CMaj7,
    inv(CC_CMaj7),
    inv(CC_Am7, 2),
    inv(CC_FMaj7, 3),
    CC_Em7,
    inv(CC_Em7, 3),
    inv(CCFromRootVoicing(C_E, SEVENTH_SUS4), 3),
    inv(CCFromRootVoicing(C_B, SEVENTH_MINOR_a5)), // D6sus4
    inv(CC_G7, 2),
    CCFromRootVoicing(C_D, SIXTH_MINOR), // Bm7b5/D
    inv(CCFromRootVoicing(C_A, SEVENTH_SUS4), 2),
    inv(CCFromRootVoicing(C_F, SEVENTH_MAJ7_b5), 3),
    inv(CCFromRootVoicing(C_E, SEVENTH_MINOR_a5), 3),
    CCFromRootVoicing(C_D, SEVENTH_SUS4),
    inv(CCFromRootVoicing(C_G, SEVENTH_SUS4), 2),
  ];

  expect(actual.sort()).toEqual(expected.sort());
} );
