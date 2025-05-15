/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { Interval, intervalBetween, stringifyInterval } from "datils/math/intervals";
import { Time, TimelineNode } from "@datune/utils";
import { Chord, PitchArray, Chords, Intervals, Pitch, Voicings } from "@datune/core";
import { type Analyzer } from "./ListenerAnalyzer";
import { PerceptualMidiNote } from "./perception/perception";
import { WindowProcess } from "./WindowProcess";

const newChordThrehold = 300;
const chordSimultaneityThrehold = 70;

type TickProps = {
  window: WindowProcess;
};

type Props = {
  analyzer: Analyzer;
};
export class ChordsStep {
  analyzer: Analyzer;

  lastAnalysisTime: Time = -1;

  currentTickProps!: TickProps;

  disableExtend: boolean;

  lastChordNode: TimelineNode<Chord> | null;

  constructor(props: Props) {
    this.analyzer = props.analyzer;

    this.disableExtend = false;

    this.lastChordNode = null;
  }

  initialize(interval: Interval<Time>) {
    this.lastAnalysisTime = interval.from - this.analyzer.step;

    this.analyzer.log("Initialize lastAnalysisTime at " + this.lastAnalysisTime);
  }

  tick(tickProps: TickProps) {
    if (this.lastAnalysisTime === -1) {
      const hasAnyMidiEvent = this.analyzer.listenerState.bar.last !== undefined;

      if (!hasAnyMidiEvent) // Si aún no se ha recibido ningún evento MIDI
        return false;

      this.initialize(tickProps.window.interval);

      return false;
    }

    this.currentTickProps = tickProps;
    this.analyze();

    // Extender acorde que se estaba escuchando
    if (this.lastChordNode) {
      this.lastChordNode = this.analyzer.results.chordTimeline.extendNode(
        this.lastChordNode,
        {
          to: this.currentTickProps.window.interval.to,
        },
      );
    }
  }

  getAnalysisInterval(windowInterval: Interval<Time>): Interval<Time> | null {
    let intervalFrom = this.lastAnalysisTime + this.analyzer.step;
    let intervalTo = windowInterval.to - newChordThrehold;
    let lastBeatInAnalysis: number | undefined = this.analyzer.results.beatTimeline.getLeftAt(windowInterval.to)?.time;

    if (lastBeatInAnalysis !== undefined && lastBeatInAnalysis > intervalFrom)
      intervalTo = lastBeatInAnalysis;

    if (windowInterval.from - intervalTo < newChordThrehold)
      return null;

    return intervalBetween(intervalFrom, intervalTo);
  }

  analyze(): void {
    const { interval } = this.currentTickProps.window;
    const lastAnalyisDelta = interval.to - this.lastAnalysisTime;

    if (lastAnalyisDelta <= newChordThrehold)
      return;

    const analysisInterval = this.getAnalysisInterval(interval);

    if (analysisInterval === null)
      return;

    const nodes = this.analyzer.perceptualTimeline.timeline.getAtInterval(analysisInterval);

    if (nodes.length === 0)
      this.lastChordNode = null;
    else
      this.processChord(nodes, analysisInterval);

    this.lastAnalysisTime = analysisInterval.to - this.analyzer.step;
  }

  processChord(
    nodes: TimelineNode<PerceptualMidiNote>[],
    interval: Interval<Time>,
  ): void {
    this.analyzer.log("Process chord " + stringifyInterval(interval));
    const pitches = nodes
      .sort((a, b) => +a.event.pitch - +b.event.pitch)
      .map(n=>n.event.pitch.spn.pitch)
      .filter(
        (value, index, self) => self.indexOf(value) === index,
      ) as PitchArray;

    if (!this.lastChordNode) {
      const chord = Chords.fromPitches(...pitches);

      this.analyzer.results.firstChordTimeline.add( {
        interval,
        event: chord,
      } );
      this.addChord(chord, interval);

      return;
    }

    const beatTimes = this.analyzer.results.beatTimeline.getAtInterval(interval).map(n=>n.time);
    const subintervals = splitInterval(interval, beatTimes);

    for (const subinterval of subintervals) {
      const isBeat = beatTimes.includes(subinterval.from);
      const nodesInterval = nodes.filter(n=>{
        return n.interval.to > subinterval.from + chordSimultaneityThrehold
        && n.interval.from < subinterval.to - chordSimultaneityThrehold;
      } );

      if (isBeat) {
        this.fixBarChordsUntilNow(subinterval.from);
        const beatChord = this.processBeatChord(this.lastChordNode, nodesInterval, subinterval.from);

        if (beatChord)
          this.addBeatChord(beatChord, subinterval.from);
      }

      this.processMiddleChord(this.lastChordNode, nodesInterval, subinterval);
    }
  }

