import { Chords as AC, Degrees as AD, Funcs as AF, Intervals as AI, Keys as AK, Pitches as AP, Spns as AN, Scales as AS, Voicings as AV, Pitch as APitch, Voicing as AVoicing, Chord as AChord, Degree as ADegree, Key as AKey, Spn as ASpn, Scale as AScale, Interval as AInterval } from "@datune/core/alt";
import { Chords as C, Pitches as P, ConcertPitches as CP, Funcs as F, Keys as K, PitchSets as PS, Scales as S, Spns as N, Temperaments as TE, Voicings as V, Pitch, Chord, Voicing, Key, Spn, Scale, ConcertPitch, Degrees as D, Intervals as I } from "@datune/core/chromatic";
import { Pitches as DP, Voicings as DV, Pitch as DPitch, Voicing as DVoicing } from "@datune/core/diatonic";
import { DegreeFunc as ADegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { CompoundFunc as ACompoundFunc } from "@datune/core/functions/alt/compound-function/CompoundFunc";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { CompoundFunc } from "@datune/core/functions/chromatic/compound-function/CompoundFunc";
import { PitchSet } from "@datune/core/sets/pitch-set/chromatic/PitchSet";
import { useStringify } from "./useStringify";
import { useDefaultToString } from "./defaultToStrings";

describe("before", ()=> {
  const failFn = ()=> undefined as any;

  describe("diatonic", () => {
    beforeAll(() => {
      for (const c of [DPitch, DVoicing])
        c.prototype.toString = failFn;
    } );

    it("pitches", () => {
      expect(DP.D.toString()).toBeUndefined();
    } );

    it("voicing", () => {
      expect(DV.NINTH_SUS4.toString()).toBeUndefined();
    } );
  } );

  describe("alt", () => {
    beforeAll(() => {
      for (const c of [APitch, AChord, AVoicing, ADegree,
        ADegreeFunc, ACompoundFunc, AInterval, AKey, ASpn, AScale])
        c.prototype.toString = failFn;
    } );

    it("chord", () => {
      expect(AC.A7b5.toString()).toBeUndefined();
    } );

    it("degree", () => {
      expect(AD.aIV.toString()).toBeUndefined();
    } );

    it("degree func", () => {
      expect(AF.bII7SUS4b9.toString()).toBeUndefined();
    } );

    it("compound func", () => {
      expect(AF.V7_V.toString()).toBeUndefined();
    } );

    it("interval", () => {
      expect(AI.a8.toString()).toBeUndefined();
    } );

    it("key", () => {
      expect(AK.FFm.toString()).toBeUndefined();
    } );

    it("pitches", () => {
      expect(AP.FFF.toString()).toBeUndefined();
    } );

    it("spn", () => {
      expect(AN.GG9.toString()).toBeUndefined();
    } );

    it("scale", () => {
      expect(AS.SUPERLOCRIAN_bb7.toString()).toBeUndefined();
    } );

    it("voicing", () => {
      expect(AV.THIRTEENTH_a5b9.toString()).toBeUndefined();
    } );
  } );

  describe("chromatic", () => {
    beforeAll(() => {
      for (const c of [Pitch, Chord, ConcertPitch, Voicing,
        DegreeFunc, CompoundFunc, Key, PitchSet, Spn, Scale])
        c.prototype.toString = failFn;

      const temperaments = [
        TE.ET12,
        TE.LIMIT_5_SYMMETRIC_N1, TE.LIMIT_5_SYMMETRIC_N2,
        TE.PYTHAGOREAN,
      ];

      for (const te of temperaments)
        (te as any).toString = failFn;
    } );

    it("chord", () => {
      expect(C.CCm.toString()).toBeUndefined();
    } );

    it("concert pitch", () => {
      expect(CP.A440.toString()).toBeUndefined();
    } );

    // Los degrees son numbers!
    // it("degree", () => {
    //   expect(D.bVII.toString()).toBeUndefined();
    // } );
    it("degree func", () => {
      expect(F.bIIIMaj7b5.toString()).toBeUndefined();
    } );

    it("compound func", () => {
      expect(F.V7_IV.toString()).toBeUndefined();
    } );

    // Los intervals son numbers!
    // it("interval", () => {
    //   expect(I.TRITONE.toString()).toBeUndefined();
    // } );
    it("key", () => {
      expect(K.AAm.toString()).toBeUndefined();
    } );

    it("pitch", () => {
      expect(P.Eb.toString()).toBeUndefined();
    } );

    it("pitch set", () => {
      expect(PS.AA5.toString()).toBeUndefined();
    } );

    it("scale", () => {
      expect(S.BLUES_a4.toString()).toBeUndefined();
    } );

    it("spn", () => {
      expect(N.G7.toString()).toBeUndefined();
    } );

    it("temperament", () => {
      expect(TE.ET12.toString()).toBeUndefined();
    } );

    it("voicing", () => {
      expect(V.ELEVENTH_b9.toString()).toBeUndefined();
    } );
  } );
} );

describe("after", () => {
  beforeAll(() => {
    useStringify();
  } );

  describe("diatonic", () => {
    it("pitches", () => {
      expect(DP.D.toString()).toBe("D");
    } );

    it("voicing", () => {
      expect(DV.NINTH_SUS4.toString()).toBeDefined();
    } );
  } );

  describe("alt", () => {
    it("chord", () => {
      expect(AC.A7b5.toString()).toBe("A7♭5");
    } );

    it("degree", () => {
      expect(AD.aIV.toString()).toBe("♯IV");
    } );

    it("degree func", () => {
      expect(AF.bII7SUS4b9.toString()).toBe("♭II7sus4(♭9)");
    } );

    it("compound func", () => {
      expect(AF.V7_V.toString()).toBe("V7/V");
    } );

    it("interval", () => {
      expect(AI.a8.toString()).toBe("a8");
    } );

    it("key", () => {
      expect(AK.FFm.toString()).toBe("F♯ Minor");
    } );

    it("pitches", () => {
      expect(AP.FFF.toString()).toBe("F♯♯");
    } );

    it("spn", () => {
      expect(AN.GG9.toString()).toBe("G♯9");
    } );

    it("scale", () => {
      expect(AS.SUPERLOCRIAN_bb7.toString()).toBe("Superlocrian ♭♭7");
    } );

    it("voicing", () => {
      expect(AV.THIRTEENTH_a5b9.toString()).toBe("THIRTEENTH ♯5 ♭9");
    } );
  } );

  describe("chromatic", () => {
    it("chord", () => {
      expect(C.CCm.toString()).toBe("C♯m");
    } );

    it("concert pitch", () => {
      expect(CP.A440.toString()).toBe("A4-440");
    } );

    it("degree", () => {
      expect(D.bVII.toString()).toBeDefined();
    } );

    it("degree func", () => {
      expect(F.bIIIMaj7b5.toString()).toBe("♭IIIMaj7♭5");
    } );

    it("compound func", () => {
      expect(F.V7_IV.toString()).toBe("V7/IV");
    } );

    it("interval", () => {
      expect(I.TRITONE.toString()).toBeDefined();
    } );

    it("key", () => {
      expect(K.AAm.toString()).toBe("A♯ Minor");
    } );

    it("pitch", () => {
      expect(P.Eb.toString()).toBe("D♯");
    } );

    it("pitch set", () => {
      expect(PS.AA5.toString()).toBe("A♯-F");
    } );

    it("scale", () => {
      expect(S.BLUES_a4.toString()).toBe("Blues ♭5");
    } );

    it("spn", () => {
      expect(N.G7.toString()).toBe("G7");
    } );

    it("temperament", () => {
      expect(TE.ET12.toString()).toBe("12-ET");
    } );

    it("voicing", () => {
      expect(V.ELEVENTH_b9.toString()).toBe("Eleventh ♭9");
    } );
  } );
} );

describe("use default toString back", ()=> {
  beforeAll(() => {
    useDefaultToString();
  } );

  describe("diatonic", () => {
    it("voicing", () => {
      expect(DV.NINTH_SUS4.toString()).toBeDefined();
    } );
  } );

  describe("alt", () => {
    it("chord", () => {
      expect(AC.A7b5.toString()).not.toBe("A7♭5");
    } );

    // Por defecto = stringify
    it("degree", () => {
      expect(AD.aIV.toString()).toBe("♯IV");
    } );

    it("degree func", () => {
      expect(AF.bII7SUS4b9.toString()).not.toBe("♭II7sus4(♭9)");
    } );

    it("compound func", () => {
      expect(AF.V7_IV.toString()).not.toBe("V7/IV");
    } );

    it("key", () => {
      expect(AK.from(AP.FF, AS.PHRYGIAN).toString()).not.toBe("F♯ Phrygian");
    } );

    it("scale", () => {
      expect(AS.SUPERLOCRIAN_bb7.toString()).not.toBe("Superlocrian ♭♭7");
    } );

    it("voicing", () => {
      expect(AV.THIRTEENTH_a5b9.toString()).not.toBe("THIRTEENTH ♯5 ♭9");
    } );
  } );

  describe("chromatic", () => {
    it("chord", () => {
      expect(C.CCm.toString()).not.toBe("C♯m");
    } );

    it("degree func", () => {
      expect(F.bIIIMaj7b5.toString()).not.toBe("♭IIIMaj7♭5");
    } );

    it("compound func", () => {
      expect(F.V7_IV.toString()).not.toBe("V7/IV");
    } );

    it("key", () => {
      expect(K.AAm.toString()).not.toBe("A♯ Minor");
    } );

    it("pitch", () => {
      expect(P.Eb.toString()).not.toBe("D♯");
    } );

    it("pitch set", () => {
      expect(PS.AA5.toString()).not.toBe("A♯-F");
    } );

    it("scale", () => {
      expect(S.BLUES_a4.toString()).not.toBe("Blues ♭5");
    } );

    // No cambian con defaultToString !!
    it("temperament", () => {
      expect(TE.ET12.toString()).toBe("12-ET");
    } );

    it("voicing", () => {
      expect(V.ELEVENTH_b9.toString()).not.toBe("Eleventh ♭9");
    } );
  } );
} );
