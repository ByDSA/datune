import { MidiPitch, MidiPitches as M } from "@datune/midi";

type PitchVelocity = [MidiPitch, number];

it("test", () => {
  const base: PitchVelocity[] = [
    [M.D6, 120],
    [M.GG5, 100],
    [M.A4, 100],
    [M.A3, 100],
    [M.FF6, 110],
  ];
  const to: PitchVelocity[] = [
    [M.GG5, 100],
    [M.CC6, 120],
    [M.A4, 100],
    [M.A3, 100],
    [M.FF6, 110],
  ];
} );
