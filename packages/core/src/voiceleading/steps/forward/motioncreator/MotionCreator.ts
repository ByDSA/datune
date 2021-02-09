import { NumberArray } from "@datune/utils";
import { ChromaticArray, SPNArray } from "../../../../chords";
import { ChromaticInterval } from "../../../../intervals";
import { SPN } from "../../../../pitches";
import { TonalityArray } from "../../../../tonalities";
import { ChromaticPattern, ChromaticPatternArray } from "../../../../voicings/relative/chromatic/ChromaticPattern";
import { CombinationResult, StepCombinationsApplier } from "../../applier/StepCombinationsApplier";
import { StepCombiner } from "../../combiner/StepCombiner";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { SingleStepArray } from "../../single/SingleStep";
import { MultiStepsGen } from "../multi/MultiStepsGen";
import { MotionCreatorSettings } from "./MotionCreatorSettings";
import { MotionCreatorResult } from "./result/MotionCreatorResult";

type ApplierFunction = (a: StepCombinationsApplier) => void;
type ConfigMultiStepFunction = (ms: MultiStepsGen) => void;

export class MotionCreator {
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

    requirePatternResolution(): MotionCreator {
        return this.configMultiStepGen(ms => ms.requirePatternResolution());
    }

    requireRestingResolution(): MotionCreator {
        return this.configMultiStepGen(ms => ms.requireKeyResolution());
    }

    calc(): MotionCreatorResult {
        this._initialize();

        const targets = this._calcResults();

        if (!this._reasonsMap)
            throw new Error();

        return {
            combinationResults: targets,
            reasonsMap: this._reasonsMap
        }
    }

    private _calcResults(): CombinationResult[] {
        if (!this._combiner || !this._settings.fromNotes)
            throw new Error();
        let combinations = this._combiner.calcArrays();
        combinations = combinations.filter(singleSteps => {
            if (!this._checkMaxStepConstraint(...singleSteps))
                return false;

            if (!this._checkZeroStepsConstraint(...singleSteps))
                return false;

            return true;
        });

        let applier = StepCombinationsApplier.create()
            .combinations(combinations)
            .notes(...this._settings.fromNotes);

        if (this._applierFunction)
            this._applierFunction(applier);

        let results = applier.apply();

        return results.filter(this._filterResults.bind(this));
    }

    private _filterResults(stepResult: CombinationResult): boolean {
        const validSPN = <SPN[]>stepResult.target.filter(s => s);

        // Pattern
        if (this._settings.patterns) {
            const patternInt = <NumberArray>validSPN.map((s, i, a) => ChromaticInterval.betweenSPN(<SPN>a[0], <SPN>s));
            const pattern = ChromaticPattern.fromRootIntervals(...patternInt);
            if (!this._settings.patterns.includes(pattern))
                return false;
        }

        // Keys
        if (this._settings.keysAny) {
            let found = false;
            for (const t of this._settings.keysAny) {
                if (t.hasNotes(...<ChromaticArray>validSPN.map(s => s.degree))) {
                    found = true;
                    break;
                }
            }
            if (!found)
                return false;
        }
        if (this._settings.keysAll) {
            for (const t of this._settings.keysAll) {
                if (!t.hasNotes(...<ChromaticArray>validSPN.map(s => s.degree)))
                    return false;
            }
        }
        return true;
    }

    private _checkMaxStepConstraint(...singleSteps: SingleStepArray): boolean {
        for (const ss of singleSteps)
            if (Math.abs(ss.interval || 0) > this._settings.maxStep)
                return false;

        return true;
    }

    private _checkZeroStepsConstraint(...singleSteps: SingleStepArray): boolean {
        for (const ss of singleSteps)
            if (ss.interval != 0)
                return true;

        return false;
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

    filterByPatterns(...p: ChromaticPatternArray): MotionCreator {
        this._settings.patterns = p;

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

    filterByAnyKeys(...t: TonalityArray): MotionCreator {
        this._settings.keysAny = t;

        return this;
    }

    keysAll(...t: TonalityArray): MotionCreator {
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

        let solver = MultiStepsGen.create()
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

        let result = solver.initializeCombiner();
        this._reasonsMap = result.reasonsMap;
        this._combiner = result.combiner;
    }

    private _callMultiStepFunctions(multiStepsGen: MultiStepsGen) {
        if (this._multiStepFunctions)
            for (const f of this._multiStepFunctions)
                f(multiStepsGen);
    }
}
