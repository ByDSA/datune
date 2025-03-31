import { Chord, Pitch } from "@datune/core";
import { Time } from "@datune/utils";
import { throwErrorPopStack } from "datils/errors";
import { ChordTimeline } from "timelines/ChordTimeline";

export function expectChordTimeline(cTl: ChordTimeline) {
  return {
    toHaveDuration(d: Time) {
      tryJestExpect(()=> expect(cTl.duration).toBe(d));
    },
    at(time: Time) {
      return {
        toHaveChord(chord: Chord | undefined) {
          const node = cTl.getAt(time);

          tryJestExpect(
            ()=>expect(node?.event).toBe(chord),
            (e1) => {
              const e = new Error("At: " + time + "\n\nExpected: " + e1.matcherResult.expected + "\nActual: " + e1.matcherResult.actual);

              return e;
            },
          );
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
  p: (jestError: JestError)=> Error = (e)=>e as any,
  extraLevels: number = 1,
) {
  try {
    f();
  } catch (e1: any) {
    if (!(e1 instanceof Error))
      throw e1;

    const e = p(e1 as unknown as JestError);

    throwErrorPopStack(e, 2 + extraLevels);
  }
}
