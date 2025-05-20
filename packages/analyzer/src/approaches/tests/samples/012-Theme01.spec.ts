/* eslint-disable no-use-before-define */
/* eslint-disable no-mixed-operators */
import { Chords as C, Chord, Pitches as P } from "@datune/core";
import { Interval } from "datils/math";
import { MidiFile, MidiTimeline } from "@datune/midi";
import { stringifyTimelineNode } from "@datune/utils/datastructures/timeline";
import { Time } from "@datune/utils";
import { midiFileToTimelines } from "timelines/midi/midifile-to-notes-timeline";
import { expectChordTimeline } from "timelines/tests/chord-timeline";
import { loadMidiSample } from "tests/loadMidiSample";
import { Analyzer } from "approaches/listener/ListenerAnalyzer";
import { symbolicTimelineToReal } from "approaches/listener/utils";
import { sortNodesByFrom } from "approaches/utils";
import { ChordTimeline } from "timelines";

describe("004 012-Theme01", () => {
  let timeline: MidiTimeline;
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await loadMidiSample("004");

    timeline = midiFileToTimelines(midiFile).pitched!;
  } );

  it("listener", async () => {
    const notesTimelineSymbolic = timeline;
    // eslint-disable-next-line prefer-destructuring
    const { bpm } = midiFile.bpmEvents[0];
    const notesTimelineReal = symbolicTimelineToReal(notesTimelineSymbolic, bpm);
    const analyzer = new Analyzer( {
      midiTimeline: notesTimelineReal,
    } );
    const results = analyzer.analyze();
    const nodes = sortNodesByFrom([...results.chordTimeline.nodes]);

    await analyzer.saveLog();
    console.log(nodes.map(n=>(((n.interval.from - 500) / 2000 + 1) + ": " + stringifyTimelineNode(n))));

    const intro: CheckProps["array"] = [
      {
        time: 1, // 500
        // A4 se percibe pero muy tenue
        chord: C.fromPitches(P.FF, P.A, P.CC),
      },
      {
        time: 2, // 2500
        // G#4 se percibe muy tenue.
        // TODO: F#6 no debería considerarse del acorde por la distancia con B4
        chord: C.fromPitches(P.E, P.GG, P.B, P.FF),
      },
      {
        time: 3, // 4500
        // F#6 no debería considerarse del acorde por distancia con B4,
        // pero como la 3ª es ambigua, se incluye
        chord: C.fromPitches(P.D, P.FF, P.A),
      },
      {
        time: 4, // 6500
        // ídem compás 2
        chord: C.fromPitches(P.E, P.GG, P.B, P.FF),
        length: 1,
      },
    ];
    const partA: CheckProps["array"] = [
      {
        time: 5, // 8500
        chord: C.fromPitches(P.FF, P.CC, P.A),
      },
      {
        time: 7, // 12500
        // C#5 encima de B4, se percibe ese sus2
        chord: C.fromPitches(P.E, P.B, P.GG, P.CC),
      },
      {
        time: 9, // 16500
        chord: C.fromPitches(P.FF, P.CC, P.A),
      },
      {
        time: 11, // 20500
        // ídem compás 7
        chord: C.fromPitches(P.E, P.B, P.GG, P.CC),
      },
      {
        time: 13, // 24500
        chord: C.fromPitches(P.D, P.A, P.FF),
      },
      {
        time: 14, // 26500
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 15, // 28500
        // E5 es nota de paso justo antes y lo que termina al principio del compás no se escucha
        chord: C.fromPitches(P.FF, P.CC, P.A),
      },
      {
        time: 15.5, // 29500
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 16, // 30500
        // C#5 de french horn, apantalla a D5
        chord: C.fromPitches(P.D, P.A, P.CC, P.FF),
      },
      {
        time: 16.75, // 32000
        // -E
        chord: C.fromPitches(P.CC, P.GG, P.B, P.FF),
      },
      {
        time: 17, // 32500
        chord: C.fromPitches(P.D, P.A, P.FF),
      },
      {
        time: 18, // 33500
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 19, // 36500
        // -E5
        chord: C.fromPitches(P.FF, P.CC, P.A),
      },
    ];
    const partB: CheckProps["array"] = [
      {
        time: 21, // 40500
        // 5a (A) ambigua hasta 21.5. aunque dura sólo 0.25 es definitoria del acorde
        chord: C.fromPitches(P.D, P.A, P.CC, P.FF),
      },
      {
        time: 22, // 42500
        // la 5a B no suena hasta el 22.25
        // se mantiene estable el resto del compás
        // debe corregirse de forma retrospectiva
        chord: C.fromPitches(P.E, P.GG, P.B),
      },
      {
        time: 23, // 44500
        // Apoyaturas D->C y G#->A
        chord: C.fromPitches(P.A, P.CC, P.FF),
      },
      {
        time: 23.5, // 45500
        chord: C.CCm.withInv(2), // C#m/G#
      },
      {
        time: 24, // 46500
        // Resolución apoyatura G#->A en 24.1875
        chord: C.fromPitches(P.FF, P.A, P.CC),
      },
      {
        time: 24.5, // 47500
        // NO es apoyatura G#5->F#5 en 24.625
        // porque F# no es una nota de acorde mayor o menor sobre E
        chord: C.fromPitches(P.E, P.GG),
      },
      {
        time: 25, // 48500
        chord: C.fromPitches(P.D, P.A, P.FF, P.CC),
      },
      {
        time: 26, // 50500
        // G#->A no es apoyatura porque en 26.5 A->B
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 27, // 52500
        // G#->A es apoyatura, aunque sea breve y luego A5->B5 en 27.5, no se nota como continuidad,
        // E empieza en 27.5 y termina en 28.5
        chord: C.fromPitches(P.FF, P.CC, P.A),
      },
      {
        time: 28.5, // 55500
        chord: C.fromPitches(P.E, P.B, P.FF, P.A),
      },
      {
        time: 29, // 56500
        chord: C.fromPitches(P.D, P.A, P.FF, P.CC),
      },
      {
        time: 30, // 58500
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 31, // 60500
        // Aparece E3 como nota más grave en el segundo tiempo
        // Pero el root es A: A/E
        chord: C.A.withBass(P.E), // E-A-C#
      },
      {
        time: 31.5, // 61500
        chord: C.fromPitches(P.E, P.GG, P.B, P.CC).withRootIndex(1),
      },
      {
        time: 32, // 62500
        chord: C.fromPitches(P.FF, P.CC, P.A, P.GG),
      },
      {
        time: 32.5, // 63500
        // Apoyatura F#6 -> E6
        // G#4 aparece a mitad de tiempo
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 33, // 64500
        chord: C.fromPitches(P.D, P.A, P.FF),
      },
      {
        time: 34, // 66500
        chord: C.fromPitches(P.E, P.B, P.GG),
      },
      {
        time: 35, // 68500
        chord: C.fromPitches(P.FF, P.CC, P.B),
      },
      {
        time: 36, // 70500
        chord: C.fromPitches(P.FF, P.CC, P.AA),
        length: 1,
      },
    ];

    check( {
      barMs: 2000,
      timeline: results.chordTimeline,
      offsetMs: 500,
      array: [
        ...intro,
        ...partA,
        ...partB,
      ],
    } );

    expectChordTimeline(results.chordTimeline).toHaveDuration(
      bpm.getMillis(notesTimelineSymbolic.duration),
    );
  } );
} );

