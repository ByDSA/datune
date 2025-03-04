import { ParserBottomUp } from "@datune/utils";
import { Chord } from "@datune/core/chords/alt";
import { fromRootVoicing } from "@datune/core/chords/octave/alt/building/root-voicing";
import { bass } from "@datune/core/chords/octave/alt/modifiers";
import { Pitch } from "@datune/core/pitches/alt";
import { Voicing } from "@datune/core/voicings/alt";
import { parseVoicing } from "parsing/voicings/alt";
import { parsePitch } from "parsing/pitches/alt";
import { Options } from "lang/Options";
import { normalizeInput } from "../normalizeInput";
import { ChordStringAbstract } from "../ChordStringAbstract";

class ChordAltString extends ChordStringAbstract<Chord> {
  static from(input: string, options?: Options): ChordAltString {
    const normalizedInput = normalizeInput(input);

    return new ChordAltString(normalizedInput, options);
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
      .add(
        Voicing.name,
        (str: string): Voicing | null => parseVoicing(str, this.options),
      );
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

    [baseChordStr, bassStr] = strValueSplited;

    const baseChord: Chord | null = ChordAltString.from(baseChordStr).parse();
    const pitchBass: Pitch | null = parsePitch(bassStr);

    if (!baseChord || !pitchBass)
      return null;

    return bass(baseChord, pitchBass);
  }
}

export function parseChord(input: string, options?: Options): Chord | null {
  return ChordAltString.from(input, options).parse();
}
