import { Intervals as I } from "@datune/core";
import { calcSetharesRoughness } from "./sethares";
import { genHarmonicOvertones, genOvertoneAmplitudes, getShiftedOvertones } from "./utils/overtones";

const amplitudes = genOvertoneAmplitudes( {
  type: "natural-harmonic",
  num: 10, // Resultados de tests sensibles a cambio de número de parciales
} );
const et12Factors = (() => {
  const baseFactors = [
    1,
    2 ** (1 / 12),
    2 ** (2 / 12),
    2 ** (3 / 12),
    2 ** (4 / 12),
    2 ** (5 / 12),
    2 ** (6 / 12),
    2 ** (7 / 12),
    2 ** (8 / 12),
    2 ** (9 / 12),
    2 ** (10 / 12),
    2 ** (11 / 12),
  ];
  // Añadir la siguiente octava multiplicando por 2 (excluyendo el primer factor)
  const nextOctaveFactors = baseFactors.map(factor => factor * 2);

  return [...baseFactors, ...nextOctaveFactors, 3];
} )();
const justFactors = (() => {
  const baseFactors = [
    1,
    16 / 15, // m2
    9 / 8, // M2
    6 / 5, // m3
    5 / 4, // M3
    4 / 3, // P4
    45 / 32, // d5
    3 / 2, // P5
    8 / 5, // m6
    5 / 3, // M6
    16 / 9, // m7
    15 / 8, // M7
  ];
  // Añadir la siguiente octava multiplicando por 2 (excluyendo el primer factor)
  const nextOctaveFactors = baseFactors.map(factor => factor * 2);

  return [...baseFactors, ...nextOctaveFactors, 3];
} )();
const fundamentalFrequencies = [
  25,
  55,
  110,
  220,
  440,
  880,
  440 * 3,
  440 * 4,
  440 * 6,
  440 * 8,
  440 * 12,
  440 * 16,
];
const tuningSystemsData = [
  {
    name: "just intonation",
    factors: justFactors,
  },
  {
    name: "12-tone equal temperament",
    factors: et12Factors,
  },
];
const EPSILON = 0.02;

