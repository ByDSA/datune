export interface DissonanceResult {
  frequencyRatio: number;
  dissonance: number;
}

/**
 * Encuentra los máximos relativos en un array de DissonanceResult
 * @param data Array de DissonanceResult ordenado por frequencyRatio
 * @param tolerance Factor que determina qué tan prominente debe ser un pico (0-1, donde 0.01 =
   1% de prominencia)
 * @param minDistance Distancia mínima entre máximos (por defecto se calcula automáticamente)
 * @returns Array con los máximos relativos encontrados
 */
export function findLocalMaxima(
  data: DissonanceResult[],
  tolerance: number = 1,
): DissonanceResult[] {
  if (data.length < (tolerance * 2) + 1)
    return [];

  const maxima: DissonanceResult[] = [];

  // Verificar si el primer elemento (índice 0) es un máximo
  if (data.length > tolerance) {
    const first = data[0];
    const next = data[tolerance];

    // Si el primer elemento es mayor que el siguiente, considerarlo máximo
    if (first.dissonance > next.dissonance)
      maxima.push(first);
  }

  // Recorrer todo el array desde el segundo hasta el penúltimo elemento
  for (let i = tolerance; i < data.length - tolerance; i++) {
    const current = data[i];
    const prev = data[i - tolerance];
    const next = data[i + tolerance];

    // Si a la izquierda es menor Y a la derecha es menor, es un máximo
    if (prev.dissonance < current.dissonance && next.dissonance < current.dissonance)
      maxima.push(current);
  }

  return maxima.sort((a, b) => a.frequencyRatio - b.frequencyRatio);
}

/**
 * Encuentra los mínimos relativos en un array de DissonanceResult
 * @param data Array de DissonanceResult ordenado por frequencyRatio
 * @param tolerance Factor que determina qué tan prominente debe ser un valle (0-1, donde 0.005 =
   0.5% de prominencia)
 * @param minDistance Distancia mínima entre mínimos (por defecto se calcula automáticamente)
 * @returns Array con los mínimos relativos encontrados
 */
export function findLocalMinima(
  data: DissonanceResult[],
  tolerance: number = 1,
): DissonanceResult[] {
  if (data.length < (tolerance * 2) + 1)
    return [];

  const minima: DissonanceResult[] = [];

  // Verificar si el primer elemento (índice 0) es un mínimo
  if (data.length > tolerance) {
    const first = data[0];
    const next = data[tolerance];

    // Si el primer elemento es menor que el siguiente, considerarlo mínimo
    if (first.dissonance < next.dissonance)
      minima.push(first);
  }

  // Recorrer todo el array desde el segundo hasta el penúltimo elemento
  for (let i = tolerance; i < data.length - tolerance; i++) {
    const current = data[i];
    const prev = data[i - tolerance];
    const next = data[i + tolerance];

    // Si a la izquierda es mayor Y a la derecha es mayor, es un mínimo
    if (prev.dissonance > current.dissonance && next.dissonance > current.dissonance)
      minima.push(current);
  }

  return minima.sort((a, b) => a.frequencyRatio - b.frequencyRatio);
}

/**
 * Función de utilidad que encuentra tanto máximos como mínimos
 * @param data Array de DissonanceResult ordenado por frequencyRatio
 * @param maxTolerance Tolerancia para máximos (por defecto 0.001 = 0.1%)
 * @param minTolerance Tolerancia para mínimos (por defecto 0.0005 = 0.05%)
 * @param minDistance Distancia mínima entre extremos (opcional, se calcula automáticamente)
 * @returns Objeto con arrays de máximos y mínimos
 */
export function findExtrema(
  data: DissonanceResult[],
): { maxima: DissonanceResult[];
minima: DissonanceResult[]; } {
  return {
    maxima: findLocalMaxima(data),
    minima: findLocalMinima(data),
  };
}

export function normalizeResults(results: DissonanceResult[]) {
  let max = -Infinity;
  let min = Infinity;

  for (const r of results) {
    max = Math.max(max, r.dissonance);
    min = Math.min(min, r.dissonance);
  }

  for (const r of results)
    r.dissonance = (r.dissonance - min) / (max - min);
}

export interface ComparisonResult {
  frequencyRatio: number;
  sethares?: number;
  vassilakis?: number;
  harmonicEntropy?: number;
  mezcla?: number;
}

export interface ModelResults {
  sethares?: DissonanceResult[];
  vassilakis?: DissonanceResult[];
  harmonicEntropy?: DissonanceResult[];
  mezcla?: DissonanceResult[];
}
