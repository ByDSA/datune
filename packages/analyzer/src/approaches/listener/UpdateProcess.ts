/* eslint-disable max-len */
import { Time, TimelineNode } from "@datune/utils";
import { Interval, intervalBetween, intervalContains } from "datils/math/intervals";
import { Chords, Key, Keys, PitchArray, Scales, Spn, Voicings } from "@datune/core";
import { Timeline } from "@datune/utils/datastructures/timeline/structures/Timeline";
import { sortNodesByFrom, sortNodesBySpn } from "approaches/utils";
import { type Analyzer } from "./ListenerAnalyzer";

type Props = {
  windowNodes: Readonly<TimelineNode<Spn>[]>;
  window: Interval<number>;
  analyzer: Analyzer;
};
export class UpdateProcess {
  props: Props;

  analyzer: Analyzer;

  constructor(props: Props) {
    this.props = props;
    this.analyzer = props.analyzer;
  }

  hasAnyBeat() {
    return this.analyzer.listenerState.beat.last !== undefined;
  }

  hasAnyChord() {
    return this.analyzer.listenerState.currentChordNode !== undefined;
  }

  hasAnyKey() {
    return this.analyzer.listenerState.currentKeyNode !== undefined;
  }

  update() {
    const startNoteNodesWindow = this.props.windowNodes
      .filter(n => {
        return intervalContains(this.props.window, n.interval.from);
      } );
    const hasAnyNewNotes = startNoteNodesWindow.length > 0;

    if (this.analyzer.listenerState.currentChordNode) {
      if (this.analyzer.listenerState.currentChordNode.interval.to < this.props.window.from) {
        this.analyzer.listenerState.currentChordNode = extendsNode(
          this.analyzer.results.chordTimeline,
          this.analyzer.listenerState.currentChordNode,
          this.props.window.from,
        );
      }
    }

    if (hasAnyNewNotes) {
      // if (!this.hasAnyBeat())
      this.addBeatNow();

      const pitches = sortNodesBySpn(startNoteNodesWindow)
        .map(n=>n.event.pitch) as PitchArray;

      this.addChordNow(pitches);
    }

    if (this.props.window.to % 300 === 0)
      this.analyzer.showListenerState();
  }

  addChordNow(pitches: PitchArray) {
    const chord = Chords.fromPitches(...pitches);

    // eslint-disable-next-line prefer-destructuring
    this.analyzer.listenerState.currentChordNode = this.analyzer.results.chordTimeline.add( {
      event: chord,
      interval: this.props.window,
    } )[0];

    if (!this.hasAnyKey()) {
      this.analyzer.listenerState.tonal.rootChord = chord;

      const voicing = chord.toVoicing();
      let newKey: Key | undefined = undefined;

      switch (voicing) {
        case Voicings.TRIAD_MAJOR:
          newKey = Keys.from(chord.root, Scales.MAJOR);
          break;
        case Voicings.TRIAD_MINOR:
          newKey = Keys.from(chord.root, Scales.MINOR);
          break;
      }

      if (newKey) {
        this.analyzer.listenerState.tonal.key = newKey;
        // eslint-disable-next-line prefer-destructuring
        this.analyzer.listenerState.currentKeyNode = this.analyzer.results.keyTimeline.add( {
          event: newKey,
          interval: this.props.window,
        } )[0];
      }
    }
  }

  addBeatNow() {
    if (this.analyzer.listenerState.beat.last !== undefined
      && this.analyzer.listenerState.beat.last <= this.analyzer.step)
      return;

    if (this.analyzer.listenerState.bar.last === undefined)
      this.analyzer.listenerState.bar.last = this.analyzer.step;

    this.analyzer.addBeatAt(this.props.window.from);
    this.analyzer.listenerState.beat.last = this.analyzer.step;

    this.reviewThisBar();
  }

  reviewThisBar() {
    const interval = intervalBetween(
      this.props.window.to - this.analyzer.listenerState.bar.last!,
      this.props.window.to,
    );
    const beatNodesInBar = Array.from(new Set(
      this.analyzer.results.beatTimeline.getAtInterval(interval),
    ));

    if (beatNodesInBar.length > 2) {
      sortNodesByFrom(beatNodesInBar);

      const lastDistance = beatNodesInBar.at(-1)?.interval.from! - beatNodesInBar.at(-2)?.interval.from!;

      for (let i = 1; i < beatNodesInBar.length - 1; i++) {
        const iFrom = beatNodesInBar.at(i)?.interval.from!;
        const prevFrom = beatNodesInBar.at(i - 1)?.interval.from!;
        const distance = iFrom - prevFrom;

        if (distance === lastDistance * 2) {
          const newBeatFrom = prevFrom + lastDistance;

          this.analyzer.addBeatAt(newBeatFrom);
        }
      }
    }
  }
}

function extendsNode<T>(
  timeline: Timeline<T>,
  node: TimelineNode<T>,
  to: Time,
) {
  const [oldNode] = timeline.remove(node);

  if (!oldNode)
    throw new Error();

  const newNode = {
    ...oldNode,
    interval: {
      ...oldNode.interval,
      to,
    },
  };
  const [ret] = timeline.add(newNode);

  return ret;
}
