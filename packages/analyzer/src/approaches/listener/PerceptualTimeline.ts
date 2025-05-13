import { ParallelTimeline, SequentialTimeline, Time } from "@datune/utils";
import { intervalBetween } from "datils/math";
import { classifyPerception, PerceptualMidiNote, PerceptualMidiNoteWithPanning, withPerceptualNotes } from "./perception/perception";

const recentWindow = 50;

type TickProps = {
  events: PerceptualMidiNoteWithPanning[];
  time: Time;
};

type Props = {
  step: number;
};
export class PerceptualTimeline {
  timeline: ParallelTimeline<PerceptualMidiNote>;

  step: Time;

  classificationTimeline: SequentialTimeline<ReturnType<typeof classifyPerception>>;

  constructor(props: Props) {
    const innerProps = {
      cellSize: 2000, // WHOLE 120 BPM
      startTime: 0,
    };

    this.step = props.step;

    this.timeline = new ParallelTimeline(innerProps);

    this.classificationTimeline = new SequentialTimeline(innerProps);
  }

  tick( { events, time }: TickProps) {
    const allPerceptualMidiNotes = withPerceptualNotes(events);
    const sortedNotes = [...allPerceptualMidiNotes]
      .sort((a, b) => +a.pitch - +b.pitch); // TODO: no sé si realmente hace falta ordenarlas
    const classifiedPerceptualMidiNotes = classifyPerception(sortedNotes);
    const intervalThisStep = intervalBetween(
      time - this.step,
      time,
    );

    this.classificationTimeline.add( {
      event: classifiedPerceptualMidiNotes,
      interval: intervalThisStep,
    } );
    const toAdd = [
      ...classifiedPerceptualMidiNotes.sure,
    ];
    const recent = this.timeline.getAtInterval(
      intervalBetween(time - this.step, time - this.step - recentWindow),
    );

    for (const node of recent) {
      const nodePitch = node.event.pitch;
      const index = toAdd.findIndex((n) => n.pitch === nodePitch);

      if (index !== -1) {
        this.timeline.extendNode(node, {
          to: time,
        } );
        toAdd.splice(index, 1);
      }
    }

    // agregar los nodos restantes a la timeline
    for (const note of toAdd) {
      this.timeline.add( {
        event: note,
        interval: intervalThisStep,
      } );
    }
  }
}

type Profile = {
  label: string;
  timeNs: bigint;
};

class Profiling {
  private current?: {
    label: string;
    start: bigint;
  };

  private stack: Map<string, bigint> = new Map();

  results: Profile[] = [];

  // Inicia una medición con etiqueta
  start(label: string) {
    if (this.stack.has(label))
      throw new Error(`Label "${label}" ya está en uso.`);

    this.stack.set(label, process.hrtime.bigint());
  }

  // Termina una medición con etiqueta
  end(label: string) {
    const start = this.stack.get(label);

    if (!start)
      throw new Error(`Label "${label}" no fue iniciada.`);

    const duration = process.hrtime.bigint() - start;

    this.stack.delete(label);

    this.results.push( {
      label,
      timeNs: duration,
    } );
  }

  // Shortcut estilo logger: cambia de etiqueta automáticamente
  label(label: string) {
    if (this.current) {
      const end = process.hrtime.bigint();
      const duration = end - this.current.start;

      this.results.push( {
        label: this.current.label,
        timeNs: duration,
      } );
    }

    this.current = {
      label,
      start: process.hrtime.bigint(),
    };
  }

  // Termina la última etiqueta activa (del modo `label`)
  endCurrent() {
    if (!this.current)
      return;

    const end = process.hrtime.bigint();
    const duration = end - this.current.start;

    this.results.push( {
      label: this.current.label,
      timeNs: duration,
    } );

    this.current = undefined;
  }

  static fn(name: string, f: ()=> void) {
    const start = process.hrtime.bigint();

    f();

    const end = process.hrtime.bigint();
    const durationNs = end - start;

    console.log(`${name}: ${Number(durationNs) / 1_000_000} ms`);
  }

  // Imprime resultados ordenados
  print() {
    let msgs: string[] = [];

    for (const { label, timeNs } of this.results) {
      const ms = Number(timeNs) / 1_000_000;

      msgs.push(`${label}: ${ms.toFixed(3)} ms`);
    }

    console.log(msgs.join("\n"));
  }

  // Limpia resultados
  reset() {
    this.results = [];
    this.current = undefined;
    this.stack.clear();
  }
}
