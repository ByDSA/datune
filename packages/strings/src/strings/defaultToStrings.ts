import { Pitch, Voicing, Chord, Scale, APitch, AChord, AScale, AVoicing, AInterval, Key, ConcertPitch, Spn, DVoicing, ASpn, AKey, ADegree, DPitch } from "@datune/core";
import { CompoundFunc } from "@datune/core/functions/chromatic/compound-function/CompoundFunc";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { CompoundFunc as ACompoundFunc } from "@datune/core/functions/alt/compound-function/CompoundFunc";
import { DegreeFunc as ADegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { PitchSet } from "@datune/core/sets/pitch-set/chromatic/PitchSet";

type ClassType = new (...args: any[])=> any;
const toStringMap: Map<ClassType, ()=> string> = new Map();
const aClasses = [
  AChord,
  ADegree,
  ADegreeFunc,
  ACompoundFunc,
  AInterval,
  AKey,
  APitch,
  AScale,
  ASpn,
  AVoicing,
];
const dClasses = [
  DPitch,
  DVoicing,
];
const cClasses = [
  Chord,
  ConcertPitch,
  DegreeFunc,
  CompoundFunc,
  Key,
  Pitch,
  PitchSet,
  Scale,
  Spn,
  Voicing,
];
const classes = [
  ...aClasses,
  ...dClasses,
  ...cClasses,
];

for (const c of classes)
  toStringMap.set(c as ClassType, c.prototype.toString);

function getDefaultToString(clazz: ClassType): ()=> string {
  return toStringMap.get(clazz) ?? (()=>"toString");
}

export function defaultToString(obj: unknown): string {
  const objClass: ClassType = obj?.constructor as ClassType;
  const f = getDefaultToString(objClass);
  const fBinded = f.bind(obj);
  const ret = fBinded();

  return ret;
}

export function useDefaultToString() {
  for (const c of classes)
    c.prototype.toString = toStringMap.get(c as ClassType) as ()=> string;
}
