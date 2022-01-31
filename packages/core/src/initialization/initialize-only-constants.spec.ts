import { C as DAC_C } from "chords/alt";
import { C as CC_C } from "chords/chromatic";
import { A440 as C_A440 } from "concert-pitches/chromatic";
import { I as DA_I } from "degrees/alt";
import { I as C_I } from "degrees/chromatic";
import { I5 as DAF_I5 } from "functions/alt";
import { I5 as C_I5 } from "functions/chromatic";
import { PERFECT_FIFTH as DAI_PERFECT_FIFTH } from "intervals/alt";
import { PERFECT_FIFTH as CI_PERFECT_FIFTH } from "intervals/chromatic";
import { C as DAK_C } from "keys/alt";
import { C as CK_C } from "keys/chromatic";
import { C as DAP_C } from "pitches/alt";
import { C as CP_C } from "pitches/chromatic";
import { C as DP_C } from "pitches/diatonic";
import { MAJOR as DAS_MAJOR } from "scales/alt";
import { MAJOR as CS_MAJOR } from "scales/chromatic";
import { C5 as CPS_C5 } from "sets/pitch-set/chromatic";
import { C4 as DASPN_C4 } from "spns/alt";
import { C4 as CSPN_C4 } from "spns/chromatic";
import { ET12 as CTE_ET12 } from "temperaments/chromatic";
import { EQUAL_440 as CTU_EQUAL_440 } from "tunings/chromatic";
import { TRIAD_MAJOR as DAV_TRIAD_MAJOR } from "voicings/alt";
import { TRIAD_MAJOR as CV_TRIAD_MAJOR } from "voicings/chromatic";
import initialize from "./initialize";

describe("initialize all constants", () => {
  beforeAll(() => {
    initialize();
  } );
  describe("chromatic", () => {
    it("pitch", () => {
      expect(CP_C).toBeDefined();
    } );
    it("concert pitch", () => {
      expect(C_A440).toBeDefined();
    } );
    it("spn", () => {
      expect(CSPN_C4).toBeDefined();
    } );
    it("interval", () => {
      expect(CI_PERFECT_FIFTH).toBeDefined();
    } );
    it("voicing", () => {
      expect(CV_TRIAD_MAJOR).toBeDefined();
    } );
    it("pitch set", () => {
      expect(CPS_C5).toBeDefined();
    } );
    it("chord", () => {
      expect(CC_C).toBeDefined();
    } );
    it("degree", () => {
      expect(C_I).toBeDefined();
    } );
    it("scale", () => {
      expect(CS_MAJOR).toBeDefined();
    } );
    it("function", () => {
      expect(C_I5).toBeDefined();
    } );
    it("key", () => {
      expect(CK_C).toBeDefined();
    } );
    it("temperament", () => {
      expect(CTE_ET12).toBeDefined();
    } );
    it("tuning", () => {
      expect(CTU_EQUAL_440).toBeDefined();
    } );
  } );
  it("diatonic", () => {
    expect(DP_C).toBeDefined();
  } );
  describe("alt", () => {
    it("pitch", () => {
      expect(DAP_C).toBeDefined();
    } );
    // TODO
    /* it("concert pitch", () => {
      expect(DACP_A440).toBeDefined();
    } ); */
    it("spn", () => {
      expect(DASPN_C4).toBeDefined();
    } );
    it("interval", () => {
      expect(DAI_PERFECT_FIFTH).toBeDefined();
    } );
    it("voicing", () => {
      expect(DAV_TRIAD_MAJOR).toBeDefined();
    } );
    // TODO
    /* it("pitch set", () => {
      expect(DAPS_C5).toBeDefined();
    } ); */
    it("chord", () => {
      expect(DAC_C).toBeDefined();
    } );
    it("degree", () => {
      expect(DA_I).toBeDefined();
    } );
    it("scale", () => {
      expect(DAS_MAJOR).toBeDefined();
    } );
    it("function", () => {
      expect(DAF_I5).toBeDefined();
    } );
    it("key", () => {
      expect(DAK_C).toBeDefined();
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
