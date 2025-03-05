import { Chords as AC } from "chords/alt";
import { Chords as CC } from "chords/chromatic";
import { ConcertPitches as CCP } from "concert-pitches/chromatic";
import { Degrees as AD } from "degrees/alt";
import { Degrees as C } from "degrees/chromatic";
import { Funcs as AF } from "functions/alt";
import { Funcs as CF } from "functions/chromatic";
import { Intervals as AI } from "intervals/alt";
import { Intervals as CI } from "intervals/chromatic";
import { Keys as AK } from "keys/alt";
import { Keys as CK } from "keys/chromatic";
import { Pitches as AP } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Scales as AS } from "scales/alt";
import { Scales as CS } from "scales/chromatic";
import { PitchSets as CPS } from "sets/pitch-set/chromatic";
import { SPNs as ASPN } from "spns/alt";
import { SPNs as CSPN } from "spns/chromatic";
import { Temperaments as CTE } from "temperaments/chromatic";
import { Tunings as CTU } from "tunings/chromatic";
import { Voicings as AV } from "voicings/alt";
import { Voicings as CV } from "voicings/chromatic";
import { initialize } from "./initialize";

describe("initialize all constants", () => {
  beforeAll(() => {
    initialize();
  } );

  describe("chromatic", () => {
    it("pitch", () => {
      expect(CP.C).toBeDefined();
    } );

    it("concert pitch", () => {
      expect(CCP.A440).toBeDefined();
    } );

    it("spn", () => {
      expect(CSPN.C4).toBeDefined();
    } );

    it("interval", () => {
      expect(CI.P5).toBeDefined();
    } );

    it("voicing", () => {
      expect(CV.TRIAD_MAJOR).toBeDefined();
    } );

    it("pitch set", () => {
      expect(CPS.C5).toBeDefined();
    } );

    it("chord", () => {
      expect(CC.C).toBeDefined();
    } );

    it("degree", () => {
      expect(C.I).toBeDefined();
    } );

    it("scale", () => {
      expect(CS.MAJOR).toBeDefined();
    } );

    it("function", () => {
      expect(CF.I5).toBeDefined();
    } );

    it("key", () => {
      expect(CK.C).toBeDefined();
    } );

    it("temperament", () => {
      expect(CTE.ET12).toBeDefined();
    } );

    it("tuning", () => {
      expect(CTU.EQUAL_440).toBeDefined();
    } );
  } );

  it("diatonic", () => {
    expect(DP.C).toBeDefined();
  } );

  describe("alt", () => {
    it("pitch", () => {
      expect(AP.C).toBeDefined();
    } );

    it("spn", () => {
      expect(ASPN.C4).toBeDefined();
    } );

    it("interval", () => {
      expect(AI.P5).toBeDefined();
    } );

    it("voicing", () => {
      expect(AV.TRIAD_MAJOR).toBeDefined();
    } );

    it("chord", () => {
      expect(AC.C).toBeDefined();
    } );

    it("degree", () => {
      expect(AD.I).toBeDefined();
    } );

    it("scale", () => {
      expect(AS.MAJOR).toBeDefined();
    } );

    it("function", () => {
      expect(AF.I5).toBeDefined();
    } );

    it("key", () => {
      expect(AK.C).toBeDefined();
    } );
  } );
} );
