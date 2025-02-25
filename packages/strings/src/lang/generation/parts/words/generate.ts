import Input from "./Input";

type Settings = Input;

export default function wordsGenerate(basePart: Input): Settings {
  return {
    note: basePart.note,
    chord: basePart.chord,
    scale: basePart.scale,
    key: basePart.key,
    tuning: basePart.tuning,
    temperament: basePart.temperament,
    degreeFunction: basePart.degreeFunction,
    degree: basePart.degree,
    pitch: basePart.pitch,
    voicing: basePart.voicing,
    inversion: basePart.inversion,
    root: basePart.root,
    noteAlt: basePart.noteAlt,
    diatonic: basePart.diatonic,
  };
}
