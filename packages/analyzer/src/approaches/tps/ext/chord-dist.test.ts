import { Chord, Degrees as D, Funcs, Keys } from "@datune/core/alt";
import { regionalLevelChordDistanceRule } from "../regional/chord-distance-rule";
import { getDiatonicDegreeFuncsInScale } from "./regions";

it("test", () => {
  const key = Keys.C;
  const funcs = getDiatonicDegreeFuncsInScale( {
    scale: key.scale,
  } );
  const chords = funcs.map(f=>f.getChord(key.root));
  const y = {
    chord: key.triadRootChord!,
    key,
  };
  const another = {
    chord: Funcs.fromDegrees(D.V, D.I, D.III).getChord(key.root),
    key: key.withMode(5),
  };
  const classification = {
    nearToTonic: [] as [Chord, number][],
    nearToAnother: [] as [Chord, number][],
    equal: [] as [Chord, number][],
  };

  for (const c of chords) {
    const startKey = key.withMode(key.pitches.indexOf(c.root) + 1);
    const x = {
      chord: c,
      key: startKey,
    };
    const dToTonic = regionalLevelChordDistanceRule( {
      x,
      y,
    } );
    const dToAnother = regionalLevelChordDistanceRule( {
      x,
      y: another,
    } );

    if (dToTonic.dist > dToAnother.dist)
      classification.nearToAnother.push([c, dToAnother.dist]);
    else if (dToTonic.dist < dToAnother.dist)
      classification.nearToTonic.push([c, dToTonic.dist]);
    else
      classification.equal.push([c, dToTonic.dist]);
  }

  expect(classification.nearToAnother).toBeTruthy();
} );
