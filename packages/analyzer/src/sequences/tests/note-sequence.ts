import { Spn } from "@datune/core";
import { Time } from "@datune/utils";
import { NotesSequence } from "sequences/NotesSequence";

export function expectNoteSequence(nSeq: NotesSequence) {
  return {
    toHaveDuration(d: Time) {
      expect(nSeq.duration).toBe(d);
    },
    at(time: Time) {
      return {
        toHaveSpn(spn: Spn) {
          const nodes = nSeq.get( {
            at: time,
          } );
          const found = nodes.some(n=>n.event === spn);

          expect(found).toBeTruthy();
        },
        toHaveSpns(...spns: Spn[]) {
          const nodes = nSeq.get( {
            at: time,
          } );
          const found = spns.every(spn=>nodes.map(n=>n.event).includes(spn));

          expect(found).toBeTruthy();
        },
        toHaveSpnsLength(n: number) {
          const nodes = nSeq.get( {
            at: time,
          } );

          expect(nodes).toHaveLength(n);
        },
      };
    },
    toHaveNodesLength(n: number) {
      expect(nSeq.nodes).toHaveLength(n);
    },
  };
}
