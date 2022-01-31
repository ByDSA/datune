import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";
import { A, B, C, D, E, F, G, Pitch as Diatonic } from "pitches/diatonic";

export default function toString(pitch: Diatonic, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (pitch) {
    case C: return lang.diatonic.C;
    case D: return lang.diatonic.D;
    case E: return lang.diatonic.E;
    case F: return lang.diatonic.F;
    case G: return lang.diatonic.G;
    case A: return lang.diatonic.A;
    case B: return lang.diatonic.B;
    default: return `[Diatonic = ${+pitch}]`;
  }
}
