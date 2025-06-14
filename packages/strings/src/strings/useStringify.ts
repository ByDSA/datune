/* eslint-disable func-names */
import { IntervalSet, Chord, Scale, APitch, AChord, AScale, AIntervalSet, Pitch, ASpn, ConcertPitch, Key, Spn, Temperaments as TE, ADegree, AKey, AInterval } from "@datune/core";
import { IntervalSet as DIS, Pitch as DPitch } from "@datune/core/diatonic";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { DegreeFunc as ADegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { CompoundFunc } from "@datune/core/functions/chromatic/compound-function/CompoundFunc";
import { CompoundFunc as ACompoundFunc } from "@datune/core/functions/alt/compound-function/CompoundFunc";
import { PitchSet } from "@datune/core/sets/pitch-set/chromatic/PitchSet";
import { stringifyIntervalSet as stringifyAIntervalSet, stringifyChord as stringifyAChord, stringifyScale as stringifyAScale, stringifyPitch as stringifyAPitch, stringifySpn as stringifyASpn, stringifyDegree as stringifyADegree, stringifyKey as stringifyAKey, stringifyInterval as stringifyAInterval } from "alt";
import { stringifyIntervalSet as stringifyDIntervalSet, stringifyPitch as stringifyDPitch } from "diatonic";
import { stringifyChord, stringifyConcertPitch, stringifyKey, stringifyPitch, stringifyScale, stringifyIntervalSet, stringifySpn, stringifyTemperament } from "chromatic";
import { LangId } from "lang";
import { stringifyDegreeFunc } from "./functions/chromatic/degree-function";
import { stringifyCompoundFunc } from "./functions/chromatic/compound-function";
import { stringifyDegreeFunc as stringifyADegreeFunc } from "./functions/alt/degree-function";
import { stringifyCompoundFunc as stringifyACompoundFunc } from "./functions/alt/compound-function";

type Options = {
  lang: LangId;
};
export function useStringify(opts?: Options) {
  const langId = opts?.lang ?? LangId.DEFAULT;

  useStringifyDiatonic(langId);
  useStringifyChromatic(langId);
  useStringifyAlt(langId);
}

function useStringifyDiatonic(langId: LangId) {
  DPitch.prototype.toString = function () {
    return stringifyDPitch(this, {
      langId,
    } ) as any;
  };
  DIS.prototype.toString = function () {
    return stringifyDIntervalSet(this);
  };
}

function useStringifyChromatic(langId: LangId) {
  Chord.prototype.toString = function () {
    return stringifyChord(this);
  };
  ConcertPitch.prototype.toString = function () {
    return stringifyConcertPitch(this);
  };
  DegreeFunc.prototype.toString = function () {
    return stringifyDegreeFunc(this);
  };
  CompoundFunc.prototype.toString = function () {
    return stringifyCompoundFunc(this);
  };
  Key.prototype.toString = function () {
    return stringifyKey(this);
  };
  Pitch.prototype.toString = function () {
    return stringifyPitch(this, {
      langId,
    } ) as any;
  };
  PitchSet.prototype.toString = function () {
    return Array.from(this.pitches).join("-");
  };
  Scale.prototype.toString = function () {
    return stringifyScale(this, {
      langId,
    } );
  };
  Spn.prototype.toString = function () {
    return stringifySpn(this, {
      langId,
    } );
  };

  const temperaments = [
    TE.ET12,
    TE.LIMIT_5_SYMMETRIC_N1, TE.LIMIT_5_SYMMETRIC_N2,
    TE.PYTHAGOREAN,
  ];

  for (const te of temperaments) {
    (te as any).toString = function () {
      return stringifyTemperament(this);
    };
  }

  IntervalSet.prototype.toString = function () {
    return stringifyIntervalSet(this);
  };
}

function useStringifyAlt(langId: LangId) {
  AChord.prototype.toString = function () {
    return stringifyAChord(this, {
      langId,
    } );
  };
  ADegree.prototype.toString = function () {
    return stringifyADegree(this);
  };
  ADegreeFunc.prototype.toString = function () {
    return stringifyADegreeFunc(this);
  };
  ACompoundFunc.prototype.toString = function () {
    return stringifyACompoundFunc(this);
  };
  AInterval.prototype.toString = function () {
    return stringifyAInterval(this);
  };
  AKey.prototype.toString = function () {
    return stringifyAKey(this);
  };
  APitch.prototype.toString = function () {
    return stringifyAPitch(this, {
      langId,
    } );
  };
  AScale.prototype.toString = function () {
    return stringifyAScale(this, {
      langId,
    } );
  };
  ASpn.prototype.toString = function () {
    return stringifyASpn(this, {
      langId,
    } );
  };
  AIntervalSet.prototype.toString = function () {
    return stringifyAIntervalSet(this, {
      langId,
    } );
  };
}
