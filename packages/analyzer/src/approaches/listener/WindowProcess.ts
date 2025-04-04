/* eslint-disable max-len */
import { Time, TimelineNode } from "@datune/utils";
import { Interval, intervalBetween, IntervalBound, intervalContains } from "datils/math/intervals";
import { Chord, Chords, Intervals, Key, Keys, Pitch, PitchArray, Scales, SpnArray, Spns, Voicings } from "@datune/core";
import { Timeline } from "@datune/utils/datastructures/timeline/structures/Timeline";
import { MidiNote, MidiTimelineNode } from "@datune/midi";
import { SingleStepArray, VoiceLeadings } from "@datune/core-ext/voice-leading";
import { rootChord3 } from "@datune/core/keys/chromatic/modifiers";
import { assertIsDefined } from "datils/datatypes/nullish";
import { sortNodesByFrom } from "approaches/utils";
import { Gravitation } from "timelines/GravitationTimeline";
import { type Analyzer } from "./ListenerAnalyzer";
import { classifyPerception, withPerceptualNotes } from "./perception/perception";
import { classifyNodes } from "./utils";

type Props = {
  interval: Interval<number>;
  analyzer: Analyzer;
};

const newChordThrehold = 400;

export class WindowProcess {
  interval: Interval<number>;

  nodes!: {
    all: Readonly<MidiTimelineNode[]>;
    startNodes: Readonly<MidiTimelineNode[]>;
    endNodes: Readonly<MidiTimelineNode[]>;
    sustainedNodes: Readonly<MidiTimelineNode[]>;
    activeNodes: Readonly<MidiTimelineNode[]>;
  };

  analyzer: Analyzer;

  classifiedPerceptualMidiNotes!: ReturnType<typeof classifyPerception>;

  constructor(props: Props) {
    this.interval = props.interval;
    this.analyzer = props.analyzer;
  }

  update() {
    this.readNoteNodes();

    this.updateBeat();

    this.updatePerceptualNotes();

    this.updateGravitationTimeline();

    this.updateChordsTimeline();

    this.fixCurrentBar();

    this.updateKey();
  }

  hasAnyStartNode() {
    return this.nodes.startNodes.length > 0;
  }

  hasAnyEndNode() {
    return this.nodes.endNodes.length > 0;
  }

  updateBeat() {
    if (this.hasAnyStartNode())
      this.addBeatNow();
  }

  readNoteNodes() {
    const noteNodesWindow = this.analyzer.midiTimeline.getAtInterval(this.interval);
    const realTimeNodes: TimelineNode<MidiNote>[] = noteNodesWindow.map(n=> {
      if (n.interval.to > this.interval.to) {
        return {
          event: n.event,
          interval: intervalBetween(
            n.interval.from,
            this.interval.to,
            {
              from: this.interval.fromBound,
              to: IntervalBound.CLOSED,
            },
          ),
        };
      }

      return n;
    } );
    const extensableNodes = this.analyzer.results.readNotesTimeline.getAt(this.interval.from);

    for (const n of extensableNodes) {
      for (const rn of realTimeNodes) {
        if (n.event === rn.event) {
          this.analyzer.results.readNotesTimeline.extendNode(
            n,
            {
              to: rn.interval.to,
              toBound: rn.interval.toBound,
            },
          );
        }
      }
    }

    for (const n of realTimeNodes) {
      if (n.interval.from >= this.interval.from)
        this.analyzer.results.readNotesTimeline.add(n);
    }

    const readNodes = this.analyzer.results.readNotesTimeline.getAtInterval(this.interval);
    const classifiedNodes = classifyNodes(readNodes, this.interval);

    this.nodes = {
      ...classifiedNodes,
      all: readNodes,
      activeNodes: [
        ...classifiedNodes.startNodes,
        ...classifiedNodes.sustainedNodes,
      ],
    };
  }

  updatePerceptualNotes() {
    const allPerceptualMidiNotes = withPerceptualNotes(this.nodes.activeNodes.map(n=>n.event));
    const classifiedPerceptualMidiNotes = classifyPerception(allPerceptualMidiNotes);

    this.analyzer.results.perceptualMidiTimeline.add( {
      event: classifiedPerceptualMidiNotes,
      interval: this.interval,
    } );

    this.classifiedPerceptualMidiNotes = classifiedPerceptualMidiNotes;
  }

