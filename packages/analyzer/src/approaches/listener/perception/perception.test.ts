import { MidiPitch, MidiPitches } from "@datune/midi";
import { withPerceptualNotes, selectImportantNotes, mergeDuplicatedNotesLogarithmic, PerceptualMidiNoteWithPanning } from "./perception";

it("test", () => {
  const input: PerceptualMidiNoteWithPanning[] = [
    [MidiPitches.A5, 110, 64],
    [MidiPitches.CC5, 90, 64],
    [MidiPitches.FF4, 90, 64],
    [MidiPitches.FF3, 110, 64],
    [MidiPitches.A5, 120, 64],
    [MidiPitches.FF5, 120, 64],
    [MidiPitches.CC5, 120, 64],
    [MidiPitches.A5, 110, 64],
    [MidiPitches.FF5, 110, 64],
    [MidiPitches.FF3, 120, 64],
    [MidiPitches.E5, 110, 64],
  ].map(a=>( {
    pitch: a[0] as MidiPitch,
    velocity: a[1] as number,
    panning: a[2] as number,
  } ));
  // F#3, F#4, C#5, E5, F#5, A5
  const perceptualNotes = withPerceptualNotes(input);

  // A5: 3 veces, C#5: 2 veces, F#3: 2 veces, F#5: 2 veces
  expect(mergeDuplicatedNotesLogarithmic(input)).toHaveLength(input.length - 5);
  expect(perceptualNotes).toHaveLength(mergeDuplicatedNotesLogarithmic(input).length);

  const selectedNotes = selectImportantNotes(perceptualNotes); // F#3, F#4, C#5, F#5, A5

  expect(selectedNotes).toHaveLength(perceptualNotes.length - 1); // Ha quitado E5
} );
