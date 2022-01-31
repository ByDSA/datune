import { TestInit } from "tests";
import { B7 } from "../../constants";
import from from "../pitch-octave";

TestInit.diatonicAltSPN();

const cases = [B7];

describe.each(cases)("cached", (spn) => {
  const spnName = spn.toString();

  it(spnName, () => {
    const actual = from(spn.pitch, spn.octave);

    expect(actual).toBe(spn);
  } );
} );
