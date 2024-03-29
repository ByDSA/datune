/* eslint-disable camelcase */
import { A as CC_A, AA as CC_AA, AAm as CC_AAm, Am as CC_Am, Am7 as CC_Am7, Asus4 as CC_Asus4, B as CC_B, B0 as CC_B0, Bm as CC_Bm, C as CC_C, CC as CC_CC, CCm as CC_CCm, Chord, Cm as CC_Cm, CMaj7 as CC_CMaj7, Csus2 as CC_Csus2, Csus4 as CC_Csus4, D as CC_D, DD as CC_DD, DDm as CC_DDm, Dm as CC_Dm, Dsus2 as CC_Dsus2, Dsus4 as CC_Dsus4, E as CC_E, Em as CC_Em, Em7 as CC_Em7, F as CC_F, FF as CC_FF, FFm as CC_FFm, Fm as CC_Fm, FMaj7 as CC_FMaj7, fromRootVoicing as CCFromRootVoicing, G as CC_G, G7 as CC_G7, GG as CC_GG, GGm as CC_GGm, Gm as CC_Gm, Gsus2 as CC_Gsus2, inv } from "chords/chromatic";
import { C as T_C, rootChord3, rootChord4 } from "keys/chromatic";
import { A as C_A, Array as ChromaticArray, B as C_B, D as C_D, E as C_E, F as C_F, G as C_G } from "pitches/chromatic";
import { A5, Array as SPNArray, B4, C5, C6, D5, E5, F5, G5, GG5, SPN } from "spns/chromatic";
import { TestInit } from "tests";
import { Array as VoicingArray, COMMON_TRIADS, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_SUS4, SIXTH_MINOR, TRIADS_MAJOR_MINOR, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } from "voicings/chromatic";
import { getAllInversions } from "voicings/relative/chromatic/utils";
import MotionCreator from "./MotionCreator";
import { transformToChordsRootPosition, transformToSPNArray } from "./result/MotionCreatorResultTransforms";

TestInit.loadAll();

const TRIADS_MAJOR_MINOR_ARRAY = [...TRIADS_MAJOR_MINOR] as VoicingArray;
const COMMON_TRIADS_ARRAY = [...COMMON_TRIADS] as VoicingArray;

it("C near Key.C", () => {
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

it("Csus4 resolution no key", () => {
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

it("Csus4 resolution in C", () => {
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

it("Bº resolution", () => {
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

it("C+ resolution", () => {
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

it("Bº resolution in Key C", () => {
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

it("Dm resolution in Key C (resting=root3) common triads", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord3(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("D5 note resolution in Key C (resting=root3)", () => {
  const fromNotes: SPNArray = [D5];
  const rootChord = rootChord3(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("C5 note resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [C5];
  const rootChord = rootChord4(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("D5 note resolution in Key C (resting=root4, maxStep=3)", () => {
  const fromNotes: SPNArray = [D5];
  const rootChord = rootChord4(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("Dm resolution in Key C (resting=root3) triads major minor", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord3(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("Dm resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [D5, F5, A5];
  const rootChord = rootChord4(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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

it("Dm7 resolution in Key C (resting=root4)", () => {
  const fromNotes: SPNArray = [D5, F5, A5, C6];
  const rootChord = rootChord4(T_C);
  const restingNotes: ChromaticArray = rootChord?.pitches as ChromaticArray;
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
