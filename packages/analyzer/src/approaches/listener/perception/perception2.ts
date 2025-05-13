import { Instrument, MidiNote } from "@datune/midi";
import { getHarmonicSpectrum } from "./instrumentSpectre";
import { midiToFrequency } from "./perception";

export type Perceptual2MidiNote = Omit<MidiNote, "duration" | "panning"> & {
  instrument: Instrument;
};

export type Frequency = number;

export type Amplitude = number;

export type DiscreteFrequencySpectrum = Record<Frequency, Amplitude>;

export function get(notes: Perceptual2MidiNote[]) {
  const eachScpectr = notes.map(n=> {
    const baseFreq = midiToFrequency(n.pitch);
    const instrumentFrequencySpectrum = getHarmonicSpectrum(n.instrument, baseFreq);

    return instrumentFrequencySpectrum.map(h=>( {
      ...h,
      amplitude: n.velocity * h.amplitude,
    } ));
  } );
  const discreteFrequencySpectrumPow2 = eachScpectr.reduce(
    (acc, curr) => {
      curr.forEach((h) => {
        const { amplitude, frequency: freq } = h;

        if (acc[freq] === undefined)
          acc[freq] = 0;

        acc[freq] += amplitude ** 2;
      } );

      return acc;
    },
    {} as DiscreteFrequencySpectrum,
  );
  const discreteFrequencySpectrum: DiscreteFrequencySpectrum = {};

  Object.entries(discreteFrequencySpectrumPow2).forEach(([freqStr, amp]) => {
    const freq = +freqStr;

    discreteFrequencySpectrum[freq] = Math.sqrt(amp);
  } );

  const sortedByAmplitude = Object.entries(discreteFrequencySpectrum)
    .sort(([, ampA], [, ampB]) => ampB - ampA);

  return sortedByAmplitude;
}
