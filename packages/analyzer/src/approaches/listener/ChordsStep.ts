/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { Interval, intervalBetween, stringifyInterval } from "datils/math/intervals";
import { Time, TimelineNode } from "@datune/utils";
import { Chord, PitchArray, Chords, Intervals as I, Pitch, Spn, Interval as CInterval, Spns as N, Scales, Keys as K, Pitches, PitchSets as PS, Key, IntervalArray, Scale, Degree } from "@datune/core";
import { getHarmonicRegions, lowestDistanceChord } from "approaches/chord-distances";
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
    const lastChord = lastChordNode.event;
    const lastChordPitches = lastChord.pitches;
    const lastChordSpns = this.#getPerceptualMidiNodesFromChord(lastChordNode, interval.to).map(n=>n.event.pitch.spn);
    let spns: Spn[] = [
      ...nodes.map(n=>n.event.pitch.spn).filter(s=>lastChord.has(s.pitch)),
      ...lastChordSpns,
    ];
    const isLastChordThirdAmbiguous = lastChordPitches.every(pitch => {
      return !isThird(lastChord, pitch);
    } );
    const isLastChordFifthAmbiguous = lastChordPitches.every(pitch => {
      return !isFifth(lastChord, pitch);
    } );
    let changeChord = false;
    let newBassSpn = nodes[0].event.pitch.spn;

    for (const n of nodes) {
      const { spn } = n.event.pitch;
      const { pitch } = spn;

      if (+spn < +newBassSpn)
        newBassSpn = spn;

      if (spns.includes(spn))
        continue;

      const definedThird = isLastChordThirdAmbiguous && isThird(lastChord, pitch);
      const definedFifth = isLastChordFifthAmbiguous && isFifth(lastChord, pitch);

      if (definedFifth || definedThird) {
        spns.push(spn);
        changeChord = true;
      }
    }

    if (newBassSpn.pitch !== lastChord.bass)
      changeChord = true;

    if (changeChord) {
      let newChord = fromSpnsGuessChord( {
        lastChord,
        key: this.analyzer.listenerState.tonal.key,
      }, ...spns);
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
    this.lastChordNode = this.analyzer.results.chordTimeline.add( {
      interval,
      event: chord,
    } )[0];

    this.analyzer.log(`Add chord: ( ${chord.toString()} ) at ${stringifyInterval(interval)}`);

    return this.lastChordNode;
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

    const attackingSpns = validNodes
      .map(n=>n.event.pitch.spn);
    let attackingChord = fromSpnsGuessChord( {
      lastChord,
      key: this.analyzer.listenerState.tonal.key,
    }, ...attackingSpns);
    const { root } = attackingChord;
    const changedRoot = root !== lastChord.root;
    const changedThird = isChangedThird(lastChord, attackingChord.pitches);
    const changedFifth = isChangedFifth(lastChord, attackingChord.pitches);
    const change = (changedRoot || changedThird || changedFifth);

    if (change)
      return attackingChord;

    const thirdDissambiguation = getThirdDissambiguation(lastChord, attackingAtBeat);
    const fifthDissambiguation = getFifthDissambiguation(lastChord, attackingAtBeat);
    const dissToAdd = [];

    if (thirdDissambiguation.length > 0)
      dissToAdd.push(...thirdDissambiguation);

    if (fifthDissambiguation.length > 0)
      dissToAdd.push(...fifthDissambiguation);

    const lastChordNodes = this.#getPerceptualMidiNodesFromChord(lastChordNode, time);
    const diffTime = time - lastChordNode.interval.from;
    const beatTime = this.analyzer.listenerState.beat.duration;
    const isPossibleApoyature = (beatTime === undefined || diffTime <= beatTime) && getResolution(lastChordNode.event, lastChordNodes, attackingAtBeat).length > 0;

    if (isPossibleApoyature) {
      const pitches = getPitchesFromNodes(attackingAtBeat, dissToAdd) as PitchArray;

      return Chords.from( {
        pitchSet: PS.fromPitches(...pitches),
        root,
        bass: pitches[0],
      } );
    }

    if (dissToAdd.length > 0) {
      const pitches = getPitchesFromNodes(lastChordNodes, dissToAdd) as PitchArray;

      return Chords.from( {
        pitchSet: PS.fromPitches(...pitches),
        root,
        bass: pitches[0],
      } );
    }

    return null;
  }

  #getPerceptualMidiNodesFromChord(chordNode: TimelineNode<Chord>, limit: number): TimelineNode<PerceptualMidiNote>[] {
    const interval = intervalBetween(chordNode.interval.from, limit);
    const chord = chordNode.event;
    const nodes = this.analyzer.perceptualTimeline.timeline.getAtInterval(interval);

    return nodes.filter(n=> chord.has(n.event.pitch.spn.pitch));
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
      const currentChordNode = chords[j];
      const lastChord = lastChordNode.event;
      const fuseInterval = intervalBetween(
        Math.max(lastBarTime, lastChordNode.interval.from),
        currentChordNode.interval.to,
      );
      const nodes = this.analyzer.perceptualTimeline.timeline.getAtInterval(
        intervalBetween(
          currentChordNode.interval.from,
          Math.min(time, currentChordNode.interval.to),
        ),
      );
      const lastChordPitchesNodes = this.#getPerceptualMidiNodesFromChord(lastChordNode, chords[j].interval.from);
      const rootChanged = currentChordNode.event.root !== lastChord.root;

      if (rootChanged)
        continue;

      const chordPitchesNodes = this.#getPerceptualMidiNodesFromChord(currentChordNode, chords[j + 1]?.interval.from ?? time);
      const chordPitchesNodesSpns = chordPitchesNodes.map(n=>n.event.pitch.spn);
      const thirdDissambiguation = getThirdDissambiguation(lastChord, chordPitchesNodes);
      const fifthDissambiguation = getFifthDissambiguation(lastChord, chordPitchesNodes);
      const lastChordWithDissambiguationsNodes = [...lastChordPitchesNodes, ...thirdDissambiguation, ...fifthDissambiguation]
        .sort((a, b) => +a.event.pitch.spn - +b.event.pitch.spn);
      let apoyatureResolutions = getResolution(lastChord, lastChordPitchesNodes, nodes);
      const lastChordLength = getLengthInBar(lastChordNode.interval, barIntervalUntilNow);
      const currentChordLength = getLengthInBar(currentChordNode.interval, barIntervalUntilNow);
      const perfectApoyatureResolution = [I.P1, I.m3, I.M3, I.P5, I.P8];
      const isApoyatureResolution = apoyatureResolutions.length > 0
      && (currentChordLength > lastChordLength
        || (currentChordLength === lastChordLength && apoyatureResolutions.some(r=>lastChordPitchesNodes.some(n=> perfectApoyatureResolution.includes(+r.to - +n.event.pitch))))
      );
      let newPitches: Spn[] = [] as any;
      const lastChordWithDissambiguationsNodesSpn = lastChordWithDissambiguationsNodes
        .map(n=>n.event.pitch.spn);

      if (isApoyatureResolution) {
        pitchFor: for (const spn of lastChordWithDissambiguationsNodesSpn) {
          for (const r of apoyatureResolutions) {
            if (spn === r.from && chordPitchesNodesSpns.includes(r.to)) {
              if (!newPitches.includes(r.to))
                newPitches.push(r.to);

              continue pitchFor;
            }
          }

          if (!newPitches.includes(spn))
            newPitches.push(spn);
        }

        for (const n of nodes) {
          const s = n.event.pitch.spn;
          const pitches = newPitches.map(np=>np.pitch).filter((value, index, self) => self.indexOf(value) === index) as PitchArray;
          const newPitchesChord = Chords.fromPitches(...pitches);

          if (!newPitches.includes(s)
          && (isThird(newPitchesChord, s.pitch) || isFifth(newPitchesChord, s.pitch)))
            newPitches.push(s);
        }
      } else if (thirdDissambiguation.length > 0 || fifthDissambiguation.length > 0)
        newPitches.push(...lastChordWithDissambiguationsNodesSpn);

      if (newPitches.length > 0) {
        const pitches = newPitches.map(s=>s.pitch).filter((value, index, self) => self.indexOf(value) === index) as PitchArray;
        const chord = Chords.from( {
          pitchSet: PS.fromPitches(...pitches),
          root: lastChord.root,
          bass: pitches[0],
        } );
        const addedChordNode = this.addChord(chord, fuseInterval);

        chords.splice(j - 1, 2, addedChordNode);
        j--;
        continue;
      }

      // Principalmente, que se ha cambiado tercera o quinta en tiempo débil y no es apoyatura, y se está inspeccionando desde un tiempo no-débil
      const beatInBarChecking = this.getBeatInBar(time);
      const isWeakTimeChecking = (beatInBarChecking >= 1.75 && beatInBarChecking < 2.75) || beatInBarChecking >= 3.75;

      if (!isWeakTimeChecking) {
        const realInterval = intervalBetween(
          chords[j - 1].interval.from,
          chords[j].interval.to,
        );
        const addedChordNode = this.addChord(lastChord, realInterval);

        chords.splice(j - 1, 2, addedChordNode);
        j--;
        continue;
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

function isThird(chord: Chord, p: Pitch): boolean {
  const { root } = chord;
  const minor = root.withShifted(I.m3);
  const major = root.withShifted(I.M3);
  const sus2 = root.withShifted(I.M2);
  const sus4 = root.withShifted(I.P4);

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

function isChangedThird(chord: Chord, pitches: Readonly<Pitch[]>): boolean {
  const { root } = chord;
  const minor = root.withShifted(I.m3);
  const major = root.withShifted(I.M3);
  const sus2 = root.withShifted(I.M2);
  const sus4 = root.withShifted(I.P4);
  const third = [major, minor, sus2, sus4];

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

function getThirdDissambiguation(chord: Chord, nodes: TimelineNode<PerceptualMidiNote>[]): TimelineNode<PerceptualMidiNote>[] {
  const { root } = chord;
  const minor = root.withShifted(I.m3);
  const major = root.withShifted(I.M3);
  const sus2 = root.withShifted(I.M2);
  const sus4 = root.withShifted(I.P4);
  const thirds: PitchArray = [major, minor, sus2, sus4];
  const ret: TimelineNode<PerceptualMidiNote>[] = [];

  if (chord.hasAny(...thirds))
    return ret;

  for (const t of thirds) {
    const ns = nodes.filter(n=>n.event.pitch.spn.pitch === t);

    ret.push(...ns);
  }

  return ret;
}
function getFifthDissambiguation(chord: Chord, nodes: TimelineNode<PerceptualMidiNote>[]): TimelineNode<PerceptualMidiNote>[] {
  const { root } = chord;
  const P5 = root.withShifted(I.P5);
  const fifths: PitchArray = [P5];
  const ret: TimelineNode<PerceptualMidiNote>[] = [];

  if (chord.hasAny(...fifths))
    return ret;

  for (const t of fifths) {
    const ns = nodes.filter(n=>n.event.pitch.spn.pitch === t);

    ret.push(...ns);
  }

  return ret;
}

type Resolution = {
  from: Spn;
  to: Spn;
};

function getTriadFromScaleIndex(scale: Scale, index: number): IntervalArray {
  const array = scale.rootIntervals;
  const rootIndex = index;
  const thirdIndex = (index + 2) % array.length;
  const fifthIndex = (index + 4) % array.length;
  const triad = [array[rootIndex], array[thirdIndex], array[fifthIndex]] as IntervalArray;

  return triad;
}

// TODO: provisional hasta Tonal Pitch Space
function getChordInHarmony(chord: Chord): Chord {
  const scale = Scales.MINOR;
  const key = K.FFm;
  const index = key.pitches.indexOf(chord.root);
  const triad = getTriadFromScaleIndex(scale, index);
  const pitches = triad.map(i=>Pitches.shift(key.root, i)) as PitchArray;

  return Chords.from( {
    pitchSet: PS.fromPitches(...pitches),
    root: chord.root,
    bass: chord.bass,
  } );
}

function getResolution(chord: Chord, chordNodes: TimelineNode<PerceptualMidiNote>[], nodes: TimelineNode<PerceptualMidiNote>[]): Resolution[] {
  const ret: Resolution[] = [];
  const chordSpn = chordNodes
    .map(n=>n.event.pitch.spn)
    .sort((a, b) => +a - +b);
  const nodesSpn = nodes
    .map(n=>n.event.pitch.spn)
    .sort((a, b) => +a - +b);
  const chordInHarmony = getChordInHarmony(chord);
  const pitchRoot = chordInHarmony.root;
  const noRootSpns = chordSpn.filter(n=>n.pitch !== pitchRoot);
  const ta = getTensionApoyature(chordInHarmony, chordSpn);

  for (const t of ta) {
    const tensionSpn = t.tension;

    if (noRootSpns.includes(tensionSpn)) {
      const resolutions = getApoyatureResolutions(tensionSpn, t.interval);

      for (const r of resolutions) {
        if (nodesSpn.includes(r)
          && !nodesSpn.includes(tensionSpn)
        ) {
          ret.push( {
            from: tensionSpn,
            to: r,
          } );
        }
      }
    }
  }

  return ret;
}

type TensionApoyature = {
  tension: Spn;
  interval: CInterval;
};
function getTensionApoyature(chord: Chord, chordSpn: Spn[]): TensionApoyature[] {
  const ret: TensionApoyature[] = [];
  const { root } = chord;

  for (const spn of chordSpn) {
    const spnPitch = spn.pitch;

    if (!chord.pitches.includes(spnPitch)
      && chord.pitches.some(p=>Math.abs(I.between(p, spnPitch)) <= 2)) {
      ret.push( {
        interval: I.betweenNext(root, spnPitch) % 12,
        tension: spn,
      } );
    }
  }

  return ret;
}

function getApoyatureResolutions(spn: Spn, rootInterval: CInterval): Spn[] {
  let ret: (Spn | null)[];

  switch (rootInterval) {
    case I.m2:
    case I.m9:
      ret = [N.shiftDown(spn, I.m2)];
      break;
    case I.M2:
    case I.M9:
      ret = [
        N.shift(spn, I.m2),
        N.shiftDown(spn, I.M2),
        N.shift(spn, I.M2),
      ];
      break;
    case I.P4:
    case I.P11:
      ret = [
        N.shiftDown(spn, I.m2),
        N.shiftDown(spn, I.M2),
        N.shift(spn, I.M2),
      ];
      break;
    case I.d5:
      ret = [
        N.shift(spn, I.m2),
        N.shiftDown(spn, I.M2),
      ];
      break;
    case I.m6:
      ret = [
        N.shiftDown(spn, I.m2),
      ];
      break;
    case I.M6:
      ret = [
        N.shiftDown(spn, I.M2),
      ];
      break;
    case I.m7:
      ret = [
        N.shiftDown(spn, I.m2),
        N.shift(spn, I.M2),
      ];
      break;
    case I.M7:
      ret = [
        N.shift(spn, I.m2),
        N.shiftDown(spn, I.M2),
      ];
      break;
    default:
      return [];
  }

  return ret.filter((s): s is Spn => s !== null);
}

function isFifth(chord: Chord, p: Pitch): boolean {
  const { root } = chord;
  const diminished = root.withShifted(I.d5);
  const perfect = root.withShifted(I.P5);
  const augmented = root.withShifted(I.m6);
  const M3 = root.withShifted(I.M3);

  switch (p) {
    case perfect:
    case diminished:
      return true;
    case augmented:
      if (chord.has(M3))
        return true;

      return false;
    default:
      return false;
  }
}

function isChangedFifth(chord: Chord, pitches: Readonly<Pitch[]>): boolean {
  const { root } = chord;
  const diminished = root.withShifted(I.d5);
  const perfect = root.withShifted(I.P5);
  const augmented = root.withShifted(I.m6);
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

function getPitchesFromNodes(
  nodes: TimelineNode<PerceptualMidiNote>[],
  toAdd: TimelineNode<PerceptualMidiNote>[] = [],
): Pitch[] {
  const sortedBase = nodes.sort((a, b) => +a.event.pitch - +b.event.pitch);

  return [...sortedBase, ...toAdd]
    .filter(
      (value, index, self) => self.findIndex(n=>n.event.pitch.spn.pitch === value.event.pitch.spn.pitch) === index,
    )
    .sort((a, b) => +a.event.pitch - +b.event.pitch)
    .map(n=>n.event.pitch.spn.pitch) as PitchArray;
}

function getLengthInBar(interval: Interval<Time>, barInterval: Interval<Time>): number {
  const to = Math.min(interval.to, barInterval.to);
  const from = Math.max(interval.from, barInterval.from);

  return to - from;
}

// TODO: quitar esto adhock cuando se implemente Tonal Pitch Space
type GuessChordContext = {
  lastChord?: Chord;
  key?: Key;
};
function fromSpnsGuessChord(ctx: GuessChordContext, ...spns: Spn[]): Chord {
  // TODO: lo más causal y no heurístico sería usar Tonal Pitch Space. Elegir la interpretación de menor coste
  const pitches = spns
    .sort((a, b) => +a - +b)
    .map(n=>n.pitch) as PitchArray;
  let root: Pitch | undefined;
  const { lastChord, key } = ctx;
  const bass = pitches[0];
  const pitchSet = PS.fromPitches(...pitches);

  if (lastChord && lastChord.hasAll(...pitches))
    root = lastChord.root;
  else if (key) {
    const harmonicRegions = getHarmonicRegions(key);
    let lastDegree: Degree | undefined;

    if (lastChord) {
      const rootInterval = I.betweenNext(key.root, lastChord.root);

      lastDegree = I.cyclicOctave(rootInterval);
    }

    const chord = lowestDistanceChord(pitchSet, {
      bass,
      lastDegree,
      harmonicRegions,
      lastChord: ctx.lastChord,
    } );

    root = chord.root;
  }

  if (root === undefined)
    root = bass;

  let ret = Chords.from( {
    pitchSet,
    root,
    bass,
  } );

  return ret;
}