  // Se usa para añadir notas ambiguas que se añaden entre beats
  processMiddleChord(
    lastChordNode: TimelineNode<Chord>,
    nodes: TimelineNode<PerceptualMidiNote>[],
    interval: Interval<Time>,
  ): void {
    const lastChordPitches = lastChordNode.event.pitches;
    const lastChordRoot = lastChordNode.event.root;
    let pitchesToAdd: Pitch[] = [];
    const isLastChordThirdAmbiguous = lastChordPitches.every(pitch => {
      return !isThird(lastChordRoot, pitch);
    } );
    const isLastChordFifthAmbiguous = lastChordPitches.every(pitch => {
      return !isFifth(lastChordRoot, pitch);
    } );

    for (const n of nodes) {
      const { pitch } = n.event.pitch.spn;

      if (pitchesToAdd.includes(pitch))
        continue;

      if (isLastChordThirdAmbiguous && isThird(lastChordRoot, pitch))
        pitchesToAdd.push(pitch);
      else if (isLastChordFifthAmbiguous && isFifth(lastChordRoot, pitch))
        pitchesToAdd.push(pitch);
    }

    if (pitchesToAdd.length > 0) {
      const newChord = Chords.fromPitches(...lastChordPitches, ...pitchesToAdd);
      const newInterval = intervalBetween(lastChordNode.interval.from, interval.to);

      this.analyzer.results.firstChordTimeline.add( {
        interval: newInterval,
        event: newChord,
      } );
      this.addChord(
        newChord,
        newInterval,
      );
    }
  }

  addChord(chord: Chord, interval: Interval<Time>) {
    // eslint-disable-next-line prefer-destructuring
    this.lastChordNode = this.analyzer.results.chordTimeline.add( {
      interval,
      event: chord,
    } )[0];

    this.analyzer.log(`Add chord: ( ${chord.toString()} ) at ${stringifyInterval(interval)}`);
  }

  addBeatChord(chord: Chord, time: Time) {
    const interval = intervalBetween(time, time + this.analyzer.step);

    this.analyzer.results.firstChordTimeline.add( {
      interval,
      event: chord,
    } );

    return this.addChord(chord, interval);
  }

  getBeatInBar(time: Time): number {
    const lastBarTime = this.analyzer.results.barTimeline.getLeftAt(time)?.time;
    const beatDuration = this.analyzer.listenerState.beat.duration;
    const isDownBeat = time === lastBarTime;

    if (isDownBeat)
      return 1;

    if (lastBarTime === undefined || beatDuration === undefined)
      return -1;

    const beatInBar = ((time - lastBarTime) / beatDuration) + 1;

    return beatInBar;
  }

  getResolutionToRootChanges(lastChordNode: TimelineNode<Chord>, playingAtBeat: TimelineNode<PerceptualMidiNote>[]): TimelineNode<PerceptualMidiNote>[] {
    const lastChordNodes = this.analyzer.perceptualTimeline.timeline.getAtInterval(lastChordNode.interval);
    const playingAtLastChordBeat = this.getAttackNodes(lastChordNode.interval.from, lastChordNodes);
    const changes = playingAtLastChordBeat.filter(lastNode => {
      const lastSpn = lastNode.event.pitch.spn;

      return playingAtBeat.some(node => {
        const { spn } = node.event.pitch;

        if (lastSpn === spn)
          return false;

        if (!lastChordNode.event.pitches.includes(lastSpn.pitch))
          return false;

        const distance = Math.abs(+spn - +lastSpn);

        return distance <= 2 && spn.pitch === lastChordNode.event.root;
      } );
    } );

    return changes;
  }

