import { AdaptiveTuning, RelativeOvertone } from "./adaptative-tuning";
import { ratioToCents } from "./analysis";
import { genOvertoneAmplitudes } from "./utils/overtones";

const createHarmonicRelativeOvertones = (
  props: Parameters<typeof genOvertoneAmplitudes>[0],
): RelativeOvertone[] => {
  const partials: RelativeOvertone[] = genOvertoneAmplitudes(props)
    .map((a, i) => ( {
      amplitudeRatio: a,
      frequencyRatio: i,
    } ));

  return partials;
};
const createMajorChord12TETConfiguration = (baseFrequency: number, numPartials: number = 5) => {
  const props: Parameters<typeof createHarmonicRelativeOvertones>[0] = {
    type: "natural-harmonic",
    num: numPartials,
  };
  const overtones = createHarmonicRelativeOvertones(props);

  return [
    {
      fundamentalFrequency: baseFrequency, // C
      overtones: overtones,
      isFixed: true,
    },
    {
      fundamentalFrequency: baseFrequency * (2 ** (4 / 12)), // E
      overtones,
      isFixed: false,
    },
    {
      fundamentalFrequency: baseFrequency * (2 ** (7 / 12)), // G
      overtones,
      isFixed: false,
    },
  ];
};
const createMinorChord12TETConfiguration = (baseFrequency: number, numPartials: number = 5) => {
  const props: Parameters<typeof createHarmonicRelativeOvertones>[0] = {
    type: "natural-harmonic",
    num: numPartials,
  };
  const overtones = createHarmonicRelativeOvertones(props);

  return [
    {
      fundamentalFrequency: baseFrequency, // C
      overtones,
      isFixed: true,
    },
    {
      fundamentalFrequency: baseFrequency * (2 ** (3 / 12)), // Eb
      overtones,
      isFixed: false,
    },
    {
      fundamentalFrequency: baseFrequency * (2 ** (7 / 12)), // G
      overtones,
      isFixed: false,
    },
  ];
};
const calcEachRatio = (ratios: number[]) => {
  const eachRatios: Record<string, number> = {};

  for (let i = 0; i < ratios.length + 1; i++) {
    for (let j = i + 1; j < ratios.length + 1; j++) {
      let accumulatedRatio = 1;

      for (let k = i; k < j; k++)
        accumulatedRatio *= ratios[k];

      const key = `[${i}]=>[${j}]`;

      eachRatios[key] = accumulatedRatio;
    }
  }

  return eachRatios;
};
const tuneChord = (baseFrequency: number, numPartials: number, chordType: "major" | "minor") => {
  const chordNotes = chordType === "major"
    ? createMajorChord12TETConfiguration(baseFrequency, numPartials)
    : createMinorChord12TETConfiguration(baseFrequency, numPartials);
  const tuner = new AdaptiveTuning( {
    reversed: false,
    mode: "normal",
  } );

  return tuner.tune(chordNotes);
};
const expectFrequenciesClose = (
  actual: number[],
  expected: number[],
  tolerance: number = 0.005,
) => {
  expect(actual).toHaveLength(expected.length);

  for (let i = 0; i < actual.length; i++)
    expect(actual[i]).toBeCloseTo(expected[i], tolerance);
};
const expectIntervalsClose = (
  ratios: number[],
  expectedCents: Record<string, number>,
  tolerance: number = 0.001,
) => {
  const eachRatios = calcEachRatio(ratios);

  Object.entries(expectedCents).forEach(([interval, expectedCent]) => {
    const actualRatio = eachRatios[interval];

    expect(actualRatio).toBeDefined();

    const actualCent = ratioToCents(actualRatio);

    expect(actualCent).toBeCloseTo(expectedCent, tolerance);
  } );
};
const base = 440 * (2 ** (3 / 12));
const m3 = base * (2 ** (3 / 12));
const M3 = base * (2 ** (4 / 12));
const P5 = base * (2 ** (7 / 12));

describe("adaptive Tuning - 4 Partials", () => {
  describe("major Chord", () => {
    let result: any;

    beforeAll(() => {
      result = tuneChord(base, 4, "major");
    } );

    it("should have correct original frequencies", () => {
      expectFrequenciesClose(result.originalFrequencies, [base, M3, P5]);
    } );

    it("should have correct tuned frequencies", () => {
      expectFrequenciesClose(result.tunedFrequencies, [base, 657.00, 784.50]);
    } );

    it("should have correct intervals in cents", () => {
      expectIntervalsClose(result.intervalRatios, {
        "[0]=>[1]": 394,
        "[0]=>[2]": 702,
        "[1]=>[2]": 308,
      } );
    }, 0.5);

    it("should converge", () => {
      expect(result.converged).toBe(true);
    } );
  } );

  describe("minor Chord", () => {
    let result: any;

    beforeAll(() => {
      result = tuneChord(base, 4, "minor");
    } );

    it("should have correct original frequencies", () => {
      expectFrequenciesClose(result.originalFrequencies, [base, m3, P5]);
    } );

    it("should have correct tuned frequencies", () => {
      expectFrequenciesClose(result.tunedFrequencies, [base, 624.71, 784.50]);
    } );

    it("should have correct intervals in cents", () => {
      expectIntervalsClose(result.intervalRatios, {
        "[0]=>[1]": 308,
        "[0]=>[2]": 702,
        "[1]=>[2]": 394,
      } );
    } );

    it("should converge", () => {
      expect(result.converged).toBe(true);
    } );
  } );
} );

describe("adaptive Tuning - 10 Partials", () => {
  describe("major Chord", () => {
    let result: any;

    beforeAll(() => {
      result = tuneChord(base, 10, "major");
    } );

    it("should have correct original frequencies", () => {
      expectFrequenciesClose(result.originalFrequencies, [base, M3, P5]);
    } );

    it("should have correct tuned frequencies", () => {
      expectFrequenciesClose(result.tunedFrequencies, [base, 653.75, 784.50]);
    } );

    it("should have correct intervals in cents", () => {
      expectIntervalsClose(result.intervalRatios, {
        "[0]=>[1]": 386.31,
        "[0]=>[2]": 701.96,
        "[1]=>[2]": 315.64,
      } );
    } );
  } );

  describe("minor Chord", () => {
    let result: any;

    beforeAll(() => {
      result = tuneChord(base, 10, "minor");
    } );

    it("should have correct original frequencies", () => {
      expectFrequenciesClose(result.originalFrequencies, [base, m3, P5]);
    } );

    it("should have correct tuned frequencies", () => {
      expectFrequenciesClose(result.tunedFrequencies, [base, 627.60, 784.50]);
    } );

    it("should have correct intervals in cents", () => {
      expectIntervalsClose(result.intervalRatios, {
        "[0]=>[1]": 315.64,
        "[0]=>[2]": 701.95,
        "[1]=>[2]": 386.31,
      } );
    } );
  } );
} );
