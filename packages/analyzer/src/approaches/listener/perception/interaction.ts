import { hzToBark } from "./bark";

type Settings = Partial<{
  decayFx: (x: number)=> number;
  threholds: Partial<{
    min: number;
    max: number;
  }>;
}>;
export function getFrequencyInteraction(f1: number, f2: number, settings?: Settings): number {
  const bark1 = hzToBark(f1);
  const bark2 = hzToBark(f2);

  return getBarkInteraction(bark1, bark2, settings);
}

export function getBarkInteraction(bark1: number, bark2: number, settings?: Settings): number {
  const minThreshold = settings?.threholds?.min ?? 0.1;
  const maxThreshold = settings?.threholds?.max ?? 3;
  const diffThrehold = Math.abs(minThreshold - maxThreshold);
  const diff = Math.abs(bark1 - bark2);

  if (diff < minThreshold)
    return 1;

  if (diff > maxThreshold)
    return 0;

  const x = (diff - minThreshold) / diffThrehold;
  const decayFx = settings?.decayFx ?? decayExponential;
  const decay = decayFx(x);

  return 1 - decay;
}

function decayExponential(x: number, k: number = 5) {
  return 1 - Math.exp(-k * x);
}
