/* eslint-disable max-len */
import { MidiNote, MidiPitch } from "@datune/midi";
import { applyLoudnessLevelIso226rev2023 } from "./fletcherMunson";
import { mergeBinauralNotes } from "./perception_binaural";

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
  const noteMap = new Map<MidiPitch, PerceptualMidiNote[]>();
  const ret: PerceptualMidiNote[] = [];

  for (const n of notes) {
    let group = noteMap.get(n.pitch);

    if (group === undefined) {
      group = [];
      noteMap.set(n.pitch, group);
    }

    group.push(n);
  }

  for (const [pitch, group] of noteMap.entries()) {
    ret.push( {
      pitch,
      velocity: sumNoteVelocities(group),
    } );
  }

  return ret;
}

export function withPerceptualNotes(notes: PerceptualMidiNoteWithPanning[]): PerceptualMidiNote[] {
  const fixedVelocityLeftSideNotes = notes.map(n=> {
    let { panning, ...allButPanning } = n;

    if (+n.pitch === 64)
      panning = 127; // TODO

    const leftGain = panning <= PAN_CENTER
      ? 1
      : 1 - ((panning - PAN_CENTER) / (127 - PAN_CENTER));

    return {
      ...allButPanning,
      velocity: n.velocity * leftGain,
    };
  } ).filter(n=>n.velocity > 0);
  const fixedVelocityRightSideNotes = notes.map(n=> {
    const { panning, ...allButPanning } = n;
    const rightGain = panning >= PAN_CENTER
      ? 1
      : panning / PAN_CENTER;

    return {
      ...allButPanning,
      velocity: n.velocity * rightGain,
    };
  } ).filter(n=>n.velocity > 0);
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
// TODO: unused!
export function selectImportantNotes(notes: PerceptualMidiNote[], thresholdRatio: number = 0.5): PerceptualMidiNote[] {
  const maxFinal = Math.max(...notes.map((n) => n.velocity ?? 0));

  return notes.filter((n) => (n.velocity ?? 0) >= thresholdRatio * maxFinal);
}

function sumNoteVelocities(notes: PerceptualMidiNote[]) {
  // phons → sones y suma
  const sTotal = notes
    .map(n => 2 ** ((n.velocity - 40) / 10))
    .reduce((a: number, b: number) => a + b, 0);
  // sones → phons total
  const lTotal = 40 + (10 * Math.log2(sTotal));

  return lTotal;
}

export function classifyPerception(notes: PerceptualMidiNote[]) {
  const minThreshold = 0.55;
  const maxThreshold = 0.6;
  const sumVelocity = sumNoteVelocities(notes);
  const ret = {
    discard: [] as PerceptualMidiNote[],
    unsure: [] as PerceptualMidiNote[],
    sure: [] as PerceptualMidiNote[],
    sumVelocity,
  };

  notes.forEach((note) => {
    if (note.velocity / sumVelocity < minThreshold)
      ret.discard.push(note);
    else if (note.velocity / sumVelocity > maxThreshold)
      ret.sure.push(note);
    else
      ret.unsure.push(note);
  } );

  return ret;
}