  processBeatChord(
    lastChordNode: TimelineNode<Chord>,
    nodes: TimelineNode<PerceptualMidiNote>[],
    time: Time,
  ): Chord | null {
    this.analyzer.log("Process beat chord: " + time);
    const attackingAtBeat = this.getAttackNodes(time, nodes);

    if (attackingAtBeat.length === 0)
      return null;

    const lastChord = lastChordNode.event;
    const validNodes = [...attackingAtBeat];

    for (const n of nodes) {
      if (n.interval.from > time || n.interval.to < time)
        continue;

      if (lastChord.has(n.event.pitch.spn.pitch))
        validNodes.push(n);
    }

    const attackingAtBeatPitches = validNodes
      .sort((a, b) => +a.event.pitch - +b.event.pitch)
      .map(n=>n.event.pitch.spn.pitch)
      .filter(
        (value, index, self) => self.indexOf(value) === index,
      ) as PitchArray;
    const changedRoot = attackingAtBeatPitches[0] !== lastChord.root;
    const changedThird = isChangedThird(lastChord, attackingAtBeatPitches);
    const changedFifth = isChangedFifth(lastChord, attackingAtBeatPitches);
    const change = (changedRoot || changedThird || changedFifth);

    if (change)
      return Chords.fromPitches(...attackingAtBeatPitches);

    const thirdDissambiguation = getThirdDissambiguation(lastChord, attackingAtBeatPitches);
    const fifthDissambiguation = getFifthDissambiguation(lastChord, attackingAtBeatPitches);
    const dissToAdd = [];

    if (thirdDissambiguation !== null)
      dissToAdd.push(thirdDissambiguation);

    if (fifthDissambiguation !== null)
      dissToAdd.push(fifthDissambiguation);

    const possibleApoyature = isPossibleApoyature(lastChordNode, attackingAtBeatPitches);

    if (possibleApoyature)
      return Chords.fromPitches(...attackingAtBeatPitches, ...dissToAdd.filter(p=>!attackingAtBeatPitches.includes(p)));

    const changes = this.getResolutionToRootChanges(lastChordNode, attackingAtBeat);

    if (changes.length > 0)
      return Chords.fromPitches(...attackingAtBeatPitches, ...dissToAdd.filter(p=>!attackingAtBeatPitches.includes(p)));

    if (dissToAdd.length > 0)
      return Chords.fromPitches(...lastChord.pitches, ...dissToAdd);

    return null;
  }

  fixBarChordsUntilNow(time: Time) {
    let lastBarTime = this.analyzer.results.barTimeline.getLeftAt(time)?.time;

    if (lastBarTime === time)
      lastBarTime = this.analyzer.results.barTimeline.getLeftAt(time - 1)?.time;

    if (lastBarTime === undefined)
      return;

    const barIntervalUntilNow = intervalBetween(lastBarTime, time);
    const chords = this.analyzer.results.chordTimeline.getAtInterval(
      barIntervalUntilNow,
    );

    if (chords.length === 1)
      return;

    this.analyzer.log("Check bar chords at " + stringifyInterval(barIntervalUntilNow));

    for (let j = 1; j < chords.length; j++) {
      const lastChordNode = chords[j - 1];
      const currentChord = chords[j];
      const lastChord = lastChordNode.event;
      const tonicChord = this.analyzer.listenerState.tonal.rootChord;
      const fuseInterval = intervalBetween(
        Math.max(lastBarTime, lastChordNode.interval.from),
        currentChord.interval.to,
      );

      if (!tonicChord)
        return;

      const playingAtBeatPitches = currentChord.event.pitches;
      const rootChanged = !playingAtBeatPitches.includes(lastChord.root);

      if (rootChanged)
        continue;

      const thirdDissambiguation = getThirdDissambiguation(lastChord, currentChord.event.pitches);
      const fifthDissambiguation = getFifthDissambiguation(lastChord, currentChord.event.pitches);

      if (thirdDissambiguation || fifthDissambiguation) {
        this.addChord(
          chords[j].event,
          fuseInterval,
        );
        continue;
      }

      let resolveToThird = getThirdResolution(lastChord, tonicChord, playingAtBeatPitches);
      let resolveToFifth = getFifthResolution(lastChord, tonicChord, playingAtBeatPitches);
      const interval = intervalBetween(
        lastChordNode.interval.from,
        currentChord.interval.to,
      );
      // Apoyatura: 9ª->root
      const nodes = this.analyzer.perceptualTimeline.timeline.getAtInterval(chords[j].interval);
      const playingAtBeat = this.getAttackNodes(chords[j].interval.from, nodes);
      const changes = this.getResolutionToRootChanges(lastChordNode, playingAtBeat);
      const apoyatura9 = changes.length > 0;
      const isApoyature = resolveToThird.length > 0 || resolveToFifth.length > 0 || apoyatura9;

      if (isApoyature) {
        let newPitches: PitchArray = [] as any;

        pitchFor: for (const p of lastChord.pitches) {
          if (resolveToThird) {
            for (const r of resolveToThird) {
              if (p === r.from) {
                if (!newPitches.includes(r.to))
                  newPitches.push(r.to);

                continue pitchFor;
              }
            }
          }

          if (resolveToFifth) {
            for (const r of resolveToFifth) {
              if (p === r.from) {
                if (!newPitches.includes(r.to))
                  newPitches.push(r.to);

                continue pitchFor;
              }
            }
          }

          if (apoyatura9) {
            if (p === changes[0].event.pitch.spn.pitch)
              continue;
          }

          newPitches.push(p);
        }

        for (const p of playingAtBeatPitches) {
          if (!newPitches.includes(p)
          && (isThird(newPitches[0], p) || isFifth(newPitches[0], p)))
            newPitches.push(p);
        }

        const chord = Chords.fromPitches(...newPitches);

        this.addChord(chord, interval);
        continue;
      }

      const beatInBar = this.getBeatInBar(chords[j].interval.from);
      const isWeakTime = (beatInBar >= 1.75 && beatInBar < 2.75) || beatInBar >= 3.75;

      if (isWeakTime) {
        // Principalmente, que se ha cambiado tercera o quinta en tiempo débil y no es apoyatura, y se está inspeccionando desde un tiempo no-débil
        const beatInBarChecking = this.getBeatInBar(time);
        const isWeakTimeChecking = (beatInBarChecking >= 1.75 && beatInBarChecking < 2.75) || beatInBarChecking >= 3.75;

        if (!isWeakTimeChecking) {
          const realInterval = intervalBetween(
            chords[j - 1].interval.from,
            chords[j].interval.to,
          );

          this.addChord(lastChord, realInterval);
          continue;
        }
      }
    }
  }

