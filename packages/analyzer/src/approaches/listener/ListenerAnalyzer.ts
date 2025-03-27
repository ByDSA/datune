import { TemporalNode, Time } from "@datune/utils";
import { deepCopy } from "datils/datatypes/objects";
import { intervalBetween } from "datils/math/intervals";
import { Spns } from "@datune/core";
import { ChordSequence, KeySequence, NotesSequence } from "sequences";
import { Results } from "approaches/Results";
import { INITIAL_LISTENER, ListenerState } from "./Listener";
import { UpdateProcess } from "./UpdateProcess";

type Props = {
  notesSequence: NotesSequence;
  startTime?: Time;
  initialListener?: ListenerState;
};

export class Analyzer {
  notesSequence: NotesSequence;

  listenerState: ListenerState;

  currentTime: Time;

  step: Time = 10; // 10 ms

  results: Results;

  constructor(props: Props) {
    this.notesSequence = props.notesSequence;
    this.listenerState = props.initialListener ?? deepCopy(INITIAL_LISTENER);
    this.currentTime = props.startTime ?? -1;

    const seqProps = {
      cellsize: this.notesSequence.cellSize,
      startTime: this.notesSequence.startTime,
    };

    this.results = {
      beatSequence: new NotesSequence(seqProps),
      chordSequence: new ChordSequence(seqProps),
      keySequence: new KeySequence(seqProps),
    };
  }

  analyze() {
    for (this.currentTime = 0;
      this.currentTime <= this.notesSequence.duration + this.step;
      this.currentTime += this.step)
      this.update();

    return this.results;
  }

  update() {
    this.#updateRelativeTimes();
    const previousTime = this.currentTime - this.step;
    const window = intervalBetween(previousTime, this.currentTime);
    const noteNodesWindow = this.notesSequence.get(window);
    const updater = new UpdateProcess( {
      windowNodes: noteNodesWindow,
      window,
      analyzer: this,
    } );

    updater.update();
  }

  addBeatAt(at: Time) {
    this.results.beatSequence.add( {
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
    ret.currentChordNode = stringifyNode(listenerState.currentChordNode);

  if (listenerState.currentKeyNode)
    ret.currentKeyNode = stringifyNode(listenerState.currentKeyNode);

  return ret;
}

function stringifyNode<T>(n: TemporalNode<T>) {
  return `${n.interval.from}=>${n.interval.to}: ${n.event.toString()}`;
}
