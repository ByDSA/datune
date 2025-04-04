import { Time } from "@datune/utils";
import { deepCopy } from "datils/datatypes/objects";
import { Interval, intervalBetween } from "datils/math/intervals";
import { Spns } from "@datune/core";
import { SequentialTimeline, stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { MidiTimeline } from "@datune/midi";
import { ChordTimeline, KeyTimeline, NotesTimeline } from "timelines";
import { Results } from "approaches/Results";
import { GravitationTimeline } from "timelines/GravitationTimeline";
import { INITIAL_LISTENER, ListenerState } from "./Listener";
import { WindowProcess } from "./WindowProcess";

type Props = {
  midiTimeline: MidiTimeline;
  startTime?: Time;
  initialListener?: ListenerState;
};
type LogEntry = {
  at: Time;
  message: string;
};

export class Analyzer {
  midiTimeline: MidiTimeline;

  listenerState: ListenerState;

  currentTime: Time;

  step: Time = 10; // 10 ms

  currentWindow!: Interval<Time>;

  results: Results;

  logEntries: LogEntry[] = [];

  constructor(props: Props) {
    this.midiTimeline = props.midiTimeline;
    this.listenerState = props.initialListener ?? deepCopy(INITIAL_LISTENER);
    this.currentTime = props.startTime ?? -1;

    const seqProps = {
      cellSize: this.midiTimeline.cellSize,
      startTime: this.midiTimeline.startTime,
    };

    this.results = {
      beatTimeline: new NotesTimeline(seqProps),
      readNotesTimeline: new MidiTimeline(seqProps),
      chordTimeline: new ChordTimeline(seqProps),
      keyTimeline: new KeyTimeline(seqProps),
      gravitationTimeline: new GravitationTimeline(seqProps),
      perceptualMidiTimeline: new SequentialTimeline(seqProps),
    };
  }

  analyze() {
    for (this.currentTime = 0;
      this.currentTime <= this.midiTimeline.duration + this.step;
      this.currentTime += this.step)
      this.update();

    return this.results;
  }

  update() {
    this.#updateRelativeTimes();
    const previousTime = this.currentTime - this.step;
    const windowInterval = intervalBetween(previousTime, this.currentTime);

    this.currentWindow = windowInterval;

    const updater = new WindowProcess( {
      interval: windowInterval,
      analyzer: this,
    } );

    updater.update();
  }

  addBeatAt(at: Time) {
    let msg = "Add beat at " + at;

    if (this.listenerState.bar.next !== undefined)
      msg += " Next bar: " + this.listenerState.bar.next;

    this.log(msg);
    this.results.beatTimeline.add( {
      event: Spns.C4,
      interval: intervalBetween(at, at + this.step),
    } );
  }

  log(msg: string) {
    this.logEntries.push( {
      at: this.currentWindow.to,
      message: msg,
    } );
  }

  showLog() {
    const logEntries = this.logEntries.filter(l=>l.at < 8000);

    console.log(logEntries.map(l=>l.at + ": " + l.message).join("\n"));
  }

  showListenerState() {
    console.log(this.currentTime, JSON.stringify(humanize(this.listenerState), null, 2));
  }

  #updateRelativeTimes() {
    if (this.listenerState.beat.last !== undefined)
      this.listenerState.beat.last += this.step;

    if (this.listenerState.bar.last !== undefined)
      this.listenerState.bar.last += this.step;

    if (this.listenerState.beat.next !== undefined)
      this.listenerState.beat.next -= this.step;

    if (this.listenerState.bar.next !== undefined)
      this.listenerState.bar.next -= this.step;
  }
}

function humanize(listenerState: ListenerState) {
  const ret: Record<string, string> = {};

  if (listenerState.currentChordNode)
    ret.currentChordNode = stringifyTimelineNode(listenerState.currentChordNode);

  if (listenerState.currentKeyNode)
    ret.currentKeyNode = stringifyTimelineNode(listenerState.currentKeyNode);

  return ret;
}
