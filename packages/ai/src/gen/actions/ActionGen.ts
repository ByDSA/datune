import { MusicalDuration } from "@datune/core";
import { MidiTimelineNode, MidiNote, MidiTimelines as MT } from "@datune/midi";
import { ActionGenState } from "./ActionGenState";
import { ActionNote } from "./ActionNote";

type Node = MidiTimelineNode;

export class ActionGen extends ActionNote {
  private node: MidiTimelineNode | undefined;

  private last: MidiNote | null;

  private time: MusicalDuration;

  private i: number;

  constructor(possibilities: MidiNote[], private state: ActionGenState) {
    super(possibilities);
    this.i = state.i;
    this.last = state.lasts[this.i];
    this.time = state.times[this.i];
  }

  check(): boolean {
    const ret: boolean = true;

    // console.log(`check: ${this.state} ${this.node?.event} ${ret}`);
    return ret;
  }

  do(): boolean {
    let ok = false;

    do {
      ok = this.try();

      if (!ok)
        return false;

      if (this.check())
        break;
      else
        this.untry();
    // eslint-disable-next-line no-constant-condition
    } while (true);

    this.nextState();

    return true;
  }

  private nextState(): void {
    this.state.times[this.i] = <MusicalDuration> this.node?.interval.to;
    this.state.i = this.getLowerTimeI();
  }

  private getLowerTimeI(): number {
    return this.state.times.map((t, i) => ( {
      time: t,
      i,
    } )).sort((v1, v2) => {
      if (v1.time < v2.time)
        return -1;

      if (v1.time > v2.time)
        return 1;

      return 0;
    } )[0].i;
  }

  try(): boolean {
    const midiNote = this.picker.pickAndRemove();

    console.log(`try: ${this.state} ${midiNote} remainingPossibilities=${this.picker.possibilities.map(String)}`);

    if (!midiNote)
      return false;

    this.node = MT.nodeFrom( {
      note: midiNote,
      at: this.time,
    } );

    this.state.voices[this.state.i].notesTimeline.add(this.node);
    this.state.lasts[this.state.i] = midiNote;

    return true;
  }

  untry(): void {
    this.state.voices[this.state.i].notesTimeline.remove(<Node> this.node);
    this.node = undefined;
    this.state.lasts[this.state.i] = this.last;
    console.log("untry");
  }

  undo(): void {
    this.prevState();
  }

  private prevState(): void {
    this.state.times[this.i] = this.time;
  }
}
