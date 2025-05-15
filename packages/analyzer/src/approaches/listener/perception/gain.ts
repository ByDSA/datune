const minDb = -60; // nivel en dB para velocity=0
const maxDb = 0; // nivel en dB para velocity=127
const steps = 127;
const deltaDb = (maxDb - minDb) / steps; // ≈ 0.472 dB por unidad

/**
 * Convierte velocity (0–127) a ganancia lineal
 * @param {number} v - velocity [0..127]
 * @returns {number} gain - factor lineal
 */
export function velocityToGain(v: number): number {
  const vel = Math.max(0, Math.min(127, v));
  const levelDb = minDb + (vel * deltaDb);

  return 10 ** (levelDb / 20);
}

/**
 * Convierte ganancia lineal (gain) a velocity (0–127)
 * @param {number} gainDb - ganancia en Dbs
 * @param {number} rangeDb - rango en dBs desde 0 a 127 en velocity
 * @returns {number} v - velocity redondeada [0..127]
 */
export function gainToVelocity(gainDb: number, rangeDb: number = 40): number {
  const velocityPerDb = (127 - 0) / rangeDb;

  return gainDb * velocityPerDb;
}
