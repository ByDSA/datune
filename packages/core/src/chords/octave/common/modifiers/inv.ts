import { Arrays } from "datils/datatypes/arrays";
import { SymbolicChord } from "../../SymbolicChord";

export function inv<C extends SymbolicChord<any, any>>(
  obj: C,
  n: number = 1,
): C {
  if (n === 0)
    return obj;

  const prevBass = obj.bass;
  const pitchSet = obj.pitchSet.withAdd(prevBass);
  const { pitches } = pitchSet;
  const bassIndex = pitches.indexOf(prevBass);

  Arrays.rotateLeft(pitches, bassIndex + n);

  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet,
    root: obj.root,
    bass: pitches[0],
  } );
}
