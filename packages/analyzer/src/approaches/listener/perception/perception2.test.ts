import { Instrument, MidiPitches } from "@datune/midi";
import { get, Perceptual2MidiNote } from "./perception2";

it("test", () => {
  const notes: Perceptual2MidiNote[] = [
    {
      pitch: MidiPitches.C4,
      instrument: Instrument.ACOUSTIC_PIANO,
      velocity: 50,
    },
    {
      pitch: MidiPitches.E4,
      instrument: Instrument.ACOUSTIC_PIANO,
      velocity: 50,
    },
    {
      pitch: MidiPitches.G4,
      instrument: Instrument.ACOUSTIC_PIANO,
      velocity: 50,
    },
  ];
  const r = get(notes);

  console.log(r.map(n=>([(+n[0]).toFixed(2), n[1], MidiPitches.fromFrequency(+n[0]).toString()])));
} );
