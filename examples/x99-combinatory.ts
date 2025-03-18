console.log(
  "How many different chords with any number of pitches I can do in C Major key (pitch order doesn't matters)?",
  countAllCombinations(K.C.pitches.length), // -> 128n (BigInt)
  "(Empty set included)",
);
console.log(
  "How many different chords with 3 pitches I can do in C Major key (pitch order doesn't matters)?",
  countCombinations(K.C.pitches.length, 3), // -> 35n (BigInt)
);
console.log(
  "I want all 3-note chords in C Major that includes C pitch (pitch order doesn't matter)",
  getCombinations(K.C.pitches, 3)
    .filter(p=>p.includes(P.C))
    .map(pitches=>C.fromPitches(...pitches))
    .map(String),
);