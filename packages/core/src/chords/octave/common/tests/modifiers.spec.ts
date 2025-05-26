import { TestCoreModule, testCoreModules } from "tests/testCoreModules";

describe.each(testCoreModules)("modifiers", (obj)=>{
  testsBass(obj);
  testsInversions(obj);
  testsShift(obj);
  testsRoots(obj);
  testsRemove(obj);
} );

function testsBass(obj: TestCoreModule) {
  const { Chords: C, Pitches: P, type: moduleType } = obj;

  describe.each([
    [C.C, P.C, C.C],
    [C.C, P.E, C.C.withInv()],
    [C.C, P.G, C.C.withInv(2)],
    [C.C, P.B, C.CMaj7.withInv(3)],
    [C.C, P.D, C.fromPitches(P.D, P.C, P.E, P.G).withRoot(P.C)],
    [C.C, P.A, C.fromPitches(P.A, P.C, P.E, P.G).withRoot(P.C)],
  ])(moduleType + ": bass", (chordInitial, newBass, expectedChord) => {
    const expectedPs = expectedChord.pitchSet;

    describe.each([
      ["withBass", (c: typeof chordInitial, pitch: typeof newBass) => c.withBass(pitch)],
      ["bass", (c: typeof chordInitial, pitch: typeof newBass) => C.bass(c, pitch)],
    ])("using %s", (_methodName, method) => {
      const actual = method(chordInitial, newBass);
      const actualPs = actual.pitchSet;

      it("should add bass in pitches", ()=> {
        expect(actual.pitches.includes(newBass)).toBeTruthy();
      } );

      it("should to be in chord", () => {
        expect(actual.has(newBass)).toBeTruthy();
        expect(actualPs).toBe(expectedPs);
      } );

      it("should to be in pitchset", () => {
        expect(actualPs.has(newBass)).toBeTruthy();
      } );
    } );
  } );

  it(moduleType + ": bass pitchset is the same chord as bass in pitchset", () => {
    const newBass = P.D;
    const c1 = C.C.withBass(newBass);
    const c2 = C.fromPitches(...C.C.pitches, newBass).withBass(newBass);

    expect(c1).toBe(c2);
  } );

  it(moduleType + ": same chord adding bass which is not in previous chord", () => {
    const pitchBass = P.D;
    const c1 = C.C.withBass(pitchBass);
    const c2 = C.fromPitches(...C.C.pitches, pitchBass).withBass(pitchBass);

    expect(c1).toBe(c2);
  } );
}

function testsInversions(obj: TestCoreModule) {
  const { Chords: C, Voicings: V, type: moduleType } = obj;

  describe.each([
    [C.C, V.TRIAD_MAJOR],
    [C.Am, V.TRIAD_MINOR],
    [C.CMaj7, V.SEVENTH_MAJ7],
  ])(moduleType + ": inversions", (chord, expectedVoicing) => {
    describe.each([
      ["withInv", (c: typeof chord, n: number) => c.withInv(n)],
      ["inv", (c: typeof chord, n: number) => C.inv(c, n)],
    ])("using %s", (methodName, method) => {
      it(`${chord} should have as voicing: ${expectedVoicing}`, () => {
        expect(chord.toRootVoicing()).toBe(expectedVoicing);
      } );

      it(`${methodName} should maintain the same root voicing`, () => {
        const originalVoicing = chord.toRootVoicing();

        for (let i = 1; i < chord.size; i++)
          expect(method(chord, i).toRootVoicing()).toBe(originalVoicing);
      } );

      it(`${methodName} should keep the chord root => ${chord.root}`, () => {
        for (let i = 1; i < chord.size; i++)
          expect(chord.root).toBe(method(chord, i).root);
      } );

      it("should get the same chord after n=size inversions", () => {
        const expected = chord;
        const actual = chord.withInv(chord.size);

        expect(actual).toBe(expected);
      } );
    } );

    it("should withInv and inv return same result", () => {
      for (let n = 0; n < chord.size; n++) {
        const expected = C.inv(chord, n);
        const actual = chord.withInv(n);

        expect(actual).toBe(expected);
      }
    } );
  } );
}

function testsShift(obj: TestCoreModule) {
  const { Chords: C, Intervals: I, type: moduleType, Pitches: P, Voicings: V } = obj;

  describe.each([
    ["shift", (c: typeof C.C7, n: number) => C.shift(c, n)],
    ["withShift", (c: typeof C.C7, n: number) => c.withShift(n)],
  ])(moduleType + ": shift using %s", (_methodName, method) => {
    it("c7 + M2 = D7", () => {
      const actual = method(C.C7, I.M2);
      const expected = C.D7;

      expect(actual).toBe(expected);
    } );

    it("c7 + (-1) = B7", () => {
      const actual = method(C.C7, I.neg(I.m2));
      const expected = C.B7;

      expect(actual).toBe(expected);
    } );
  } );

  describe.each([
    ["shiftDown", (c: typeof C.C7, n: number) => C.shiftDown(c, n)],
    ["withShiftDown", (c: typeof C.C7, n: number) => c.withShiftDown(n)],
  ])(moduleType + ": shift using %s", (_methodName, method) => {
    it("c7 - 1 = B7", () => {
      const actual = method(C.C7, I.m2);
      const expected = C.B7;

      expect(actual).toBe(expected);
    } );

    it("c7 - M2 = Bb7", () => {
      const actual = method(C.C7, I.M2);
      const expected = C.fromRootVoicing(P.Bb, V.SEVENTH);

      expect(actual).toBe(expected);
    } );
  } );
}

function testsRoots(obj: TestCoreModule) {
  const { Chords: C, Pitches: P, type: moduleType } = obj;

  describe.each([
    ["root", (c: typeof C.C, p: typeof P.C) => C.root(c, p)],
    ["withRoot", (c: typeof C.C, p: typeof P.C) => c.withRoot(p)],
  ])(moduleType + ": remove using %s", (_methodName, method) => {
    describe.each([
      [C.C, P.D],
    ])("for chord with root not in chord", (chordInitial, root) => {
      const actual = method(chordInitial, root);

      it("should not have new root " + root + " in chord", () => {
        expect(actual.has(root)).toBeFalsy();
      } );

      it("should not have new root " + root + " in pitch set", () => {
        expect(actual.pitchSet.has(root)).toBeFalsy();
      } );

      it("should not have new root " + root + " in pitches", () => {
        expect(actual.pitches.includes(root)).toBeFalsy();
      } );
    } );
  } );
}

function testsRemove(obj: TestCoreModule) {
  const { Chords: C, Pitches: P, type: moduleType } = obj;

  describe.each([
    [C.C, P.E, C.C5],
    [C.C, P.D, C.C],
  ])("remove tests", (original, pitch, expected) => {
    describe.each([
      ["remove", (c: typeof original, p: typeof pitch) => C.remove(c, p)],
      ["withRemove", (c: typeof original, p: typeof pitch) => c.withRemove(p)],
    ])(moduleType + ": remove using %s", (_methodName, method) => {
      const actual = method(original, pitch);

      it(`should chord has not the pitch ${pitch}`, () => {
        expect(actual.has(pitch)).toBeFalsy();
      } );

      it("should chord to be as expected", () => {
        expect(actual).toBe(expected);
      } );

      if (original.has(pitch)) {
        it("should new chord not to be the original", () => {
          expect(actual).not.toBe(original);
        } );
      } else {
        it("should new chord to be the original", () => {
          expect(actual).toBe(original);
        } );
      }
    } );
  } );
}
