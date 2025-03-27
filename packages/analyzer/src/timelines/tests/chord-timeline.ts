import { Chord, Pitch } from "@datune/core";
import { Time } from "@datune/utils";
import { ChordTimeline } from "timelines/ChordTimeline";

export function expectChordTimeline(cTl: ChordTimeline) {
  return {
    toHaveDuration(d: Time) {
      expect(cTl.duration).toBe(d);
    },
    at(time: Time) {
      return {
        toHaveChord(chord: Chord | undefined) {
          const node = cTl.getAt(time);

          expect(node?.event).toBe(chord);
        },
        toHavePitches(...pitches: Pitch[]) {
          const node = cTl.getAt(time);

          expect(new Set(node?.event.pitches)).toEqual(new Set(pitches));
        },
      };
    },
    toHaveNodesLength(n: number) {
      expect(cTl.nodes).toHaveLength(n);
    },
  };
}
