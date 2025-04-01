/* eslint-disable max-len */
import { Time, TimelineNode } from "@datune/utils";
import { Interval, intervalBetween, intervalContains } from "datils/math/intervals";
import { Chord, Chords, Intervals, Key, Keys, Pitch, PitchArray, Scales, SpnArray, Spns, Voicings } from "@datune/core";
import { Timeline } from "@datune/utils/datastructures/timeline/structures/Timeline";
import { MidiTimelineNode } from "@datune/midi";
import { SingleStep, VoiceLeadings } from "@datune/core-ext/voice-leading";
import { rootChord3 } from "@datune/core/keys/chromatic/modifiers";
import { assertIsDefined } from "datils/datatypes/nullish";
import { sortNodesByFrom } from "approaches/utils";
import { Gravitation } from "timelines/GravitationTimeline";
import { type Analyzer } from "./ListenerAnalyzer";
import { classifyPerception, withPerceptualNotes } from "./perception/perception";

type Props = {
  windowNodes: Readonly<MidiTimelineNode[]>;
  window: Interval<number>;
  analyzer: Analyzer;
};

const newChordThrehold = 400;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const time = this.props.window.from;
    const startNoteNodesWindow = this.props.windowNodes
      .filter(n => {
        return intervalContains(this.props.window, n.interval.from);
      } );
    const endNoteNodesWindow = this.props.windowNodes
      .filter(n => {
        return intervalContains(this.props.window, n.interval.to);
      } );
    const hasAnyNewNotes = startNoteNodesWindow.length > 0;
    const hasAnyEndNotes = endNoteNodesWindow.length > 0;

    if (hasAnyNewNotes) {
      // if (!this.hasAnyBeat())
      this.addBeatNow();
    }

    if (hasAnyEndNotes || hasAnyNewNotes)
      this.updateGravitationTimeline();

    if (hasAnyNewNotes) {
      const playingNoteNodes = this.props.windowNodes
        .filter(n => {
          return !intervalContains(this.props.window, n.interval.to);
        } );
      const perceptualMidiNotes = withPerceptualNotes(playingNoteNodes.map(n=>n.event));
      const selectedPerceptualMidiNotesClassified = classifyPerception(perceptualMidiNotes);
      const selectedPerceptualMidiNotes = selectedPerceptualMidiNotesClassified.sure;
      const selectedPerceptualMidiPitch = selectedPerceptualMidiNotes.map(n=>n.pitch);
      const selectedPerceptualMidiNotesNodes = playingNoteNodes
        .filter(n=>selectedPerceptualMidiPitch.includes(n.event.pitch))
        .sort((a, b) => +a.event.pitch - +b.event.pitch);
      const pitches = selectedPerceptualMidiNotesNodes
        .map(n=>n.event.pitch.spn.pitch)
        .filter(
          (value, index, self) => self.indexOf(value) === index,
        ) as PitchArray;

      if (this.shouldAddNewChould(pitches))
        this.addChordNow(pitches);
    }

    // Se hace al final por si el timeline ha cambiado durante el step
    const currentChordNodeAtWindowFrom = this.analyzer.results.chordTimeline.getAt(this.props.window.from - this.analyzer.step);

    // Extender acorde que se estaba escuchando
    if (currentChordNodeAtWindowFrom)
      this.extendsPrevListeningChord(currentChordNodeAtWindowFrom);

    if (this.props.window.to % 300 === 0)
      this.analyzer.showListenerState();
  }

  updateGravitationTimeline() {
    const startNoteNodesWindow = this.props.windowNodes
      .filter(n => {
        return intervalContains(this.props.window, n.interval.from);
      } );
    const endNoteNodesWindow = this.props.windowNodes
      .filter(n => {
        return intervalContains(this.props.window, n.interval.to);
      } );
    const { currentGravitationNodes } = this.analyzer.listenerState;

    if (startNoteNodesWindow.length > 0) {
      const gravitations: Gravitation[] = [];
      const spns = startNoteNodesWindow.map(n=>n.event.pitch.spn) as SpnArray;

      if (this.analyzer.listenerState.currentKeyNode) {
        const key = this.analyzer.listenerState.currentKeyNode.event;
        const rootChord = rootChord3(key);

        assertIsDefined(rootChord);
        const { groups } = VoiceLeadings.StepsGen.toKeyResolution( {
          restingPitches: rootChord.pitches,
          base: spns,
        } );

        for (let i = 0; i < groups.length; i++) {
          const gp = groups[i];

          for (const singleGravityStep of gp) {
            const gravitation: Gravitation = {
              type: "key",
              spn: spns[i],
              stepInterval: (singleGravityStep as SingleStep).interval,
            };

            gravitations.push(gravitation);
          }
        }
      }

      if (gravitations.length > 0) {
        const interval = this.props.window;

        for (const g of gravitations) {
          this.analyzer.results.gravitationTimeline.add( {
            event: g,
            interval,
          } );
        }
      }
    }

    const endSpns = endNoteNodesWindow.map(n=>n.event.pitch.spn);

    for (const n of currentGravitationNodes) {
      switch (n.event.type) {
        case "key":
        {
          const { spn } = n.event;

          if (!endSpns.includes(spn)) {
            changeNodeIntervalTo(
              this.analyzer.results.gravitationTimeline,
              n,
              this.props.window.to,
            );
          }
        }
      }
    }

    this.analyzer.listenerState.currentGravitationNodes = this.analyzer.results.gravitationTimeline.getAt(this.props.window.to);
  }

  extendsPrevListeningChord(currentChordNodeAtWindowFrom: TimelineNode<Chord>) {
    const currentChordNodeAtWindowTo = this.analyzer.listenerState.currentChordNode;
    const chordHasChanged = currentChordNodeAtWindowTo !== currentChordNodeAtWindowFrom;

    if (currentChordNodeAtWindowFrom.interval.to <= this.props.window.from) {
      let newTo: Time | undefined;

      if (chordHasChanged)
        newTo = currentChordNodeAtWindowTo!.interval.from;
      else {
        const endInThisWindow = this.getChordEndsTime(currentChordNodeAtWindowFrom.event);

        if (endInThisWindow !== null)
          newTo = endInThisWindow;
        else {
          const isStillListeningAtWindowTo = this.props.windowNodes.some(n=>currentChordNodeAtWindowFrom.event.pitches.includes(n.event.pitch.spn.pitch));

          if (isStillListeningAtWindowTo)
            newTo = this.props.window.to;
        }
      }

      if (newTo === undefined)
        return;

      if (newTo < currentChordNodeAtWindowFrom.interval.from)
        throw new Error();

      const extendedChordNode = changeNodeIntervalTo(
        this.analyzer.results.chordTimeline,
        currentChordNodeAtWindowFrom,
        newTo,
      );

      if (!chordHasChanged)
        this.analyzer.listenerState.currentChordNode = extendedChordNode;
    }
  }

  getChordEndsTime(chord: Chord): Time | null {
    const notesInChordNodes = this.props.windowNodes
      .filter(n => chord.pitches.includes(n.event.pitch.spn.pitch));

    if (notesInChordNodes.length === 0)
      return null;

    const maxTo = Math.max(...notesInChordNodes.map(n => n.interval.to));

    if (maxTo < this.props.window.to)
      return maxTo;

    return null;
  }

  shouldAddNewChould(pitches: PitchArray): boolean {
    if (!this.analyzer.listenerState.currentChordNode)
      return true;

    if (pitches.length < 2)
      return false;

    const { currentChordNode: lastChordNode } = this.analyzer.listenerState;
    const duration = this.analyzer.currentWindow.from
    - lastChordNode.interval.from;
    const nextBar = this.analyzer.listenerState.bar.next;

    if (nextBar === undefined && duration < newChordThrehold)
      return false;

    const checkedSamePitches = isSamePitches(pitches, lastChordNode.event.pitches);
    const newPitchesIncludedInLastChord = pitches
      .every(pitch => lastChordNode.event.pitches.includes(pitch));
    const samePitchesOrIncluded = checkedSamePitches || newPitchesIncludedInLastChord;

    if (nextBar !== undefined) {
      const beatDuration = this.analyzer.listenerState.bar.duration! / 4;
      const isOnBeat = checkIsOnBeat(nextBar, beatDuration, 50);
      const startNoteNodesWindow = this.props.windowNodes
        .filter(n => {
          return intervalContains(this.props.window, n.interval.from);
        } );
      const startPitches = new Set(startNoteNodesWindow.map(n=>n.event.pitch));
      const numberOfLastChordPitchesNotInNewPitches = lastChordNode.event.pitches
        .filter(pitch => !pitches.includes(pitch))
        .length;
      const currentChordIsAmbiguous = this.analyzer.listenerState.currentChordNode.event.length < 3;

      if (currentChordIsAmbiguous && !checkedSamePitches)
        return true;

      if (this.analyzer.listenerState.bar.last! < beatDuration * 1.25 && !samePitchesOrIncluded && numberOfLastChordPitchesNotInNewPitches > 0)
        return true;

      if (duration < newChordThrehold)
        return false;

      if (startPitches.size < 2)
        return false;

      if (numberOfLastChordPitchesNotInNewPitches < 2 && nextBar <= beatDuration)
        return false;

      if (startNoteNodesWindow.length < 3)
        return false;

      if (!isOnBeat)
        return false;
    }

    if (samePitchesOrIncluded && duration < newChordThrehold * 2)
      return false;

    return !samePitchesOrIncluded;
  }

  addChordNow(pitches: PitchArray) {
    const chord = Chords.fromPitches(...pitches);

    // eslint-disable-next-line prefer-destructuring
    this.analyzer.listenerState.currentChordNode = this.analyzer.results.chordTimeline.add( {
      event: chord,
      interval: this.props.window,
    } )[0];

    this.analyzer.log("Updated currentChord to " + this.analyzer.listenerState.currentChordNode.event);

    if (this.analyzer.listenerState.bar.next) {
      const barBeginning = this.analyzer.listenerState.bar.next + 50 > this.analyzer.listenerState.bar.duration!;

      if (!barBeginning) {
        const changed = this.fixChordsInCurrentBar();

        if (changed)
          this.analyzer.listenerState.currentChordNode = this.analyzer.results.chordTimeline.getAt(this.props.window.from);
      }
    }

    if (!this.hasAnyKey()) {
      this.analyzer.listenerState.tonal.rootChord = chord;
      this.analyzer.log("Updated rootChord to " + this.analyzer.listenerState.tonal.rootChord);

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

        this.analyzer.log("Updated Key to " + this.analyzer.listenerState.currentKeyNode.event);
      }
    }
  }

  fixChordsInCurrentBar(): boolean {
    let changed = false;
    const interval = intervalBetween(
      this.analyzer.currentTime - this.analyzer.listenerState.bar.last!,
      this.analyzer.currentTime,
    );
    const chordNodes = this.analyzer.results.chordTimeline.getAtInterval(interval);
    let lastIsAmbiguos = false;

    for (let i = 0; i < chordNodes.length; i++) {
      const chordNode = chordNodes[i];

      if (lastIsAmbiguos) {
        const lastChordNode = chordNodes[i - 1];
        const currentHasAnyThird = chordHasAnyThird(
          lastChordNode.event.root,
          chordNode.event,
        );

        if (currentHasAnyThird) {
          // TODO: para hacerlo bien manteniendo el orden habría que tener en cuenta los SPN
          const pitches = uniquePitches(
            ...lastChordNode.event.pitches,
            ...chordNode.event.pitches,
          ) as PitchArray;
          const fusedChord = Chords.fromPitches(...pitches);

          fuseNodes(
            fusedChord,
            this.analyzer.results.chordTimeline,
            chordNode,
            lastChordNode,
          );

          changed = true;
          break;
        }
      }

      // TODO:
      // bug: después de haber borrado los nodos fusionados, al hacer getInterval duplica el nodo que coge.
      let bug = false;

      if (chordNodes.length > 1 && chordNodes[0].event === chordNodes[1].event)
        bug = true;

      if (
        !bug
        && i > 0
        && this.analyzer.listenerState.beat.last !== undefined) {
        const lastChordNode = chordNodes[i - 1];
        const lastBarAbs = this.analyzer.listenerState.beat.last + this.analyzer.currentTime;
        const canBeApoyature = this.analyzer.listenerState.bar.duration
        && chordNode.interval.from < lastBarAbs + (this.analyzer.listenerState.bar.duration / 4 * 1.25);
        let isApoyature = false;

        if (canBeApoyature) {
          const lastChordGravitations = this.analyzer.results.gravitationTimeline.getAt(lastChordNode.interval.from);
          const notesAtChord = this.analyzer.midiTimeline.getAtInterval(chordNode.interval).filter(n=> {
            return !intervalContains(chordNode.interval, n.interval.to);
          } );
          const startingNotes = notesAtChord.filter(n=> {
            return intervalContains(chordNode.interval, n.interval.from);
          } );
          const startingSpns = startingNotes.map(n=>n.event.pitch.spn);
          const playingSpns = notesAtChord.map(n=>n.event.pitch.spn);
          const playingPitches = playingSpns.map(n=>n.pitch);

          if (lastChordGravitations) {
            for (const g of lastChordGravitations) {
              if (g.event.type === "key" && g.event.stepInterval !== null) {
                const { spn } = g.event;
                const spnResolution = Spns.add(spn, g.event.stepInterval);

                if (spnResolution === null)
                  continue;

                const isSolvingSpn = startingSpns.includes(spnResolution) && !playingSpns.includes(spn);
                const isSolvingPitches = !playingPitches.includes(spn.pitch);

                if (isSolvingSpn && isSolvingPitches)
                  isApoyature = true;

                break;
              }
            }
          }
        }

        if (isApoyature) {
          fuseNodes(
            chordNode.event,
            this.analyzer.results.chordTimeline,
            lastChordNode,
            chordNode,
          );
        } else {
          fuseNodes(
            lastChordNode.event,
            this.analyzer.results.chordTimeline,
            lastChordNode,
            chordNode,
          );
        }

        changed = true;
        break;
      }

      lastIsAmbiguos = !chordHasAnyThird(chordNode.event.root, chordNode.event);
    }

    if (changed)
      this.fixChordsInCurrentBar();

    return changed;
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
    let beatNodesInBar = Array.from(new Set(
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

      beatNodesInBar = Array.from(new Set(
        this.analyzer.results.beatTimeline.getAtInterval(interval),
      ));

      let newBar = false;

      if (this.analyzer.listenerState.bar.next === undefined) {
        const isDivision4 = this.checkDivision4();

        if (isDivision4)
          newBar = true;
      } else if (Math.abs(this.analyzer.listenerState.bar.next) < 20)
        newBar = true;

      if (newBar) {
        this.analyzer.log("Add bar");
        this.analyzer.listenerState.bar.duration = this.analyzer.listenerState.bar.last! - this.analyzer.step;
        this.analyzer.listenerState.bar.next = this.analyzer.listenerState.bar.duration - this.analyzer.step;
        this.analyzer.listenerState.bar.last = this.analyzer.step;
      }
    }
  }

  checkDivision4() {
    const lastBar = this.analyzer.listenerState.bar.last;

    if (lastBar === undefined)
      return false;

    let division4 = false;
    const { beatTimeline } = this.analyzer.results;
    const now = this.props.window.to;
    let testTime = now - lastBar;
    let i = 0;
    const threhold = 20;

    while (!division4) {
      let got = beatTimeline.getAtInterval(
        intervalBetween(
          testTime - threhold,
          testTime + threhold,
        ),
      );

      if (got.length > 0) {
        i++;

        if (i === 4)
          division4 = true;

        testTime += lastBar / 4;
      } else
        return false;
    }

    return division4;
  }
}

