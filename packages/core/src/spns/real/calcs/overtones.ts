import RealPitch from "../RealPitch";

export default function overtones(realPitch: RealPitch): number[] {
  const MAX_FREQUENCY = 20000;
  const base = +realPitch;
  const ret: number[] = [];

  for (let f = base; f < MAX_FREQUENCY; f += base)
    ret.push(f);

  return ret;
}
