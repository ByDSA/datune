import type { PerceptualMidiNote } from "./perception";
import { MidiPitch } from "@datune/midi";
import { gainToVelocity } from "./gain";

const vGain3Db = gainToVelocity(3);

/**
 * Combina dos listas de notas binaurales (izquierda y derecha) en un único
 * conjunto de notas con velocities combinados mediante el modelo de
 * Sivonen & Ellermeier (2006).
 *
 * @param left  Conjunto ordenado de notas percibidas en oído izquierdo
 * @param right Conjunto ordenado de notas percibidas en oído derecho
 * @returns      Conjunto ordenado de notas con velocity combinado
 */
export function mergeBinauralNotes(
  left: PerceptualMidiNote[],
  right: PerceptualMidiNote[],
): PerceptualMidiNote[] {
  const map = new Map<MidiPitch, { vL: number;
vR: number; }>();

  // Rellenar con oído izquierdo
  for (const { pitch, velocity } of left) {
    map.set(pitch, {
      vL: velocity,
      vR: 0,
    } );
  }

  // Añadir/o actualizar con oído derecho
  for (const { pitch, velocity } of right) {
    const entry = map.get(pitch);

    if (entry)
      entry.vR = velocity;
    else {
      map.set(pitch, {
        vL: 0,
        vR: velocity,
      } );
    }
  }

  // Construir resultado usando Sivonen & Ellermeier
  const merged: PerceptualMidiNote[] = [];

  for (const [pitch, { vL, vR }] of map.entries()) {
    const combined = calcularSonoridadBinaural(vL, vR, vGain3Db);

    merged.push( {
      pitch,
      velocity: combined,
    } );
  }

  return merged;
}

/**
 * Calcula el nivel de presión sonora monaural equivalente
 * basado en los niveles de presión sonora binaurales (oído izquierdo y derecho)
 * utilizando una regla de sumación de sonoridad binaural derivada de la fuente.
 *
 * Basado en el paper Sivonen & Ellermeier (2006)
 *
 * La fórmula utilizada es L_mon = x * log2(2^(L_left/x) + 2^(L_right/x)),
 * donde 'x' es el factor de ganancia binaural en dB.
 *
 * @param lLeftDb - Nivel de presión sonora (SPL) en el oído izquierdo en dB.
 * @param lRightDb - Nivel de presión sonora (SPL) en el oído derecho en dB.
 * @param gainDb - El factor de ganancia binaural (x) en dB.
 *
 *  La fuente sugiere 3 dB ("sumación de potencia") como el mejor ajuste para los datos promedio,
 *  pero señala una variación individual considerable.
 *  Estudios anteriores o con metodologías diferentes han sugerido 6 dB o hasta 10 dB.
 *  La elección del valor de gain_dB depende del modelo o datos específicos que se quieran replicar.
 * @returns El nivel de presión sonora monaural equivalente en dB.
 */
export function calcularSonoridadBinaural(
  lLeftDb: number,
  lRightDb: number,
  gainDb: number = 3,
): number {
  // Esta función implementa la fórmula derivada de las Ecuaciones (2), (4) y (5)
  // de la fuente [2, 3, 6].
  // Lmon = x * log2(2^(Lleft/x) + 2^(Lright/x))
  // Calculamos los términos 2^(L/x) para cada oído.
  const termLeft = 2 ** (lLeftDb / gainDb);
  const termRight = 2 ** (lRightDb / gainDb);
  // Sumamos estos términos.
  const sumOfTerms = termLeft + termRight;
  // Calculamos el log2 de la suma.
  const logSum = Math.log2(sumOfTerms);
  // Multiplicamos por el factor de ganancia 'x' para obtener el nivel monaural equivalente en dB.
  const lMonDb = gainDb * logSum;

  return lMonDb;
}
