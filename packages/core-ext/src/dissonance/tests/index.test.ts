import { HarmonicEntropyModel } from "../harmonic-entropy";
import { ModelResults, normalizeResults } from "../utils/utils";
import { EnhancedChartGenerator } from "./chart";
import { analysisEach, SpecificIntervals } from "../analysis";
import { analyzeRange } from "../sethares";
import { VassilakisRoughnessModel } from "../vassilakis";
import { genHarmonicOvertones, genOvertoneAmplitudes } from "../utils/overtones";

async function analyzeCompleteDissonanceModels(options: {
  useSethares?: boolean;
  useVassilakis?: boolean;
  useHarmonicEntropy?: boolean;
} = {} ) {
  const { useSethares = true,
    useVassilakis = true,
    useHarmonicEntropy = true } = options;
  const fundamental = 55;
  const maxCents = 1200 * 3;
  const maxRatio = 1 + (maxCents / 1200);
  const centsResolution = 1;
  const specificIntervals: SpecificIntervals[] = [{
    cents: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
    tag: "ET12",
  }];
  const modelResults: ModelResults = {};

  console.log(`   Rango de análisis: 0-${maxCents} cents`);
  console.log(`   Resolución: ${Math.floor(1 / centsResolution)} puntos / cent`);
  const minAmplitude = 0;
  const spectrum = genOvertoneAmplitudes( {
    type: "natural-harmonic",
    num: 10,
    minAmplitude,
  } );

  if (useSethares) {
    console.log("📊 === Sethares ===");
    console.log(`   Frecuencia fundamental: ${fundamental} Hz`);
    console.log(`   Espectro armónico: ${spectrum.length} parciales`);
    console.log(`   Amplitudes: [${spectrum.map(a => a.toFixed(2)).join(", ")}]`);
    console.log("");
    console.log("   Calculando ...");
    const basePartials = genHarmonicOvertones( {
      amplitudes: spectrum,
      fundamentalFreq: fundamental,
    } );

    modelResults.sethares = analyzeRange(fundamental, maxRatio, centsResolution, basePartials);

    normalizeResults(modelResults.sethares);
    analysisEach(modelResults.sethares, specificIntervals);
  }

  if (useVassilakis) {
    console.log("📊 === Vassilakis ===");
    console.log(`   Frecuencia fundamental: ${fundamental} Hz`);
    console.log(`   Espectro armónico: ${spectrum.length} parciales`);
    console.log(`   Amplitudes: [${spectrum.map(a => a.toFixed(2)).join(", ")}]`);
    console.log("");
    console.log("   Calculando ...");
    const basePartials = genHarmonicOvertones( {
      amplitudes: spectrum,
      fundamentalFreq: fundamental,
    } );

    modelResults.vassilakis = VassilakisRoughnessModel.analyzeRange(
      fundamental,
      maxCents,
      centsResolution,
      basePartials,
    );

    normalizeResults(modelResults.vassilakis);
    analysisEach(modelResults.vassilakis, specificIntervals);
  }

  if (useHarmonicEntropy) {
    console.log("📊 === Entropía armónica ===");
    console.log("   Calculando ...");
    modelResults.harmonicEntropy = HarmonicEntropyModel.analyzeRange(maxRatio, centsResolution);

    normalizeResults(modelResults.harmonicEntropy);
    analysisEach(modelResults.harmonicEntropy, specificIntervals);
  }

  console.log("");
  console.log("📈 GENERANDO VISUALIZACIONES...");
  const chartGenerator = new EnhancedChartGenerator();

  await chartGenerator.generate(modelResults);
}

it("test", async () => {
  await analyzeCompleteDissonanceModels( {
    useSethares: true,
    useVassilakis: false,
    useHarmonicEntropy: false,
  } );
} );