  updateChordsTimeline() {
    if (this.hasAnyStartNode()) {
      const selectedPerceptualMidiNotes = this.classifiedPerceptualMidiNotes.sure;
      const selectedPerceptualMidiPitch = selectedPerceptualMidiNotes.map(n=>n.pitch);
      const selectedPerceptualMidiNotesNodes = this.nodes.activeNodes
        .filter(n=>selectedPerceptualMidiPitch.includes(n.event.pitch))
        .sort((a, b) => +a.event.pitch - +b.event.pitch);
      const pitches = selectedPerceptualMidiNotesNodes
        .map(n=>n.event.pitch.spn.pitch)
        .filter(
          (value, index, self) => self.indexOf(value) === index,
        ) as PitchArray;

      if (this.shouldAddNewChord(pitches))
        this.addChordNow(pitches);
    }
  }

  updateGravitationTimeline() {
    if (!(this.hasAnyEndNode() || this.hasAnyStartNode()))
      return;

    const startNoteNodesWindow = this.nodes.all
      .filter(n => {
        return intervalContains(this.interval, n.interval.from);
      } );
    const endNoteNodesWindow = this.nodes.all
      .filter(n => {
        return intervalContains(this.interval, n.interval.to);
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
          const gp = groups[i] as SingleStepArray;

          for (const singleGravityStep of gp) {
            const gravitation: Gravitation = {
              type: "key",
              spn: spns[singleGravityStep.index],
              stepInterval: singleGravityStep.interval,
            };

            gravitations.push(gravitation);
          }
        }
      }

      if (gravitations.length > 0) {
        const { interval } = this;

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
            this.analyzer.results.gravitationTimeline.extendNode(
              n,
              {
                to: this.interval.to,
              },
            );
          }
        }
      }
    }

    this.analyzer.listenerState.currentGravitationNodes = this.analyzer.results.gravitationTimeline.getAt(this.interval.to);
  }

  extendsPrevListeningChord(currentChordNodeAtWindowFrom: TimelineNode<Chord>) {
    const currentChordNodeAtWindowTo = this.analyzer.listenerState.currentChordNode;
    const chordHasChanged = currentChordNodeAtWindowTo !== currentChordNodeAtWindowFrom;

    if (currentChordNodeAtWindowFrom.interval.to <= this.interval.from) {
      let newTo: Time | undefined;

      if (chordHasChanged)
        newTo = currentChordNodeAtWindowTo!.interval.from;
      else {
        const endInThisWindow = this.getChordEndsTime(currentChordNodeAtWindowFrom.event);

        if (endInThisWindow !== null)
          newTo = endInThisWindow;
        else {
          const isStillListeningAtWindowTo = this.nodes.all.some(n=>currentChordNodeAtWindowFrom.event.pitches.includes(n.event.pitch.spn.pitch));

          if (isStillListeningAtWindowTo)
            newTo = this.interval.to;
        }
      }

      if (newTo === undefined)
        return;

      if (newTo < currentChordNodeAtWindowFrom.interval.from)
        throw new Error();

      const extendedChordNode = this.analyzer.results.chordTimeline.extendNode(
        currentChordNodeAtWindowFrom,
        {
          to: newTo,
        },
      );

      if (!chordHasChanged)
        this.analyzer.listenerState.currentChordNode = extendedChordNode;
    }
  }

  getChordEndsTime(chord: Chord): Time | null {
    const notesInChordNodes = this.nodes.all
      .filter(n => chord.pitches.includes(n.event.pitch.spn.pitch));

    if (notesInChordNodes.length === 0)
      return null;

    const maxTo = Math.max(...notesInChordNodes.map(n => n.interval.to));

    if (maxTo < this.interval.to)
      return maxTo;

    return null;
  }

  shouldAddNewChord(pitches: PitchArray): boolean {
    const { currentChordNode: lastChordNode } = this.analyzer.listenerState;

    if (!lastChordNode)
      return true;

    if (pitches.length < 2) // TODO: y arpegios o notas de desambiguación?
      return false;

    const lastChordDuration = this.interval.from - lastChordNode.interval.from;
    const nextBar = this.analyzer.listenerState.bar.next;
    const checkedSamePitches = isSamePitches(pitches, lastChordNode.event.pitches);
    const newPitchesIncludedInLastChord = pitches
      .every(pitch => lastChordNode.event.pitches.includes(pitch));
    const samePitchesOrIncluded = checkedSamePitches || newPitchesIncludedInLastChord;

    if (nextBar !== undefined) {
      const beatDuration = this.analyzer.listenerState.beat.duration!;
      const isOnBeat = checkIsOnBeat(nextBar, beatDuration, 50);
      const startNoteNodesWindow = this.nodes.all
        .filter(n => {
          return intervalContains(this.interval, n.interval.from);
        } );
      const startPitches = new Set(startNoteNodesWindow.map(n=>n.event.pitch));
      const numberOfLastChordPitchesNotInNewPitches = lastChordNode.event.pitches
        .filter(pitch => !pitches.includes(pitch))
        .length;

      if (this.analyzer.listenerState.bar.last! < beatDuration * 1.25 && !samePitchesOrIncluded && numberOfLastChordPitchesNotInNewPitches > 0
        && lastChordDuration < beatDuration * 1.25
      )
        return true;

      if (this.analyzer.listenerState.bar.last! > this.analyzer.step) {
        const pitchDisambiguation = Object.values(checkSolveDisambiguation(
          lastChordNode.event,
          pitches,
        ));
        const isDisambiguation = pitchDisambiguation.length > 0;

        if (isDisambiguation)
          return true;
      }

      if (lastChordDuration < newChordThrehold)
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

    if (samePitchesOrIncluded && lastChordDuration < newChordThrehold * 2)
      return false;

    return !samePitchesOrIncluded;
  }

  addChordNow(pitches: PitchArray) {
    const chord = Chords.fromPitches(...pitches);

    // eslint-disable-next-line prefer-destructuring
    this.analyzer.listenerState.currentChordNode = this.analyzer.results.chordTimeline.add( {
      event: chord,
      interval: this.interval,
    } )[0];

    this.analyzer.log("Updated currentChord to " + this.analyzer.listenerState.currentChordNode.event);
  }

  fixCurrentBar() {
    if (this.analyzer.listenerState.bar.next) {
      const barBeginning = this.analyzer.listenerState.bar.next + 50 > this.analyzer.listenerState.bar.duration!;

      if (!barBeginning) {
        const changed = this.fixChordsInCurrentBar();

        if (changed)
          this.analyzer.listenerState.currentChordNode = this.analyzer.results.chordTimeline.getAt(this.interval.from);
      }
    }

    // Se hace al final por si el timeline ha cambiado durante el step
    const currentChordNodeAtWindowFrom = this.analyzer.results.chordTimeline.getAt(this.interval.from - this.analyzer.step);

    // Extender acorde que se estaba escuchando
    if (currentChordNodeAtWindowFrom)
      this.extendsPrevListeningChord(currentChordNodeAtWindowFrom);
  }

  updateKey() {
    const chord = this.analyzer.listenerState.currentChordNode?.event;

    if (chord && this.analyzer.listenerState.currentKeyNode === undefined) {
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
          interval: this.interval,
        } )[0];

        this.analyzer.log("Updated Key to " + this.analyzer.listenerState.currentKeyNode.event);
      }
    }
  }

  fixChordsInCurrentBar(): boolean {
    /*
Cosas a comprobar después de haber puesto el acorde:
- apoyaturas
- notas características
- nota del acorde anterior y/o que se termina rápidamente (sin llegar a percibirse como del nuevo acorde)

*/
    let changed = false;
    const interval = intervalBetween(
      this.analyzer.currentTime - this.analyzer.listenerState.bar.last!,
      this.analyzer.currentTime,
    );
    let chordNodes = this.analyzer.results.chordTimeline.getAtInterval(interval);

    // TODO:
    // bug: después de haber borrado los nodos fusionados, al hacer getInterval duplica el nodo que coge.
    // filtrar: el evento no existe en chordNodes[]., excepto en el nodo actual
    chordNodes = chordNodes.filter((n, i) => {
      return chordNodes.findIndex(n2 => n2.event === n.event) === i;
    } );
    let lastIsAmbiguos = false;

    for (let i = 0; i < chordNodes.length; i++) {
      const chordNode = chordNodes[i];

      if (i > 0
        && this.analyzer.listenerState.bar.last !== undefined) {
        const lastChordNode = chordNodes[i - 1];
        const lastBarAbs = this.analyzer.currentTime - this.analyzer.listenerState.bar.last;
        const canBeApoyature = this.analyzer.listenerState.bar.duration
        && chordNode.interval.from < lastBarAbs + (this.analyzer.listenerState.bar.duration / 4 * 1.25);
        let isApoyature = false;

        if (canBeApoyature) {
          const lastChordGravitations = this.analyzer.results.gravitationTimeline.getAt(lastChordNode.interval.from);
          const notesAtChord = this.analyzer.results.readNotesTimeline.getAtInterval(chordNode.interval).filter(n=> {
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

                const [nodeBase] = notesAtChord.filter(n=>n.event.pitch.spn === spn);
                // TODO: trampa! en verdad habría que esperar a que la nota deje de sonar
                const soonEnd = nodeBase && nodeBase.interval.toBound !== IntervalBound.CLOSED && this.analyzer.listenerState.bar.duration && nodeBase.interval.to < chordNode.interval.from + (this.analyzer.listenerState.bar.duration / 8);
                const isSolvingSpn = startingSpns.includes(spnResolution) && (
                  !playingSpns.includes(spn)
                  || soonEnd
                );
                const isSolvingPitches = !playingPitches.includes(spn.pitch)
                && chordNode.event.has(spnResolution.pitch); // Porque puede estar en el timeline pero no percibirse (o sea, no en chordNode)

                if (isSolvingSpn && isSolvingPitches) {
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
            changed = true;
            break;
          } else if (!lastIsAmbiguos) {
            fuseNodes(
              lastChordNode.event,
              this.analyzer.results.chordTimeline,
              lastChordNode,
              chordNode,
            );

            changed = true;
            break;
          }
        }
      }

      if (lastIsAmbiguos) {
        const lastChordNode = chordNodes[i - 1];
        const solvePitchesObj = checkSolveDisambiguation(lastChordNode.event, chordNode.event.pitches);
        const solvePitchesArray = Object.values(solvePitchesObj);

        if (solvePitchesArray.length > 0) {
          // TODO: para hacerlo bien manteniendo el orden habría que tener en cuenta los SPN
          const pitches = uniquePitches(
            ...lastChordNode.event.pitches,
            ...solvePitchesArray,
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

      if (i < chordNodes.length - 1) {
        const nextChord = chordNodes[i + 1];

        lastIsAmbiguos = Object.values(checkSolveDisambiguation(chordNode.event, nextChord.event.pitches)).length > 0;
      }
    }

    if (changed)
      this.fixChordsInCurrentBar();

    return changed;
  }

  addBeatNow() {
    const { listenerState } = this.analyzer;

    if (listenerState.beat.last !== undefined
      && listenerState.beat.last <= this.analyzer.step)
      return;

    if (listenerState.bar.last === undefined)
      listenerState.bar.last = this.analyzer.step;

    this.analyzer.addBeatAt(this.interval.from);

    if (listenerState.beat.duration === undefined && listenerState.beat.last !== undefined)
      listenerState.beat.duration = listenerState.beat.last - this.analyzer.step;

    listenerState.beat.last = this.analyzer.step;

    this.reviewThisBar();
  }

  reviewThisBar() {
    const interval = intervalBetween(
      this.interval.to - this.analyzer.listenerState.bar.last!,
      this.interval.to,
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
    const now = this.interval.to;
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

type DisambiguationReturn = {
  third?: Pitch;
  fifth?: Pitch;
  seventh?: Pitch;
};
function checkSolveDisambiguation(chord: Chord, newPitches: Pitch[]): DisambiguationReturn {
  const sameRoot = chord.root === newPitches[0];
  const ret: DisambiguationReturn = {};

  if (!sameRoot)
    return ret;

  const { root } = chord;
  const minor = root.withAdd(Intervals.m3);
  const major = root.withAdd(Intervals.M3);
  const sus2 = root.withAdd(Intervals.M2);
  const sus4 = root.withAdd(Intervals.P4);

  if (!chord.hasAny(minor, major, sus4)) {
    if (newPitches.includes(major))
      ret.third = major;
    else if (newPitches.includes(minor))
      ret.third = minor;
    else if (newPitches.includes(sus4))
      ret.third = sus4;
    else if (newPitches.includes(sus2))
      ret.third = sus2;

    const retArray = Object.values(ret);
    const restOfPitches = newPitches.filter(p=>!retArray.includes(p));
    const currentChordHaveRestOfPitches = restOfPitches.length === 0
      ? true
      : chord.hasAll(...restOfPitches as PitchArray);

    if (!currentChordHaveRestOfPitches)
      return {};

    return ret;
  }

  const diminished = root.withAdd(Intervals.d5);
  const perfect = root.withAdd(Intervals.P5);
  const augmented = root.withAdd(Intervals.m6);

  if (!chord.hasAny(diminished, perfect, augmented)) {
    if (newPitches.includes(perfect))
      ret.fifth = perfect;
    else if (newPitches.includes(diminished))
      ret.fifth = diminished;
    else if (newPitches.includes(augmented))
      ret.fifth = augmented;
  }

  // const minor7 = root.withAdd(Intervals.m7);
  // const major7 = root.withAdd(Intervals.M7);
  // if (!chord.hasAny(minor7, major7)) {
  //   if (newPitches.includes(major7))
  //     ret.seventh = major7;
  //   else if (newPitches.includes(minor7))
  //     ret.seventh = minor7;
  // }
  return ret;
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
