import initialize from "./initialize";
import { Chords as DAC } from "chords/alt";
import { Chords as CC } from "chords/chromatic";
import { ConcertPitches as CCP } from "concert-pitches/chromatic";
import { Degrees as DA } from "degrees/alt";
import { Degrees as C } from "degrees/chromatic";
import { Functions as DAF } from "functions/alt";
import { Functions as CF } from "functions/chromatic";
import { Intervals as DAI } from "intervals/alt";
import { Intervals as CI } from "intervals/chromatic";
import { Keys as DAK } from "keys/alt";
import { Keys as CK } from "keys/chromatic";
import { Pitches as DAP } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Scales as DAS } from "scales/alt";
import { Scales as CS } from "scales/chromatic";
import { PitchSets as CPS } from "sets/pitch-set/chromatic";
import { SPNs as DASPN } from "spns/alt";
import { SPNs as CSPN } from "spns/chromatic";
import { Temperaments as CTE } from "temperaments/chromatic";
import { Tunings as CTU } from "tunings/chromatic";
import { Voicings as DAV } from "voicings/alt";
import { Voicings as CV } from "voicings/chromatic";

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
      expect(CI.PERFECT_FIFTH).toBeDefined();
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
      expect(DAP.C).toBeDefined();
    } );

    // TODO
    /* it("concert pitch", () => {
      expect(DACP_A440).toBeDefined();
    } ); */
    it("spn", () => {
      expect(DASPN.C4).toBeDefined();
    } );

    it("interval", () => {
      expect(DAI.PERFECT_FIFTH).toBeDefined();
    } );

    it("voicing", () => {
      expect(DAV.TRIAD_MAJOR).toBeDefined();
    } );

    // TODO
    /* it("pitch set", () => {
      expect(DAPS_C5).toBeDefined();
    } ); */
    it("chord", () => {
      expect(DAC.C).toBeDefined();
    } );

    it("degree", () => {
      expect(DA.I).toBeDefined();
    } );

    it("scale", () => {
      expect(DAS.MAJOR).toBeDefined();
    } );

    it("function", () => {
      expect(DAF.I5).toBeDefined();
    } );

    it("key", () => {
      expect(DAK.C).toBeDefined();
    } );
    // TODO
    /*
    it("temperament", () => {
      expect(DATE_ET12).toBeDefined();
    } );
    it("tuning", () => {
      expect(DATU_EQUAL_440).toBeDefined();
    } ); */
  } );
} );
