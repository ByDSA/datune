import { SPNs } from "../..";
import { fromPitchOctave } from "../pitch-octave";

const { B7 } = SPNs;
const cases = [B7];

describe.each(cases)("cached", (spn) => {
  const spnName = spn.toString();

  it(`SPN: ${spnName}`, () => {
    const actual = fromPitchOctave(spn.pitch, spn.octave);

    expect(actual).toBe(spn);
  } );
} );
