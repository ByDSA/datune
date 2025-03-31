import { Instrument } from "@datune/midi";

type Harmonic = { frequency: number;
amplitude: number; };
type HarmonicSerieFactor = number[];

const instrumentHarmonics: Partial<Record<Instrument, HarmonicSerieFactor>> = {
  [Instrument.ACOUSTIC_PIANO]: [1, 0.8, 0.6, 0.5, 0.3, 0.2, 0.15, 0.1],
  [Instrument.VIOLIN]: [1, 0.9, 0.7, 0.6, 0.5, 0.3, 0.2, 0.15],
  [Instrument.VIOLA]: [1, 0.9, 0.75, 0.65, 0.55, 0.4, 0.3, 0.15],
  [Instrument.FLUTE]: [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1, 0.05],
  [Instrument.OBOE]: [1, 0.85, 0.7, 0.6, 0.5, 0.3, 0.2, 0.1],
  [Instrument.TRUMPET]: [1, 0.85, 0.65, 0.5, 0.45, 0.3, 0.2, 0.1],
  [Instrument.TROMBONE]: [1, 0.9, 0.7, 0.6, 0.5, 0.35, 0.25, 0.1],
  [Instrument.FRENCH_HORN]: [1, 0.8, 0.6, 0.5, 0.45, 0.3, 0.2, 0.15],
  [Instrument.STRING_ENSEMBLE_1]: [1, 0.95, 0.85, 0.75, 0.65, 0.5, 0.4, 0.2],
};

export function getHarmonicSpectrum(
  instrument: Instrument,
  basePitchFrequency: number,
  maxHarmonics = 8,
): Harmonic[] {
  const profile = instrumentHarmonics[instrument];

  if (!profile)
    throw new Error(`Instrument ${instrument} not found`);

  return profile
    .slice(0, maxHarmonics)
    .map((amplitude, i) => ( {
      frequency: basePitchFrequency * (i + 1),
      amplitude,
    } ));
}
