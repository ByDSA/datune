import { Spns as N } from "../..";
import { fromPitchOctave } from "../pitch-octave";

const cases = [N.B7];

describe.each(cases)("cached", (spn) => {
  const spnName = spn.toString();

  it(`Spn: ${spnName}`, () => {
    const actual = fromPitchOctave(spn.pitch, spn.octave);

    expect(actual).toBe(spn);
  } );
} );
