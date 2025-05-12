import { TimelineNode } from "@datune/utils";
import { Interval, intervalBetween, IntervalBound } from "datils/math/intervals";
import { Key, Keys, Scales, SpnArray, Voicings } from "@datune/core";
import { MidiNote, MidiTimelineNode } from "@datune/midi";
import { SingleStepArray, VoiceLeadings } from "@datune/core-ext/voice-leading";
import { rootChord3 } from "@datune/core/keys/chromatic/modifiers";
import { assertIsDefined } from "datils/datatypes/nullish";
import { Gravitation } from "timelines/GravitationTimeline";
import { type Analyzer } from "./ListenerAnalyzer";
import { classifyNodes } from "./utils";

type Props = {
  interval: Interval<number>;
  analyzer: Analyzer;
};

type Nodes = Readonly<{
  all: Readonly<MidiTimelineNode[]>;
  startNodes: Readonly<MidiTimelineNode[]>;
  endNodes: Readonly<MidiTimelineNode[]>;
  sustainedNodes: Readonly<MidiTimelineNode[]>;
  activeNodes: Readonly<MidiTimelineNode[]>;
}>;

export class WindowProcess {
  interval: Interval<number>;

  nodes!: Nodes;

  analyzer: Analyzer;

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

  extendReadNotes(realTimeNodes: TimelineNode<MidiNote>[]) {
    const extensableNodes = this.analyzer.realtimeMidiNotesTimeline.getAt(this.interval.from);

    for (const n of extensableNodes) {
      for (const rn of realTimeNodes) {
        if (n.event === rn.event) {
          this.analyzer.realtimeMidiNotesTimeline.extendNode(
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
        this.analyzer.realtimeMidiNotesTimeline.add(n);
    }
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

    this.extendReadNotes(realTimeNodes);

    const readNodes = this.analyzer.realtimeMidiNotesTimeline.getAtInterval(this.interval);
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
    this.analyzer.perceptualTimeline.tick( {
      time: this.interval.to,
      events: this.nodes.activeNodes.map(n=>n.event),
    } );
  }

  updateChordsTimeline() {
    this.analyzer.chordsStep.tick( {
      window: this,
    } );
  }

  updateGravitationTimeline() {
    if (!(this.hasAnyEndNode() || this.hasAnyStartNode()))
      return;

    const { currentGravitationNodes } = this.analyzer.listenerState;

    if (this.nodes.startNodes.length > 0) {
      const gravitations: Gravitation[] = [];
      const spns = this.nodes.startNodes.map(n=>n.event.pitch.spn) as SpnArray;

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

    const endSpns = this.nodes.endNodes.map(n=>n.event.pitch.spn);

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

    this.analyzer.listenerState.currentGravitationNodes = this.analyzer.results
      .gravitationTimeline.getAt(this.interval.to);
  }

  updateKey() {
    const keyNode = this.analyzer.listenerState.currentKeyNode;

    if (keyNode !== undefined)
      return;

    const chord = this.analyzer.chordsStep.lastChordNode?.event;

    if (!chord)
      return;

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

    if (!newKey)
      return;

    this.analyzer.listenerState.tonal.key = newKey;
    // eslint-disable-next-line prefer-destructuring
    this.analyzer.listenerState.currentKeyNode = this.analyzer.results.keyTimeline.add( {
      event: newKey,
      interval: this.interval,
    } )[0];

    this.analyzer.log("Updated Key to " + this.analyzer.listenerState.currentKeyNode.event);
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
      const lastDistance = beatNodesInBar.at(-1)?.time! - beatNodesInBar.at(-2)?.time!;

      for (let i = 1; i < beatNodesInBar.length - 1; i++) {
        const iFrom = beatNodesInBar.at(i)?.time!;
        const prevFrom = beatNodesInBar.at(i - 1)?.time!;
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
        this.analyzer.listenerState.bar.duration = this.analyzer
          .listenerState.bar.last! - this.analyzer.step;
        this.analyzer.listenerState.bar.next = this.analyzer
          .listenerState.bar.duration - this.analyzer.step;
        this.analyzer.listenerState.bar.last = this.analyzer.step;
        this.analyzer.results.barTimeline.add( {
          event: null,
          time: this.interval.from,
        } );
        this.analyzer.log(`Add bar at ${this.interval.from}. Expect next bar: ${
          this.analyzer.listenerState.bar.next + this.interval.to
        } (in ${this.analyzer.listenerState.bar.next} ms)`);
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
