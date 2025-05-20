/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { Interval, intervalBetween, stringifyInterval } from "datils/math/intervals";
import { Time, TimelineNode } from "@datune/utils";
import { Chord, PitchArray, Chords, Intervals as I, Pitch, Spn, Interval as CInterval, Spns } from "@datune/core";
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

    for (const n of nodes) {
      const { spn } = n.event.pitch;
      const { pitch } = spn;

      if (spns.includes(spn))
        continue;

      const definedThird = isLastChordThirdAmbiguous && isThird(lastChord, pitch);
      const definedFifth = isLastChordFifthAmbiguous && isFifth(lastChord, pitch);

      if (definedFifth || definedThird) {
        spns.push(spn);
        changeChord = true;
      }
    }

    let newChord = fromSpnsGuessRoot(...spns);
    // TODO: quitar esto adhock cuando se implemente Tonal Pitch Space
    const newChordRI = newChord.toVoicing().rootIntervals.map(ri=>ri % 12);
    const arrays1 = [[0, 5, 9, 4, 2], [0, 5, 3], [0, 5, 8], [0, 4, 7, 9]];
    const arrays2 = [[0, 8, 5]];
    const includes1 = arrays1.some(a=>a.every((ic, i)=>newChordRI.indexOf(ic) === i));
    const includes2 = arrays2.some(a=>a.every((ic, i)=>newChordRI.indexOf(ic) === i));

    if (includes1)
      newChord = newChord.withRootIndex(1);

    if (includes2)
      newChord = newChord.withRootIndex(2);

    if (!changeChord) {
      const isSameOrder = respetaOrden(newChord.pitches, lastChord.pitches);

      if (!isSameOrder)
        changeChord = true;
    }

    if (changeChord) {
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

    const attackingSpns = validNodes
      .map(n=>n.event.pitch.spn);
    let attackingChord = fromSpnsGuessRoot(...attackingSpns);
    // TODO: quitar esto adhock cuando se implemente Tonal Pitch Space
    const newChordRI = attackingChord.toVoicing().rootIntervals.map(ri=>ri % 12);
    const arrays1 = [[0, 5, 3], [0, 5, 9], [0, 4, 7, 9]];
    const arrays2 = [[0, 8, 5]];
    const includes1 = arrays1.some(a=>a.every((ic, i)=>newChordRI.indexOf(ic) === i));
    const includes2 = arrays2.some(a=>a.every((ic, i)=>newChordRI.indexOf(ic) === i));

    if (includes1)
      attackingChord = attackingChord.withRootIndex(1);

    if (includes2)
      attackingChord = attackingChord.withRootIndex(2);

    const changedRoot = attackingChord.root !== lastChord.root;
    const changedThird = isChangedThird(lastChord, attackingChord.pitches);
    const changedFifth = isChangedFifth(lastChord, attackingChord.pitches);
    const change = (changedRoot || changedThird || changedFifth);

    if (change)
      return attackingChord;

    const { root } = attackingChord;
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
        pitches,
        rootIndex: pitches.indexOf(root),
      } );
    }

    if (dissToAdd.length > 0) {
      const pitches = getPitchesFromNodes(lastChordNodes, dissToAdd) as PitchArray;

      return Chords.from( {
        pitches,
        rootIndex: pitches.indexOf(root),
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
      const playingAtBeat = this.getAttackNodes(currentChordNode.interval.from, nodes);
      const lastChordPitchesNodes = this.#getPerceptualMidiNodesFromChord(lastChordNode, chords[j].interval.from);
      // get lowest +spn from lastChordPitchesNodes:
      const [lastChordBassSpn] = lastChordPitchesNodes
        .filter(n=>n.event.pitch.spn.pitch === lastChord.root)
        .map(n=>n.event.pitch.spn)
        .sort((a, b) => +a - +b);
      const rootChanged = lastChordBassSpn
        && !playingAtBeat
          .map(n=>n.event.pitch.spn)
          .includes(lastChordBassSpn);

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
        || (currentChordLength === lastChordLength && apoyatureResolutions.some(r=>lastChordPitchesNodes.some(n=>n.event.pitch.spn.pitch === lastChordBassSpn.pitch && perfectApoyatureResolution.includes(+r.to - +n.event.pitch))))
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
          pitches,
          rootIndex: pitches.indexOf(lastChord.root),
        } );
        const addedChordNode = this.addChord(chord, fuseInterval);

        chords.splice(j - 1, 2, addedChordNode);
        j--;
        continue;
      }

      const beatInBar = this.getBeatInBar(chords[j].interval.from);
      const isWeakTime = (beatInBar >= 1.75 && beatInBar < 2.75) || beatInBar >= 3.75;

      if (true) {
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
  const minor = root.withAdd(I.m3);
  const major = root.withAdd(I.M3);
  const sus2 = root.withAdd(I.M2);
  const sus4 = root.withAdd(I.P4);

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
  const minor = root.withAdd(I.m3);
  const major = root.withAdd(I.M3);
  const sus2 = root.withAdd(I.M2);
  const sus4 = root.withAdd(I.P4);
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
  const minor = root.withAdd(I.m3);
  const major = root.withAdd(I.M3);
  const sus2 = root.withAdd(I.M2);
  const sus4 = root.withAdd(I.P4);
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
  const P5 = root.withAdd(I.P5);
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

function getResolution(chord: Chord, chordNodes: TimelineNode<PerceptualMidiNote>[], nodes: TimelineNode<PerceptualMidiNote>[]): Resolution[] {
  const ret: Resolution[] = [];
  const chordSpn = chordNodes
    .map(n=>n.event.pitch.spn)
    .sort((a, b) => +a - +b);
  const nodesSpn = nodes
    .map(n=>n.event.pitch.spn)
    .sort((a, b) => +a - +b);
  const rootSpn = chordSpn.find(s=>s.pitch === chord.root)!;
  const pitchRoot = rootSpn.pitch;
  const noRootSpns = chordSpn.filter(n=>n.pitch !== pitchRoot);
  const ta = getTensionApoyature(rootSpn, chordSpn);

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
function getTensionApoyature(rootSpn: Spn, chordSpn: Spn[]): TensionApoyature[] {
  const ret: TensionApoyature[] = [];
  const pitchRoot = rootSpn.pitch;
  const rootSpns = chordSpn.filter(n=>n.pitch === pitchRoot);
  const intervals = [
    I.m2,
    I.M2,
    I.P4,
    I.d5,
    I.m6,
    I.M6,
    I.m7,
    I.M7,
    I.m9,
    I.M9,
    I.P11,
  ];

  for (const rn of rootSpns) {
    for (const i of intervals) {
      const tensionSpn = Spns.add(rn, i);

      if (tensionSpn === null)
        continue;

      if (chordSpn.includes(tensionSpn)) {
        ret.push( {
          interval: i,
          tension: tensionSpn,
        } );
      }
    }
  }

  return ret;
}

function getApoyatureResolutions(spn: Spn, rootInterval: CInterval): Spn[] {
  let ret: (Spn | null)[];

  switch (rootInterval) {
    case I.m2:
    case I.m9:
      ret = [Spns.sub(spn, I.m2)];
      break;
    case I.M2:
    case I.M9:
      ret = [
        Spns.add(spn, I.m2),
        Spns.sub(spn, I.M2),
        Spns.add(spn, I.M2),
      ];
      break;
    case I.P4:
    case I.P11:
      ret = [
        Spns.sub(spn, I.m2),
        Spns.sub(spn, I.M2),
        Spns.add(spn, I.M2),
      ];
      break;
    case I.d5:
      ret = [
        Spns.add(spn, I.m2),
        Spns.sub(spn, I.M2),
      ];
      break;
    case I.m6:
      ret = [
        Spns.sub(spn, I.m2),
      ];
      break;
    case I.M6:
      ret = [
        Spns.sub(spn, I.M2),
      ];
      break;
    case I.m7:
      ret = [
        Spns.sub(spn, I.m2),
        Spns.add(spn, I.M2),
      ];
      break;
    case I.M7:
      ret = [
        Spns.add(spn, I.m2),
        Spns.sub(spn, I.M2),
      ];
      break;
    default:
      return [];
  }

  return ret.filter((s): s is Spn => s !== null);
}

function isFifth(chord: Chord, p: Pitch): boolean {
  const { root } = chord;
  const diminished = root.withAdd(I.d5);
  const perfect = root.withAdd(I.P5);
  const augmented = root.withAdd(I.m6);
  const M3 = root.withAdd(I.M3);

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

function isChangedFifth(chord: Chord, pitches: Pitch[]): boolean {
  const { root } = chord;
  const diminished = root.withAdd(I.d5);
  const perfect = root.withAdd(I.P5);
  const augmented = root.withAdd(I.m6);
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

/**
 * Comprueba que, para los valores comunes entre subset y superset,
 * el orden relativo en superset respeta el orden dado en subset.
 *
 * @param subset  Array “patrón” cuyos valores deben seguir su orden.
 * @param superset Array en el que buscamos respetar ese orden.
 * @returns true si no hay inversión de orden; false en caso contrario.
 */
function respetaOrden(subset: Pitch[], superset: Pitch[]): boolean {
  // Índice del último elemento “anclado” de subset
  let lastIndex = -1;

  for (const x of superset) {
    // Encuentra todas las posiciones de x en subset
    const posiciones = subset
      .map((v, i) => (v === x ? i : -1))
      .filter(i => i !== -1);

    if (posiciones.length === 0) {
      // x no está en subset → lo ignoramos
      continue;
    }

    // De las posiciones donde aparece x, nos quedamos
    // solo con las que vienen a partir de lastIndex
    const validas = posiciones.filter(i => i >= lastIndex);

    if (validas.length === 0) {
      // x aparece en subset pero siempre antes de lastIndex:
      // hay inversión de orden
      return false;
    }

    // Anclamos en la posición más temprana válida
    // eslint-disable-next-line prefer-destructuring
    lastIndex = validas[0];
  }

  return true;
}

function fromSpnsGuessRoot(...spns: Spn[]): Chord {
  // TODO: lo más causal y no heurístico sería usar Tonal Pitch Space. Elegir la interpretación de menor coste
  const pitches = spns
    .sort((a, b) => +a - +b)
    .map(n=>n.pitch) as PitchArray;
  const root = pitches[0];// detectRootParker(pitches);
  const pitchesNoRepeat = pitches.filter((value, index, self) => self.indexOf(value) === index) as PitchArray;
  const rootIndex = pitchesNoRepeat.indexOf(root);

  return Chords.from( {
    pitches: pitchesNoRepeat,
    rootIndex,
  } );
}
