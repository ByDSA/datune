import { NonEmptyArray } from "@datune/utils";
import { SPNArray } from "../../../../chords";
import { ChromaticInterval } from "../../../../intervals";
import { StepReason, StepReasonNear, StepReasonPattern, StepReasonRestNotes } from "../../../../voiceleading/steps/reason/StepReason";
import { ChromaticPattern, ChromaticPatternArray } from "../../../../voicings/relative/chromatic/ChromaticPattern";
import { StepCombiner } from "../../combiner/StepCombiner";
import { NearStepsGen } from "../../generators/others/near/NearStepsGenerator";
import { IntervalResults as PatternResults, IntervalStepsGen } from "../../generators/resolution/interval/IntervalStepsGen";
import { RestingNotesStepsGen } from "../../generators/resolution/restingnotes/RestingNotesStepsGen";
import { FilterStepFunction, maxDistanceFilterFunction } from "../../generators/StepsGenerator";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { StepType } from "../../reason/StepType";
import { nonNullSteps, Step, StepArray, StepOrNull } from "../../Step";
import { IntraPattern, IntraPatternsFinder } from "./IntraPatternsFinder";
import { RequireFunction } from "./MultiStepsGen";

export class MultiStepsGenInitializer {
    notes: SPNArray | undefined;
    doResolutions: boolean;
    maxStep: ChromaticInterval | undefined;

    nearStepsGen: NearStepsGen | undefined;
    restingNotesStepsGen: RestingNotesStepsGen | undefined;

    filterFunction: FilterStepFunction | undefined;
    requireFunctions: RequireFunction[] | undefined;

    intervalsToFind: ChromaticPatternArray;
    patternsToFind: ChromaticPatternArray;

    constructor() {
        this.doResolutions = true;

        this.intervalsToFind = [
            ChromaticPattern.fromRootIntervals(0, 6),
            ChromaticPattern.fromRootIntervals(0, 2),
            ChromaticPattern.fromRootIntervals(0, 10)
        ];
        this.patternsToFind = [
            ChromaticPattern.TRIAD_AUGMENTED
        ];
    }

    private _calculateAndGetIntraIntervals(): IntraPattern[] {
        return IntraPatternsFinder.create()
            .notes(...this._getValidNotes())
            .referencePatterns(...this.intervalsToFind)
            .find();
    }

    private _calculateAndGetIntraPatterns(): IntraPattern[] {
        if (!this.notes)
            throw new Error();

        return IntraPatternsFinder.create()
            .notes(...this.notes)
            .referencePatterns(...this.patternsToFind)
            .find();
    }

    private _genResolutions(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
        this._genIntraIntervals(combiner, reasonsMap);

        this._genIntraPatterns(combiner, reasonsMap);

        this._genRestingNotes(combiner, reasonsMap);
    }

    private _genIntraIntervals(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
        let intraIntervals = this._calculateAndGetIntraIntervals();

        for (const intraInterval of intraIntervals) {
            const bottomIndex = intraInterval.notesIndex[0];
            const topIndex = intraInterval.notesIndex[1];
            const stepsGen = IntervalStepsGen.create()
                .notes(...this._getValidNotes())
                .indexes(bottomIndex, topIndex);
            if (this.filterFunction)
                stepsGen.filter(this.filterFunction);
            const steps: StepOrNull[] = stepsGen.generateSteps();
            const pattern = (<PatternResults>stepsGen.results).pattern;
            const reason: StepReasonPattern = {
                type: StepType.RESOLUTION_PATTERN,
                pattern
            }
            if (!this.requireFunctions || !this._checkRequireFunctions(reason, steps))
                steps.push(null);
            if (steps.length == 0)
                continue;
            combiner.addGroup(...<NonEmptyArray<Step>>steps);
            const validSteps = nonNullSteps(steps);
            if (validSteps.length > 0)
                reasonsMap.add(reason, ...<StepArray>validSteps);
        }
    }

    private _checkRequireFunctions(reason: StepReason, steps: StepOrNull[]): boolean {
        if (!this.requireFunctions)
            return false;

        for (const f of this.requireFunctions)
            if (!f(reason, steps))
                return false;

        return true;
    }

    private _getValidNotes(): SPNArray {
        if (!this.notes)
            throw new Error();

        return this.notes;
    }

    private _genIntraPatterns(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
        let intraPatterns = this._calculateAndGetIntraPatterns();

        for (const intraPattern of intraPatterns) {
            const stepsGen = IntervalStepsGen.create()
                .notes(...this._getValidNotes())
                .indexes(...intraPattern.notesIndex);
            if (this.filterFunction)
                stepsGen.filter(this.filterFunction);
            let steps: StepOrNull[] = stepsGen.generateSteps();
            const pattern = (<PatternResults>stepsGen.results).pattern;
            const reason: StepReasonPattern = {
                type: StepType.RESOLUTION_PATTERN,
                pattern
            }
            if (!this._checkRequireFunctions(reason, steps))
                steps.push(null);
            if (steps.length === 0)
                continue;
            combiner.addGroup(...<NonEmptyArray<Step>>steps);
            const validSteps = nonNullSteps(steps);
            if (validSteps.length > 0)
                reasonsMap.add(reason, ...<StepArray>validSteps);
        }
    }

    private _genRestingNotes(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
        if (!this.restingNotesStepsGen)
            return;

        this.restingNotesStepsGen
            .notes(...this._getValidNotes());
        if (this.maxStep)
            this.restingNotesStepsGen.maxStep(this.maxStep);
        let steps: StepOrNull[] = this.restingNotesStepsGen.generateSteps();
        const reason: StepReasonRestNotes = {
            type: StepType.RESOLUTION_KEY
        }
        if (!this._checkRequireFunctions(reason, steps))
            steps.push(null);
        if (steps.length === 0)
            return;
        combiner.addGroup(...<NonEmptyArray<Step>>steps);
        const validSteps = nonNullSteps(steps);
        if (validSteps.length > 0)
            reasonsMap.add(reason, ...<StepArray>validSteps);
    }

    private _genNear(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
        if (!this.nearStepsGen)
            return;

        this.nearStepsGen.notesLength(this._getValidNotes().length);
        if (this.filterFunction)
            this.nearStepsGen.filter(this.filterFunction);
        if (this.maxStep)
            this.nearStepsGen.maxStep(this.maxStep);
        const steps: StepOrNull[] = this.nearStepsGen.generateSteps();
        const reason: StepReasonNear = {
            type: StepType.NEAR
        }
        if (!this._checkRequireFunctions(reason, steps))
            steps.push(null);
        if (steps.length === 0)
            return;
        combiner.addGroup(...<NonEmptyArray<Step>>steps);
        const validSteps = nonNullSteps(steps);
        if (validSteps.length > 0)
            reasonsMap.add(reason, ...<StepArray>validSteps);
    }

    initialize() {
        let stepCombiner = StepCombiner.create();
        let reasonsMap = ReasonStepMap.create();

        if (this.maxStep)
            stepCombiner.filter(maxDistanceFilterFunction(this.maxStep));

        if (this.doResolutions)
            this._genResolutions(stepCombiner, reasonsMap);


        this._genNear(stepCombiner, reasonsMap);

        return {
            combiner: stepCombiner,
            reasonsMap: reasonsMap
        };
    }
}