  getAttackNodes(time: Time, nodes: TimelineNode<PerceptualMidiNote>[]): TimelineNode<PerceptualMidiNote>[] {
    const playingAtBeat = nodes.filter(n=> {
      if (n.interval.to < time + chordSimultaneityThrehold && n.interval.from < time - 50)
        return false;

      return (Math.abs(n.interval.from - time) < 50 || (n.interval.to > time + 50 && n.interval.from < time));
    } );

    return playingAtBeat;
  }
}

function isThird(root: Pitch, p: Pitch): boolean {
  const minor = root.withAdd(Intervals.m3);
  const major = root.withAdd(Intervals.M3);
  const sus2 = root.withAdd(Intervals.M2);
  const sus4 = root.withAdd(Intervals.P4);

  switch (p) {
    case minor:
    case major:
    case sus2:
    case sus4:
      return true;
    default:
      return false;
  }
}

function isChangedThird(chord: Chord, pitches: Pitch[]): boolean {
  const { root } = chord;
  const minor = root.withAdd(Intervals.m3);
  const major = root.withAdd(Intervals.M3);
  const third = [major, minor];

  for (const p of third) {
    if (chord.has(p)) {
      if (!pitches.includes(p) && third.some(t => t !== p && pitches.includes(t)))
        return true;
      else
        break;
    }
  }

  return false;
}

function getThirdDissambiguation(chord: Chord, pitches: Pitch[]): Pitch | null {
  const { root } = chord;
  const minor = root.withAdd(Intervals.m3);
  const major = root.withAdd(Intervals.M3);
  const sus2 = root.withAdd(Intervals.M2);
  const sus4 = root.withAdd(Intervals.P4);
  const thirds: PitchArray = [major, minor, sus2, sus4];

  if (chord.hasAny(...thirds))
    return null;

  for (const t of thirds) {
    if (pitches.includes(t))
      return t;
  }

  return null;
}
function getFifthDissambiguation(chord: Chord, pitches: Pitch[]): Pitch | null {
  const { root } = chord;
  const P5 = root.withAdd(Intervals.P5);
  const fifths: PitchArray = [P5];

  if (chord.hasAny(...fifths))
    return null;

  for (const t of fifths) {
    if (pitches.includes(t))
      return t;
  }

  return null;
}

type Resolution = {
  from: Pitch;
  to: Pitch;
};

function getThirdResolution(chord: Chord, tonicChord: Chord, pitches: Pitch[]): Resolution[] {
  const tonicRoot = tonicChord.root;
  const minor = tonicRoot.withAdd(Intervals.m3);
  const major = tonicRoot.withAdd(Intervals.M3);
  const sus2 = tonicRoot.withAdd(Intervals.M2);
  const sus4 = tonicRoot.withAdd(Intervals.P4);
  const sus = [sus2, sus4];
  const solved = [minor, major];
  const ret: Resolution[] = [];

  for (const from of sus) {
    if (chord.has(from)) {
      if (!pitches.includes(from)) {
        for (const to of solved) {
          if (!chord.has(to) && pitches.includes(to)) {
            ret.push( {
              from: from,
              to: to,
            } );
          }
        }
      }
    }
  }

  return ret;
}

function isFifth(root: Pitch, p: Pitch): boolean {
  const diminished = root.withAdd(Intervals.d5);
  const perfect = root.withAdd(Intervals.P5);
  const augmented = root.withAdd(Intervals.m6);

  switch (p) {
    case diminished:
    case perfect:
    case augmented:
      return true;
    default:
      return false;
  }
}

