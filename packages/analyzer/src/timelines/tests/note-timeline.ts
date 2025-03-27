import { Spn } from "@datune/core";
import { Time } from "@datune/utils";
import { NotesTimeline } from "timelines/NotesTimeline";

export function expectNoteTimeline(nTl: NotesTimeline) {
  return {
    toHaveDuration(d: Time) {
      expect(nTl.duration).toBe(d);
    },
    at(time: Time) {
      return {
        toHaveSpn(spn: Spn) {
          const nodes = nTl.getAt(time);
          const found = nodes.some(n=>n.event === spn);

          expect(found).toBeTruthy();
        },
        toHaveSpns(...spns: Spn[]) {
          const nodes = nTl.getAt(time);
          const found = spns.every(spn=>nodes.map(n=>n.event).includes(spn));

          expect(found).toBeTruthy();
        },
        toHaveSpnsLength(n: number) {
          const nodes = nTl.getAt(time);

          expect(nodes).toHaveLength(n);
        },
      };
    },
    toHaveNodesLength(n: number) {
      expect(nTl.nodes).toHaveLength(n);
    },
  };
}
