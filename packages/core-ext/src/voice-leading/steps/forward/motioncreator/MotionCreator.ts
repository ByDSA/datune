import { Arrays } from "@datune/utils";
import { betweenSPN, Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { Array as KeyArray } from "@datune/core/keys/chromatic";
import { Array as ChromaticArray } from "@datune/core/pitches/chromatic";
import { Array as SPNArray, SPN } from "@datune/core/spns/chromatic";
import { Array as VoicingArray, fromRootIntervals as voicingFromRootIntervals } from "@datune/core/voicings/chromatic";
import { CombinationResult, StepCombinationsApplier } from "../../applier/StepCombinationsApplier";
import { StepCombiner } from "../../combiner/StepCombiner";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { Array as SingleStepArray } from "../../single";
import { MultiStepsGen } from "../multi/MultiStepsGen";
import MotionCreatorSettings from "./MotionCreatorSettings";
import { MotionCreatorResult } from "./result/MotionCreatorResult";

type ApplierFunction = (a: StepCombinationsApplier)=> void;
type ConfigMultiStepFunction = (ms: MultiStepsGen)=> void;

export default class MotionCreator {
  private _settings: MotionCreatorSettings;

  private _combiner: StepCombiner | undefined;

  private _reasonsMap: ReasonStepMap | undefined;

  private _applierFunction: ApplierFunction | undefined;

  private _multiStepFunctions: ConfigMultiStepFunction[] | undefined;

  constructor() {
    this._settings = new MotionCreatorSettings();
  }

  static create(): MotionCreator {
    return new MotionCreator();
  }

  fromNotes(...fromNotes: SPNArray): MotionCreator {
    this._settings.fromNotes = fromNotes;

    return this;
  }

  configApplier(f: ApplierFunction): MotionCreator {
    this._applierFunction = f;

    return this;
  }

  requireVoicingResolution(): MotionCreator {
    return this.configMultiStepGen((ms) => ms.requireVoicingResolution());
  }

  requireRestingResolution(): MotionCreator {
    return this.configMultiStepGen((ms) => ms.requireKeyResolution());
  }

  calc(): MotionCreatorResult {
    this._initialize();

    const targets = this._calcResults();

    if (!this._reasonsMap)
      throw new Error();

    return {
      combinationResults: targets,
      reasonsMap: this._reasonsMap,
    };
  }

  private _calcResults(): CombinationResult[] {
    if (!this._combiner || !this._settings.fromNotes)
      throw new Error();

    let combinations = this._combiner.calcArrays();

    combinations = combinations.filter((singleSteps) => {
      if (!this._checkMaxStepConstraint(...singleSteps))
        return false;

      if (!checkZeroStepsConstraint(...singleSteps))
        return false;

      return true;
    } );

    const applier = StepCombinationsApplier.create()
      .combinations(combinations)
      .notes(...this._settings.fromNotes);

    if (this._applierFunction)
      this._applierFunction(applier);

    const results = applier.apply();

    return results.filter(this._filterResults.bind(this));
  }

  private _filterResults(stepResult: CombinationResult): boolean {
    const validSPN = <SPN[]>stepResult.target.filter((s: SPN | null) => s);

    // Voicing
    if (this._settings.voicings) {
      const voicingInt = <Arrays.Number>validSPN.map(
        (s, i, a) => betweenSPN(<SPN>a[0], <SPN>s),
      );
      const voicing = voicingFromRootIntervals(...voicingInt);

      if (!this._settings.voicings.includes(voicing))
        return false;
    }

    // Keys
    if (this._settings.keysAny) {
      let found = false;

      for (const t of this._settings.keysAny) {
        if (t.hasPitches(...<ChromaticArray>validSPN.map((s) => s.pitch))) {
          found = true;
          break;
        }
      }

      if (!found)
        return false;
    }

    if (this._settings.keysAll) {
      for (const key of this._settings.keysAll) {
        if (!key.hasPitches(...<ChromaticArray>validSPN.map((spn) => spn.pitch)))
          return false;
      }
    }

    return true;
  }

  private _checkMaxStepConstraint(...singleSteps: SingleStepArray): boolean {
    for (const ss of singleSteps) {
      if (Math.abs(ss.interval || 0) > this._settings.maxStep)
        return false;
    }

    return true;
  }

  configMultiStepGen(f: ConfigMultiStepFunction): MotionCreator {
    if (!this._multiStepFunctions)
      this._multiStepFunctions = [];

    this._multiStepFunctions.push(f);

    return this;
  }

  minLength(l: number): MotionCreator {
    this._settings.minLength = l;

    return this;
  }

  maxLength(l: number): MotionCreator {
    this._settings.maxLength = l;

    return this;
  }

  length(l: number): MotionCreator {
    return this.minLength(l).maxLength(l);
  }

  filterByVoicings(...p: VoicingArray): MotionCreator {
    this._settings.voicings = p;

    return this;
  }

  disableResolutions(): MotionCreator {
    this._settings.doResolution = false;

    return this;
  }

  disableNear(): MotionCreator {
    this._settings.doNear = false;

    return this;
  }

  maxStep(interval: ChromaticInterval): MotionCreator {
    this._settings.maxStep = interval;

    return this;
  }

  filterByAnyKeys(...t: KeyArray): MotionCreator {
    this._settings.keysAny = t;

    return this;
  }

  keysAll(...t: KeyArray): MotionCreator {
    this._settings.keysAll = t;

    return this;
  }

  restingNotes(...notes: ChromaticArray): MotionCreator {
    this._settings.restingNotes = notes;

    return this;
  }

  private _initialize() {
    if (!this._settings.fromNotes)
      throw new Error();

    this._settings.readyForCalculate();

    const solver = MultiStepsGen.create()
      .notes(...this._settings.fromNotes);

    if (this._settings.maxStep)
      solver.maxStep(this._settings.maxStep);

    if (!this._settings.doResolution)
      solver.disableResolutions();
    else if (this._settings.restingNotes)
      solver.restingNotes(...this._settings.restingNotes);

    if (this._settings.doNear)
      solver.enableNear();

    this._callMultiStepFunctions(solver);

    const result = solver.initializeCombiner();

    this._reasonsMap = result.reasonsMap;
    this._combiner = result.combiner;
  }

  private _callMultiStepFunctions(multiStepsGen: MultiStepsGen) {
    if (this._multiStepFunctions) {
      for (const f of this._multiStepFunctions)
        f(multiStepsGen);
    }
  }
}

function checkZeroStepsConstraint(...singleSteps: SingleStepArray): boolean {
  for (const ss of singleSteps) {
    if (ss.interval !== 0)
      return true;
  }

  return false;
}
