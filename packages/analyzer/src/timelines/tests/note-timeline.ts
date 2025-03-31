import { Spn } from "@datune/core";
import { MidiTimeline } from "@datune/midi";
import { Time } from "@datune/utils";

export function expectMidiTimeline(midiTl: MidiTimeline) {
  return {
    toHaveDuration(d: Time) {
      expect(midiTl.duration).toBe(d);
    },
    at(time: Time) {
      return {
        toHaveSpn(spn: Spn) {
          const nodes = midiTl.getAt(time);
          const found = nodes.some(n=>n.event.pitch.spn === spn);

          expect(found).toBeTruthy();
        },
        toHaveSpns(...spns: Spn[]) {
          const nodes = midiTl.getAt(time);
          const found = spns.every(spn=>nodes.map(n=>n.event.pitch.spn).includes(spn));

          expect(found).toBeTruthy();
        },
        toHaveSpnsLength(n: number) {
          const nodes = midiTl.getAt(time);

          expect(nodes).toHaveLength(n);
        },
      };
    },
    toHaveNodesLength(n: number) {
      expect(midiTl.nodes).toHaveLength(n);
    },
  };
}
