import { Time } from "@datune/utils";
import { deepCopy } from "datils/datatypes/objects";
import { intervalBetween } from "datils/math/intervals";
import { Spns } from "@datune/core";
import { stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { ChordTimeline, KeyTimeline, NotesTimeline } from "timelines";
import { Results } from "approaches/Results";
import { INITIAL_LISTENER, ListenerState } from "./Listener";
import { UpdateProcess } from "./UpdateProcess";

type Props = {
  notesTimeline: NotesTimeline;
  startTime?: Time;
  initialListener?: ListenerState;
};

export class Analyzer {
  notesTimeline: NotesTimeline;

  listenerState: ListenerState;

  currentTime: Time;

  step: Time = 10; // 10 ms

  results: Results;

  constructor(props: Props) {
    this.notesTimeline = props.notesTimeline;
    this.listenerState = props.initialListener ?? deepCopy(INITIAL_LISTENER);
    this.currentTime = props.startTime ?? -1;

    const seqProps = {
      cellSize: this.notesTimeline.cellSize,
      startTime: this.notesTimeline.startTime,
    };

    this.results = {
      beatTimeline: new NotesTimeline(seqProps),
      chordTimeline: new ChordTimeline(seqProps),
      keyTimeline: new KeyTimeline(seqProps),
    };
  }

  analyze() {
    for (this.currentTime = 0;
      this.currentTime <= this.notesTimeline.duration + this.step;
      this.currentTime += this.step)
      this.update();

    return this.results;
  }

  update() {
    this.#updateRelativeTimes();
    const previousTime = this.currentTime - this.step;
    const window = intervalBetween(previousTime, this.currentTime);
    const noteNodesWindow = this.notesTimeline.getAtInterval(window);
    const updater = new UpdateProcess( {
      windowNodes: noteNodesWindow,
      window,
      analyzer: this,
    } );

    updater.update();
  }

  addBeatAt(at: Time) {
    this.results.beatTimeline.add( {
      event: Spns.C4,
      interval: intervalBetween(at, at + this.step),
    } );
  }

  showListenerState() {
    console.log(this.currentTime, JSON.stringify(humanize(this.listenerState), null, 2));
  }

  #updateRelativeTimes() {
    if (this.listenerState.beat.last)
      this.listenerState.beat.last += this.step;

    if (this.listenerState.bar.last)
      this.listenerState.bar.last += this.step;

    if (this.listenerState.beat.next)
      this.listenerState.beat.next -= this.step;
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