function isChangedFifth(chord: Chord, pitches: Pitch[]): boolean {
  const { root } = chord;
  const diminished = root.withAdd(Intervals.d5);
  const perfect = root.withAdd(Intervals.P5);
  const augmented = root.withAdd(Intervals.m6);
  const fifth = [perfect, diminished, augmented];

  for (const p of fifth) {
    if (chord.has(p)) {
      if (!pitches.includes(p) && fifth.some(t => t !== p && pitches.includes(t)))
        return true;
      else
        break;
    }
  }

  return false;
}

function getFifthResolution(chord: Chord, tonicChord: Chord, pitches: Pitch[]): Resolution[] {
  const tonicChordRoot = tonicChord.root;
  const diminished = tonicChordRoot.withAdd(Intervals.d5);
  const perfect = tonicChordRoot.withAdd(Intervals.P5);
  const augmented = tonicChordRoot.withAdd(Intervals.m6);
  const sus = [diminished, augmented];
  const solved = [perfect];
  const ret: Resolution[] = [];

  for (const from of sus) {
    if (chord.has(from)) {
      if (!pitches.includes(from)) {
        for (const to of solved) {
          if (!chord.has(to) && pitches.includes(to)) {
            ret.push( {
              from: from,
              to: to,
            } );
          }
        }
      }
    }
  }

  return ret;
}

function splitInterval(interval: Interval<number>, values: number[]): Interval<Time>[] {
  values.sort((a, b)=>a - b);
  const intervals: Interval<Time>[] = [];
  const beginIsBeat = interval.from === values[0];

  if (beginIsBeat) {
    if (values.length < 2)
      return [interval];

    intervals.push(intervalBetween(interval.from, values[0]));
  }

  for (let i = 1; i < values.length - 1; i++) {
    const t0 = values[i - 1];
    const t1 = values[i];
    const beatInterval = intervalBetween(t0, t1);

    intervals.push(beatInterval);
  }

  if (values.length > 2)
    intervals.push(intervalBetween(intervals.at(-1)!.to, interval.to));

  return intervals;
}

type PossibleApoyature = {
  from: Pitch;
  to: Pitch;
};
function isPossibleApoyature(lastChordNode: TimelineNode<Chord>, pitches: PitchArray): PossibleApoyature | null {
  const lastChord = lastChordNode.event;
  const { root } = lastChord;
  const M2 = root.withAdd(Intervals.M2);
  const M3 = root.withAdd(Intervals.M3);
  const m3 = root.withAdd(Intervals.m3);
  const P4 = root.withAdd(Intervals.P4);
  const P5 = root.withAdd(Intervals.P5);
  const d5 = root.withAdd(Intervals.d5);
  const M6 = root.withAdd(Intervals.M6);
  const m6 = root.withAdd(Intervals.m6);
  const sortedPitches = sortPitches(pitches);
  const newChord = Chords.fromPitches(...sortedPitches);
  const newChordVoicing = newChord.toVoicing();
  const newIsMajorOrMinor = newChordVoicing === Voicings.TRIAD_MAJOR || newChordVoicing === Voicings.TRIAD_MINOR;

  if (!lastChord.has(M3) && lastChord.has(P4) && pitches.includes(M3) && !pitches.includes(P4) && newIsMajorOrMinor) {
    return {
      from: P4,
      to: M3,
    };
  }

  if (!lastChord.has(m3) && pitches.includes(m3) && newIsMajorOrMinor) {
    let from;

    if (lastChord.has(P4) && !pitches.includes(P4))
      from = P4;
    else if (lastChord.has(M2) && !pitches.includes(M2))
      from = M2;

    if (from !== undefined) {
      return {
        from,
        to: m3,
      };
    }
  }

  if (!lastChord.has(P5) && pitches.includes(P5) && newIsMajorOrMinor) {
    let from;

    if (lastChord.has(M6) && !pitches.includes(M6))
      from = M6;
    else if (lastChord.has(m6) && !pitches.includes(m6))
      from = m6;
    else if (lastChord.has(d5) && !pitches.includes(d5))
      from = d5;

    if (from !== undefined) {
      return {
        from,
        to: P5,
      };
    }
  }

  return null;
}

function sortPitches(pitches: PitchArray): PitchArray {
  const array: PitchArray = [pitches[0]];

  for (let i = 1; i < 12; i++) {
    const p = array[0].withAdd(i);

    if (pitches.includes(p))
      array.push(p);
  }

  return array;
}
