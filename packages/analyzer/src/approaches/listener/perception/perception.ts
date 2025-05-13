/* eslint-disable max-len */
import { MidiNote, MidiPitch } from "@datune/midi";
import { applyLoudnessLevelIso226rev2023 } from "./fletcherMunson";

const PAN_CENTER = 64;

export type PerceptualMidiNoteWithPanning = Omit<MidiNote, "duration">;

export type PerceptualMidiNote = Omit<PerceptualMidiNoteWithPanning, "panning">;

export function midiToFrequency(midi: MidiPitch): number {
  return 440 * (2 ** ((+midi - 69) / 12));
}

/**
 * Calcula el efecto de enmascaramiento entre dos notas.
 * Se considera que la nota "competidora" enmascara a la nota actual si su effectiveMagnitude es mayor.
 * El efecto se modela con una función exponencial en función de la diferencia en semitonos.
 */
function maskingEffect(note: PerceptualMidiNote, competitor: PerceptualMidiNote, alpha: number = 0.75): number {
  const semitoneDiff = Math.abs(+note.pitch - +competitor.pitch);

  // El efecto decrece exponencialmente con la distancia.
  return competitor.velocity * Math.exp(-alpha * semitoneDiff);
}

export function mergeDuplicatedNotesLogarithmic(notes: PerceptualMidiNote[]): PerceptualMidiNote[] {
  const noteMap = new Map<MidiPitch, number>();
  const ret: PerceptualMidiNote[] = [];

  // Convertir velocity a una escala logarítmica y sumar las potencias
  notes.forEach((note) => {
    const power = (note.velocity) ** 2; // Aproximación perceptual (relación cuadrática)
    const existing = noteMap.get(note.pitch);

    if (existing === undefined) {
      ret.push(note);
      noteMap.set(note.pitch, power);
    } else
      noteMap.set(note.pitch, existing + power);
  } );

  return ret.map(n=>{
    const powerSum = noteMap.get(n.pitch)!;
    const fixedVelocity = Math.round(Math.sqrt(powerSum));

    return {
      ...n,
      velocity: fixedVelocity,
    };
  } );
}

export function withPerceptualNotes(notes: PerceptualMidiNoteWithPanning[]): PerceptualMidiNote[] {
  const fixedVelocityLeftSideNotes = notes.map(n=> {
    const { panning, ...allButPanning } = n;
    const leftGain = panning <= PAN_CENTER
      ? 1
      : 1 - ((panning - PAN_CENTER) / (127 - PAN_CENTER));

    return {
      ...allButPanning,
      velocity: n.velocity * leftGain,
    };
  } );
  const fixedVelocityRightSideNotes = notes.map(n=> {
    const { panning, ...allButPanning } = n;
    const rightGain = panning >= PAN_CENTER
      ? 1
      : panning / PAN_CENTER;

    return {
      ...allButPanning,
      velocity: n.velocity * rightGain,
    };
  } );
  const leftSidePerceptualNotes = withPerceptualNotesSide(fixedVelocityLeftSideNotes);
  const rightSidePerceptualNotes = withPerceptualNotesSide(fixedVelocityRightSideNotes);
  const mergedNotes = mergeBinauralNotes(leftSidePerceptualNotes, rightSidePerceptualNotes);

  return mergedNotes;
}

export function withPerceptualNotesSide(notes: PerceptualMidiNote[]) {
  const mergedNotes = mergeDuplicatedNotesLogarithmic([...notes]);
  const notesSingleFixed: PerceptualMidiNote[] = mergedNotes.map(n=>( {
    ...n,
    pitch: n.pitch,
    velocity: singlePerceptualVelocity(n),
  } ));

  return withMaskingApplied(notesSingleFixed);
}

/**
 * Combina dos listas de notas binaurales (izquierda y derecha) en un único
 * conjunto de notas con velocities combinados mediante el modelo de
 * Sivonen & Ellermeier (2006), usando un exponente empírico α.
 *
 * @param left  Conjunto ordenado de notas percibidas en oído izquierdo
 * @param right Conjunto ordenado de notas percibidas en oído derecho
 * @returns      Conjunto ordenado de notas con velocity combinado
 */
export function mergeBinauralNotes(left: PerceptualMidiNote[], right: PerceptualMidiNote[]): PerceptualMidiNote[] {
  const alpha = 0.23; // Exponente empírico de Sivonen & Ellermeier
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
    const combined = ((vL ** alpha) + (vR ** alpha)) ** (1 / alpha);

    merged.push( {
      pitch,
      velocity: combined,
    } );
  }

  return merged;
}

function singlePerceptualVelocity(note: PerceptualMidiNote) {
  const { pitch, velocity } = note;
  const frequency = midiToFrequency(pitch);
  const effectiveMagnitude = velocity * applyLoudnessLevelIso226rev2023(frequency, velocity);

  return effectiveMagnitude;
}

/**
 * Para cada nota, calcula la magnitud final restando el enmascaramiento de notas competidoras.
 * Solo se consideran las notas competidoras que tengan mayor effectiveMagnitude.
 */
function withMaskingApplied(notes: PerceptualMidiNote[]): PerceptualMidiNote[] {
  // Calcula la magnitud final
  for (let i = 0; i < notes.length; i++) {
    let maskSum = 0;

    for (let j = 0; j < notes.length; j++) {
      if (i === j)
        continue;

      // Solo consideramos si la nota competidora tiene mayor effectiveMagnitude
      if (notes[j].velocity > notes[i].velocity)
        maskSum += maskingEffect(notes[i], notes[j]);
    }

    notes[i].velocity = Math.max(notes[i].velocity - maskSum, 0);
  }

  return notes;
}

/**
 * Selecciona las notas que superan un umbral relativo a la nota con mayor finalMagnitude.
 * Por ejemplo, se conservan aquellas cuyo finalMagnitude es al menos el 50% del máximo.
 */
export function selectImportantNotes(notes: PerceptualMidiNote[], thresholdRatio: number = 0.5): PerceptualMidiNote[] {
  const maxFinal = Math.max(...notes.map((n) => n.velocity ?? 0));

  return notes.filter((n) => (n.velocity ?? 0) >= thresholdRatio * maxFinal);
}

export function classifyPerception(notes: PerceptualMidiNote[]) {
  const minThreshold = 0.45;
  const maxThreshold = 0.75;
  const maxVelocity = Math.max(...notes.map((n) => n.velocity ?? 0));
  const ret = {
    discard: [] as PerceptualMidiNote[],
    unsure: [] as PerceptualMidiNote[],
    sure: [] as PerceptualMidiNote[],
    maxVelocity,
  };

  notes.forEach((note) => {
    if (note.velocity / maxVelocity < minThreshold)
      ret.discard.push(note);
    else if (note.velocity / maxVelocity > maxThreshold)
      ret.sure.push(note);
    else
      ret.unsure.push(note);
  } );

  return ret;
}
