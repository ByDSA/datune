import { ParserBottomUp } from "@datune/utils";
import { bass, Chord, fromRootVoicing } from "@datune/core/chords/chromatic";
import { Options } from "lang";
import parsePitch from "parsing/pitches/chromatic";
import parseVoicing from "parsing/voicings/chromatic";
import { Pitch } from "@datune/core/pitches/chromatic";
import { Voicing } from "@datune/core/voicings/chromatic";
import ChordStringAbstract from "../ChordStringAbstract";
import normalizeInput from "../normalizeInput";

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
      .expected([Pitch.name, Voicing.name])
      .add(Pitch.name, (str: string): Pitch | null => parsePitch(str, this.options))
      .add(Voicing.name, (str: string): Voicing | null => parseVoicing(str, this.options));
    const objects = parser.parse();

    if (objects)
      return fromRootVoicing(objects[0], objects[1]);

    return null;
  }

  protected parsingInversion(): Chord | null {
    const strValueSplited: string[] = this.strValue.split("/");

    if (strValueSplited.length !== 2)
      return null;

    let baseChordStr;
    let bassStr;

    // eslint-disable-next-line prefer-const
    [baseChordStr, bassStr] = strValueSplited;

    const baseChord: Chord | null = ChromaticChordString.from(baseChordStr).parse();
    const pitchBass: Pitch | null = parsePitch(bassStr);

    if (!baseChord || !pitchBass)
      return null;

    return bass(baseChord, pitchBass);
  }
}

export default function fromString(str: string, options?: Options): Chord | null {
  return ChromaticChordString.from(str, options).parse();
}
