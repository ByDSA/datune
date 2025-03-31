/* eslint-disable max-len */
export function hzToBark(f: number): number {
  return (13 * Math.atan(0.00076 * f)) + (3.5 * Math.atan((f / 7500) ** 2));
}

export function barkToHz(barkTarget: number): number {
  const MIN_FREQUENCY = 20; // Frecuencia mínima en Hz
  const MAX_FREQUENCY = 20000; // Frecuencia máxima en Hz
  const tolerance = 0.01; // Tolerancia para la precisión de la conversión
  let low = MIN_FREQUENCY;
  let high = MAX_FREQUENCY;
  let mid: number;

  // Realizamos la búsqueda binaria para encontrar la frecuencia que corresponde al valor de Bark deseado
  while (high - low > tolerance) {
    mid = (low + high) / 2;
    const barkMid = hzToBark(mid);

    if (Math.abs(barkMid - barkTarget) < tolerance)
      return mid; // Si la diferencia es pequeña, retornamos la frecuencia

    if (barkMid < barkTarget)
      low = mid; // Nos movemos a la mitad superior
    else
      high = mid; // Nos movemos a la mitad inferior
  }

  // Retorna la frecuencia de la mitad del intervalo cuando ya ha convergido
  return (low + high) / 2;
}

type BarkIntensity = {
  barks: number;
  intensity: number;
};
export function fuseBarks(barkIntensity: BarkIntensity[]): number {
  let sumIntensities = 0;

  barkIntensity.forEach(bi => {
    sumIntensities += bi.intensity;
  } );

  let f = 0;

  barkIntensity.forEach(bi=> {
    const weight = bi.intensity / sumIntensities;

    f += bi.barks * weight;
  } );

  return f;
}
