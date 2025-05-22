import { writeFile } from "node:fs/promises";
import { Time } from "@datune/utils";
import { deepCopy } from "datils/datatypes/objects";
import { Interval, intervalBetween } from "datils/math/intervals";
import { stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { MidiTimeline } from "@datune/midi";
import { ChordTimeline, KeyTimeline } from "timelines";
import { Results } from "approaches/Results";
import { GravitationTimeline } from "timelines/GravitationTimeline";
import { sortNodesByFrom } from "approaches/utils";
import { INITIAL_LISTENER, ListenerState } from "./Listener";
import { WindowProcess } from "./WindowProcess";
import { PerceptualTimeline } from "./PerceptualTimeline";
import { ChordsStep } from "./ChordsStep";
import { SequentialPointTimeline } from "./SequentialPointTimeline";

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

  #logs: {
    global: LogEntry[];
  };

  realtimeMidiNotesTimeline: MidiTimeline;

  realtimeChordTimeline: ChordTimeline;

  perceptualTimeline: PerceptualTimeline;

  chordsStep: ChordsStep;

  constructor(props: Props) {
    this.midiTimeline = props.midiTimeline;
    this.listenerState = props.initialListener ?? deepCopy(INITIAL_LISTENER);
    this.currentTime = props.startTime ?? -1;

    this.perceptualTimeline = new PerceptualTimeline( {
      step: this.step,
    } );

    this.chordsStep = new ChordsStep( {
      analyzer: this,
    } );

    const seqProps = {
      cellSize: this.midiTimeline.cellSize,
      startTime: this.midiTimeline.startTime,
    };

    this.realtimeMidiNotesTimeline = new MidiTimeline(seqProps),
    this.realtimeChordTimeline = new ChordTimeline(seqProps),
    this.results = {
      barTimeline: new SequentialPointTimeline(seqProps),
      beatTimeline: new SequentialPointTimeline(seqProps),
      chordTimeline: new ChordTimeline(seqProps),
      firstChordTimeline: new ChordTimeline(seqProps),
      keyTimeline: new KeyTimeline(seqProps),
      gravitationTimeline: new GravitationTimeline(seqProps),
    };

    this.#logs = {
      global: [],
    };
  }

  analyze() {
    for (this.currentTime = 0;
      this.currentTime <= this.midiTimeline.duration;
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
    // TODO: hack provisional!!!
    if ((at) % 500 !== 0)
      return;

    let msg = "Add beat at " + at;

    if (this.listenerState.beat.next !== undefined)
      msg += ` Expect next beat: ${this.currentWindow.to + this.listenerState.beat.next} (in ${this.listenerState.beat.next} ms)`;

    this.log(msg);
    this.results.beatTimeline.add( {
      event: null,
      time: at,
    } );
  }

  log(msg: string) {
    this.#logs.global.push( {
      at: this.currentWindow.to,
      message: msg,
    } );
  }

  async saveLogs() {
    const globalLogEntries = this.#logs.global.filter(l=>l.at >= 0);
    const data = globalLogEntries.map(l=>l.at + ": " + l.message).join("\n");

    await writeFile("tests/.log", data);
    const chordNodes = sortNodesByFrom([...this.results.chordTimeline.nodes]);
    const chordsData = chordNodes.map(n=>((((n.interval.from - 500) / 2000) + 1) + ": " + stringifyTimelineNode(n))).join("\n");

    await writeFile("tests/chords.log", chordsData);
    const firstChordNodes = sortNodesByFrom([...this.results.firstChordTimeline.nodes]);
    const firstChordsData = firstChordNodes.map(n=>((((n.interval.from - 500) / 2000) + 1) + ": " + stringifyTimelineNode(n))).join("\n");

    await writeFile("tests/first-chords.log", firstChordsData);
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

  if (listenerState.currentKeyNode)
    ret.currentKeyNode = stringifyTimelineNode(listenerState.currentKeyNode);

  return ret;
}
