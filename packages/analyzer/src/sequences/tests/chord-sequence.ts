import { Chord, Pitch } from "@datune/core";
import { Time } from "@datune/utils";
import { ChordSequence } from "sequences/ChordSequence";

export function expectChordSequence(cSeq: ChordSequence) {
  return {
    toHaveDuration(d: Time) {
      expect(cSeq.duration).toBe(d);
    },
    at(time: Time) {
      return {
        toHaveChord(chord: Chord | undefined) {
          const nodes = cSeq.get( {
            at: time,
          } );

          expect(nodes[0]?.event).toBe(chord);
        },
        toHavePitches(...pitches: Pitch[]) {
          const nodes = cSeq.get( {
            at: time,
          } );

          expect(new Set(nodes[0]?.event.pitches)).toEqual(new Set(pitches));
        },
      };
    },
    toHaveNodesLength(n: number) {
      expect(cSeq.nodes).toHaveLength(n);
    },
  };
}
