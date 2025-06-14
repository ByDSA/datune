import { ParserBottomUp } from "@datune/utils";
import { Chord } from "@datune/core/chords/chromatic";
import { fromRootIntervalSet } from "@datune/core/chords/octave/chromatic/building/root-intervalSet";
import { bass } from "@datune/core/chords/octave/chromatic/modifiers";
import { Pitch } from "@datune/core/pitches/chromatic";
import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { parseIntervalSet } from "parsing/intervalSets/chromatic";
import { parsePitch } from "parsing/pitches/chromatic";
import { Options } from "lang";
import { normalizeInput } from "../normalizeInput";
import { ChordStringAbstract } from "../ChordStringAbstract";

class ChromaticChordString extends ChordStringAbstract<Chord> {
  static from(input: string, options?: Options): ChromaticChordString {
    const strValue = normalizeInput(input);

    return new ChromaticChordString(strValue, options);
  }

  parse(): Chord | null {
    let ret: Chord | null;

    if (this.strValue.includes("/"))
      ret = this.parsingInversion();
    else
      ret = this.parsingNormal();

    return ret;
  }

  protected parsingNormal(): Chord | null {
    const parser = new ParserBottomUp()
      .from(this.strValue)
      .expected([Pitch.name, IntervalSet.name])
      .add(Pitch.name, (str: string): Pitch | null => parsePitch(str, this.options))
      .add(IntervalSet.name, (str: string): IntervalSet | null => parseIntervalSet(str, this.options));
    const objects = parser.parse();

    if (objects)
      return fromRootIntervalSet(objects[0], objects[1]);

    return null;
  }

  protected parsingInversion(): Chord | null {
    const strValueSplited: string[] = this.strValue.split("/");

    if (strValueSplited.length !== 2)
      return null;

    let baseChordStr;
    let bassStr;

    [baseChordStr, bassStr] = strValueSplited;

    const baseChord: Chord | null = ChromaticChordString.from(baseChordStr).parse();
    const pitchBass: Pitch | null = parsePitch(bassStr);

    if (!baseChord || !pitchBass)
      return null;

    return bass(baseChord, pitchBass);
  }
}

export function parseChord(str: string, options?: Options): Chord | null {
  return ChromaticChordString.from(str, options).parse();
}
