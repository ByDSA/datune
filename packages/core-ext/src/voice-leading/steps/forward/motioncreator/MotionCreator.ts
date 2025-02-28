import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { betweenSPN } from "@datune/core/intervals/symbolic/chromatic/building";
import { KeyArray } from "@datune/core/keys/chromatic";
import { PitchArray as ChromaticArray } from "@datune/core/pitches/chromatic";
import { SPNArray, SPN } from "@datune/core/spns/chromatic";
import { VoicingArray } from "@datune/core/voicings/chromatic";
import { fromRootIntervals as voicingFromRootIntervals } from "@datune/core/voicings/relative/chromatic/building/rootIntervals";
import { CombinationResult, StepCombinationsApplier } from "../../applier/StepCombinationsApplier";
import { StepCombiner } from "../../combiner/StepCombiner";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { Array as SingleStepArray } from "../../single";
import { MultiStepsGen } from "../multi/MultiStepsGen";
import { MotionCreatorSettings } from "./MotionCreatorSettings";
import { MotionCreatorResult } from "./result/MotionCreatorResult";

type ApplierFunction = (a: StepCombinationsApplier)=> void;
type ConfigMultiStepFunction = (ms: MultiStepsGen)=> void;

export class MotionCreator {
  #settings: MotionCreatorSettings;

  #combiner: StepCombiner | undefined;

  #reasonsMap: ReasonStepMap | undefined;

  #applierFunction: ApplierFunction | undefined;

  #multiStepFunctions: ConfigMultiStepFunction[] | undefined;

  constructor() {
    this.#settings = new MotionCreatorSettings();
  }

  static create(): MotionCreator {
    return new MotionCreator();
  }

  fromNotes(...fromNotes: SPNArray): MotionCreator {
    this.#settings.fromNotes = fromNotes;

    return this;
  }

  configApplier(f: ApplierFunction): MotionCreator {
    this.#applierFunction = f;

    return this;
  }

  requireVoicingResolution(): MotionCreator {
    return this.configMultiStepGen((ms) => ms.requireVoicingResolution());
  }

  requireRestingResolution(): MotionCreator {
    return this.configMultiStepGen((ms) => ms.requireKeyResolution());
  }

  calc(): MotionCreatorResult {
    this.#initialize();

    const targets = this.#calcResults();

    if (!this.#reasonsMap)
      throw new Error();

    return {
      combinationResults: targets,
      reasonsMap: this.#reasonsMap,
    };
  }

  #calcResults(): CombinationResult[] {
    if (!this.#combiner || !this.#settings.fromNotes)
      throw new Error();

    let combinations = this.#combiner.calcArrays();

    combinations = combinations.filter((singleSteps) => {
      if (!this.#checkMaxStepConstraint(...singleSteps))
        return false;

      if (!checkZeroStepsConstraint(...singleSteps))
        return false;

      return true;
    } );

    const applier = StepCombinationsApplier.create()
      .combinations(combinations)
      .notes(...this.#settings.fromNotes);

    if (this.#applierFunction)
      this.#applierFunction(applier);

    const results = applier.apply();

    return results.filter(this.#filterResults.bind(this));
  }

  #filterResults(stepResult: CombinationResult): boolean {
    const validSpn = <SPN[]>stepResult.target.filter((s: SPN | null) => s);

    // Voicing
    if (this.#settings.voicings) {
      const voicingInt = <Arrays.Number>validSpn.map(
        (s, _i, a) => betweenSPN(<SPN>a[0], <SPN>s),
      );
      const voicing = voicingFromRootIntervals(...voicingInt);

      if (!this.#settings.voicings.includes(voicing))
        return false;
    }

    // Keys
    if (this.#settings.keysAny) {
      let found = false;

      for (const t of this.#settings.keysAny) {
        if (t.hasPitches(...<ChromaticArray>validSpn.map((s) => s.pitch))) {
          found = true;
          break;
        }
      }

      if (!found)
        return false;
    }

    if (this.#settings.keysAll) {
      for (const key of this.#settings.keysAll) {
        if (!key.hasPitches(...<ChromaticArray>validSpn.map((spn) => spn.pitch)))
          return false;
      }
    }

    return true;
  }

  #checkMaxStepConstraint(...singleSteps: SingleStepArray): boolean {
    for (const ss of singleSteps) {
      if (Math.abs(ss.interval || 0) > this.#settings.maxStep)
        return false;
    }

    return true;
  }

  configMultiStepGen(f: ConfigMultiStepFunction): MotionCreator {
    if (!this.#multiStepFunctions)
      this.#multiStepFunctions = [];

    this.#multiStepFunctions.push(f);

    return this;
  }

  minLength(l: number): MotionCreator {
    this.#settings.minLength = l;

    return this;
  }

  maxLength(l: number): MotionCreator {
    this.#settings.maxLength = l;

    return this;
  }

  length(l: number): MotionCreator {
    return this.minLength(l).maxLength(l);
  }

  filterByVoicings(...p: VoicingArray): MotionCreator {
    this.#settings.voicings = p;

    return this;
  }

  disableResolutions(): MotionCreator {
    this.#settings.doResolution = false;

    return this;
  }

  disableNear(): MotionCreator {
    this.#settings.doNear = false;

    return this;
  }

  maxStep(interval: ChromaticInterval): MotionCreator {
    this.#settings.maxStep = interval;

    return this;
  }

  filterByAnyKeys(...t: KeyArray): MotionCreator {
    this.#settings.keysAny = t;

    return this;
  }

  keysAll(...t: KeyArray): MotionCreator {
    this.#settings.keysAll = t;

    return this;
  }

  restingNotes(...notes: ChromaticArray): MotionCreator {
    this.#settings.restingNotes = notes;

    return this;
  }

  #initialize() {
    if (!this.#settings.fromNotes)
      throw new Error();

    this.#settings.readyForCalculate();

    const solver = MultiStepsGen.create()
      .notes(...this.#settings.fromNotes);

    if (this.#settings.maxStep)
      solver.maxStep(this.#settings.maxStep);

    if (!this.#settings.doResolution)
      solver.disableResolutions();
    else if (this.#settings.restingNotes)
      solver.restingNotes(...this.#settings.restingNotes);

    if (this.#settings.doNear)
      solver.enableNear();

    this.#callMultiStepFunctions(solver);

    const result = solver.initializeCombiner();

    this.#reasonsMap = result.reasonsMap;
    this.#combiner = result.combiner;
  }

  #callMultiStepFunctions(multiStepsGen: MultiStepsGen) {
    if (this.#multiStepFunctions) {
      for (const f of this.#multiStepFunctions)
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