function changeNodeIntervalTo<T>(
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

function isSamePitches(a: PitchArray, b: PitchArray) {
  if (a.length !== b.length)
    return false;

  const aSet = new Set(a);
  const bSet = new Set(b);

  for (const pitch of aSet) {
    if (!bSet.has(pitch))
      return false;
  }

  return true;
}

function checkIsOnBeat(distanceToNextBar: Time, beat: Time, threshold: Time) {
  const remainder = distanceToNextBar % beat;

  // Comprobamos si el remainder está lo suficientemente cerca de 0 o de beat
  return remainder <= threshold || (beat - remainder) <= threshold;
}

function chordHasAnyThird(root: Pitch, chord: Chord): boolean {
  const minor = root.withAdd(Intervals.m3);
  const major = root.withAdd(Intervals.M3);
  const fourth = root.withAdd(Intervals.P4);

  if (!chord.hasAny(minor, major, fourth))
    return true;

  return false;
}

function uniquePitches(...pitches: Pitch[]): Pitch[] {
  const uniquePitchesSet = new Set<Pitch>();

  for (const pitch of pitches) {
    if (!uniquePitchesSet.has(pitch))
      uniquePitchesSet.add(pitch);
  }

  return Array.from(uniquePitchesSet);
}

function fuseNodes<E>(newEvent: E, timeline: Timeline<E>, ...oldNodes: TimelineNode<E>[]) {
  const min = oldNodes.reduce((acc, node) => Math.min(acc, node.interval.from), Infinity);
  const max = oldNodes.reduce((acc, node) => Math.max(acc, node.interval.to), -Infinity);
  const fusedInterval = intervalBetween(min, max);

  timeline.remove(...oldNodes);
  timeline.add(
    {
      event: newEvent,
      interval: fusedInterval,
    },
  );
}