describe.each([
  ...fundamentalFrequencies.flatMap(freq => tuningSystemsData.map(tuning => ( {
    fundamental: freq,
    tuningSystem: tuning.name,
    factors: tuning.factors,
  } ))),
])(
  "roughness analysis for fundamental frequency $fundamental Hz with $tuningSystem",
  ( { fundamental, tuningSystem: _, factors } ) => {
    const MAX = I.P15;
    const roughness: number[] = new Array(MAX);
    const baseOvertones = genHarmonicOvertones( {
      amplitudes,
      fundamentalFreq: fundamental,
    } );

    for (let i = I.P1; i <= MAX; i++) {
      const factor = factors[i];
      const newFundamentalFrequency = fundamental * factor;
      const shiftedPartials = getShiftedOvertones(newFundamentalFrequency, baseOvertones);
      const overtones = [...baseOvertones, ...shiftedPartials];

      roughness[i] = calcSetharesRoughness(overtones);
    }

    it("all roughness should be defined", () => {
      for (let i = I.P1; i <= MAX; i++)
        expect(roughness[i]).toBeDefined();
    } );

    // roughness = disonancia (más roughness = más disonante)
    describe("roughness relationships for musical intervals", () => {
    // Consonancias perfectas - jerarquía musical tradicional
      // !!: P8 tiene menos armónicos audibles que P1
      createTest(roughness, I.P1, I.P8);

      if (fundamental > 30)
        createTest(roughness, I.P5, I.P1);
      else
        // !! graves
        createTest(roughness, I.P1, I.P5);

      it("should be roughness P4 > P1", () => {
        expect(roughness[I.P4]).toBeGreaterThan(roughness[I.P1]);
      } );

      createTest(roughness, I.P4, I.P5);

      // Intervalos extendidos son menos rugosos que simples
      createTest(roughness, I.P8, I.P15);

      it("should be roughness P5 > P12", () => {
        expect(roughness[I.P5]).toBeGreaterThan(roughness[I.P12]);
      } );

      it("should be roughness P4 > P11", () => {
        expect(roughness[I.P4]).toBeGreaterThan(roughness[I.P11]);
      } );

      // Consonancias imperfectas vs perfectas
      it("should be roughness M3 > P1", () => {
        expect(roughness[I.M3]).toBeGreaterThan(roughness[I.P1]);
      } );

      it("should be roughness m3 > P1", () => {
        expect(roughness[I.m3]).toBeGreaterThan(roughness[I.P1]);
      } );

      createTest(roughness, I.M3, I.P5);
      createTest(roughness, I.m3, I.P5);

      if (fundamental > 100)
        createTest(roughness, I.M6, I.P5);
      else
        // !!: límite graves
        createTest(roughness, I.P5, I.M6);

      if (fundamental > 30) {
        it("should be roughness m6 > P5", () => {
          expect(roughness[I.m6]).toBeGreaterThan(roughness[I.P5]);
        } );
      } else
        // !!: Límite intervalos bajos
        createTest(roughness, I.P5, I.m6);

      // !!
      createTest(roughness, I.P4, I.M6);

      if (fundamental < 400)
        createTest(roughness, I.P4, I.m6);
      else
        // !!: Límite intervalos bajos
        createTest(roughness, I.m6, I.P4);

      // Intervalos compuestos
      if (fundamental > 30) {
        it("should be roughness M10 > P8", () => {
          expect(roughness[I.M10]).toBeGreaterThan(roughness[I.P8]);
        } );
      } else
        // !!: Límite intervalos bajos
        createTest(roughness, I.P8, I.M10);

      if (fundamental > 30) {
        it("should be roughness m10 > P8", () => {
          expect(roughness[I.m10]).toBeGreaterThan(roughness[I.P8]);
        } );
      } else
        // !!: Límite intervalos bajos
        createTest(roughness, I.P8, I.m10);

      // Disonancias suaves - segundas son más disonantes que terceras
      if (factors === justFactors
        || (factors === et12Factors && fundamental < 3000)
      ) {
        it("should be roughness M2 > M3", () => {
          expect(roughness[I.M2]).toBeGreaterThan(roughness[I.M3]);
        } );
      }

      createTest(roughness, I.m2, I.m3);

      // Séptimas son más disonantes que sextas
      if (fundamental > 150) {
        it("should be roughness M7 > M6", () => {
          expect(roughness[I.M7]).toBeGreaterThan(roughness[I.M6]);
        } );
      } else
        // !!: Límite intervalos bajos
        createTest(roughness, I.M6, I.M7);

      if (factors === justFactors) {
        if (fundamental > 3000 || fundamental < 120)
          // !! agudos y graves
          createTest(roughness, I.m6, I.m7);
        else
          createTest(roughness, I.m7, I.m6);
      } else if (factors === et12Factors)
        // !!
        createTest(roughness, I.m6, I.m7);

      // Novenas son más disonantes que décimas
      if (
        factors === justFactors
        || (factors === et12Factors && fundamental < 1500)
      )
        createTest(roughness, I.M9, I.M10);

      it("should be roughness m9 > m10", () => {
        expect(roughness[I.m9]).toBeGreaterThan(roughness[I.m10]);
      } );

      // Disonancias fuertes
      if (fundamental > 60) {
        it("should be roughness m2 > M2", () => {
          expect(roughness[I.m2]).toBeGreaterThan(roughness[I.M2]);
        } );
      } else
        // !!: Límite intervalos bajos
        createTest(roughness, I.M2, I.m2);

      createTest(roughness, I.m2, I.M3);

      // Tritono vs otros intervalos
      if (fundamental > 60)
        createTest(roughness, I.d5, I.P4);
      else
      // !! graves
        createTest(roughness, I.P4, I.d5);

      createTest(roughness, I.d5, I.P5);

      if (fundamental > 250)
        // !!
        createTest(roughness, I.d5, I.M3);

      if (fundamental > 500)
        // !!
        createTest(roughness, I.d5, I.m3);

      createTest(roughness, I.d5, I.M6);

      createTest(roughness, I.d5, I.m6);

      createTest(roughness, I.m2, I.d5);

      // Intervalos extendidos son menos rugosos
      it("should be roughness M7 > M14", () => {
        expect(roughness[I.M7]).toBeGreaterThan(roughness[I.M14]);
      } );

      it("should be roughness m7 > m14", () => {
        expect(roughness[I.m7]).toBeGreaterThan(roughness[I.m14]);
      } );

      it("should be roughness M6 > M13", () => {
        expect(roughness[I.M6]).toBeGreaterThan(roughness[I.M13]);
      } );

      it("should be roughness m6 > m13", () => {
        expect(roughness[I.m6]).toBeGreaterThan(roughness[I.m13]);
      } );

      // Otros intervalos disminuidos
      if (fundamental > 60)
        createTest(roughness, I.d12, I.P11);
      else
        // !! graves
        createTest(roughness, I.P11, I.d12);

      it("should be roughness d12 > P12", () => {
        expect(roughness[I.d12]).toBeGreaterThan(roughness[I.P12]);
      } );

      // Intervalos simples más rugosos que compuestos
      it("should be roughness m2 > m9", () => {
        expect(roughness[I.m2]).toBeGreaterThan(roughness[I.m9]);
      } );

      it("should be roughness M2 > M9", () => {
        expect(roughness[I.M2]).toBeGreaterThan(roughness[I.M9]);
      } );

      it("should be roughness d5 > d12", () => {
        expect(roughness[I.d5]).toBeGreaterThan(roughness[I.d12]);
      } );

      if (fundamental < 3000)
        createTest(roughness, I.M2, I.M7);
      else
        // !!: M7 más rugoso que M2 en frecuencias altas
        createTest(roughness, I.M7, I.M2);

      createTest(roughness, I.m2, I.m7);
    } );
  },
);

function createTest(roughness: number[], greater: number, lower: number) {
  const absDiff = Math.abs(roughness[greater] - roughness[lower]);

  if (absDiff > EPSILON) {
    it(`should be roughness ${stringifyInterval(greater)} > ${stringifyInterval(lower)}`, () => {
      expect(roughness[greater]).toBeGreaterThan(roughness[lower]);
    } );
  }
}

function stringifyInterval(n: number): string {
  switch (n) {
    case I.P1:
      return "P1";
    case I.m2:
      return "m2";
    case I.M2:
      return "M2";
    case I.m3:
      return "m3";
    case I.M3:
      return "M3";
    case I.P4:
      return "P4";
    case I.d5:
      return "d5";
    case I.P5:
      return "P5";
    case I.m6:
      return "m6";
    case I.M6:
      return "M6";
    case I.m7:
      return "m7";
    case I.M7:
      return "M7";
    case I.P8:
      return "P8";
    case I.m9:
      return "m9";
    case I.M9:
      return "M9";
    case I.m10:
      return "m10";
    case I.M10:
      return "M10";
    case I.P11:
      return "P11";
    case I.d12:
      return "d12";
    case I.P12:
      return "P12";
    case I.m13:
      return "m13";
    case I.M13:
      return "M13";
    case I.m14:
      return "m14";
    case I.M14:
      return "M14";
    case I.P15:
      return "P15";
    default:
      return `I.${n}`;
  }
}
