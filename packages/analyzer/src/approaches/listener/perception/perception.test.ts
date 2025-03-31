import { MidiPitch, MidiPitches } from "@datune/midi";
import { withPerceptualNotes, PerceptualMidiNote, selectImportantNotes, mergeDuplicateNotesLogarithmic } from "./perception";

it("test", () => {
  const input: PerceptualMidiNote[] = [
    [MidiPitches.A5, 110],
    [MidiPitches.CC5, 90],
    [MidiPitches.FF4, 90],
    [MidiPitches.FF3, 110],
    [MidiPitches.A5, 120],
    [MidiPitches.FF5, 120],
    [MidiPitches.CC5, 120],
    [MidiPitches.A5, 110],
    [MidiPitches.FF5, 110],
    [MidiPitches.FF3, 120],
    [MidiPitches.E5, 110],
  ].map(a=>( {
    pitch: a[0] as MidiPitch,
    velocity: a[1] as number,
  } ));
  // F#3, F#4, C#5, E5, F#5, A5
  const perceptualNotes = withPerceptualNotes(input);

  // A5: 3 veces, C#5: 2 veces, F#3: 2 veces, F#5: 2 veces
  expect(mergeDuplicateNotesLogarithmic(input)).toHaveLength(input.length - 5);
  expect(perceptualNotes).toHaveLength(mergeDuplicateNotesLogarithmic(input).length);

  const selectedNotes = selectImportantNotes(perceptualNotes); // F#3, F#4, C#5, F#5, A5

  expect(selectedNotes).toHaveLength(perceptualNotes.length - 1); // Ha quitado E5
} );
