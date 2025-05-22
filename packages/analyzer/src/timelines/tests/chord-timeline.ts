import { Chord, Pitch, PitchSets } from "@datune/core";
import { PitchArray } from "@datune/core";
import { Time } from "@datune/utils";
import { throwErrorPopStack } from "datils/errors";
import { ChordTimeline } from "timelines/ChordTimeline";

export function expectChord(chord: Chord) {
  return {
    toBe(c2: Chord) {
      tryJestExpect(
        ()=> {
          expectChord(chord).toHavePitches(...c2.pitches);

          expect(chord.pitches[chord.rootIndex]).toBe(c2.pitches[c2.rootIndex]);
        },
        () => {
          const e = new Error();

          e.message = "Expected: " + chord + "\nActual: " + c2;

          return e;
        },
      );
    },
    toHavePitches(...pitches: PitchArray) {
      tryJestExpect(
        () => expect(
          PitchSets.from(...chord.pitches),
        ).toBe(
          PitchSets.from(...pitches),
        ),
        (e1) => {
          const e = new Error("Expected: " + e1.matcherResult.expected.pitches + "\nActual: " + e1.matcherResult.actual.pitches);

          return e;
        },
      );
    },
    toHaveRootIndex(index: number) {
      tryJestExpect(() => expect(chord.rootIndex).toBe(index));
    },
  };
}

export function expectChordTimeline(cTl: ChordTimeline) {
  return {
    toHaveDuration(d: Time) {
      tryJestExpect(()=> expect(cTl.duration).toBe(d));
    },
    at(time: Time) {
      return {
        toHaveChord(chord: Chord | undefined) {
          const node = cTl.getAt(time);

          expectChord(chord!).toBe(node!.event);
        },
        toHavePitches(...pitches: Pitch[]) {
          const node = cTl.getAt(time);

          tryJestExpect(()=> expect(new Set(node?.event.pitches)).toEqual(new Set(pitches)));
        },
      };
    },
    toHaveNodesLength(n: number) {
      tryJestExpect(()=>expect(cTl.nodes).toHaveLength(n));
    },
  };
}

// TODO: mover a datils
type JestError<E=any, A=E> = {
  matcherResult: {
    expected: E;
    actual: A;
    message: string;
    name: string;
    pass: boolean;
  };
};

function tryJestExpect(
  f: ()=> void,
  p?: (jestError: JestError)=> Error,
  extraLevels: number = 1,
) {
  try {
    f();
  } catch (e1: any) {
    if (!(e1 instanceof Error))
      throw e1;

    const e = p?.(e1 as unknown as JestError) ?? e1;

    throwErrorPopStack(e, 2 + extraLevels);
  }
}