function intervalDuration(interval: Interval<Time>): number {
  return interval.to - interval.from;
}

type CheckObj = {
  time: number;
  chord: Chord;
  length?: number;
  disabled?: boolean;
};

type CheckProps = {
  array: CheckObj[];
  barMs: number;
  timeline: ChordTimeline;
  offsetMs?: number;
};

function check(props: CheckProps) {
  const offset = props.offsetMs ?? 0;
  const { barMs } = props;

  for (let i = 0; i < props.array.length; i++) {
    const entry = props.array[i];

    if (entry.disabled)
      continue;

    const timeMs = offset + (barMs * (entry.time - 1));

    try {
      expectChordTimeline(props.timeline).at(timeMs)
        .toHaveChord(
          entry.chord,
        );

      const nextTime = props.array[i + 1]?.time;
      let length;

      if (entry.length !== undefined)
        length = entry.length * barMs;
      else if (nextTime !== undefined)
        length = ((nextTime - 1) * barMs + offset) - timeMs;
      else
        length = undefined;

      expect(intervalDuration(props.timeline.getAt(timeMs)!.interval)).toBe(length);
    } catch (e: unknown) {
      if (!(e instanceof Error))
        return;

      const addMsg = `Time: ${(timeMs - offset) / barMs + 1} (${timeMs})\n`;
      const e2 = new Error(addMsg + e.message);

      e2.stack = addMsg + e.stack;
      e2.name = e.name;
      throw e2;
    }
  }
}
