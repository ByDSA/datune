/* eslint-disable no-continue */
import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { Array as SPNArray } from "@datune/core/spns/chromatic";
import { Array as ChromaticVoicingArray, fromRootIntervals, TRIAD_AUGMENTED } from "@datune/core/voicings/chromatic";
import { StepCombiner } from "../../combiner/StepCombiner";
import { NearStepsGen } from "../../generators/others/near/NearStepsGenerator";
import { IntervalResults as VoicingResults, IntervalStepsGen, RestingNotesStepsGen } from "../../generators/resolution";
import { FilterStepFunction, maxDistanceFilterFunction } from "../../generators/StepsGenerator";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { StepReason, StepReasonNear, StepReasonRestNotes, StepReasonVoicing } from "../../reason/StepReason";
import { StepType } from "../../reason/StepType";
import { nonNullSteps, Step, StepArray, StepOrNull } from "../../Step";
import { IntraVoicing, IntraVoicingsFinder } from "./IntraVoicingsFinder";
import { RequireFunction } from "./MultiStepsGen";

export default class MultiStepsGenInitializer {
  notes: SPNArray | undefined;

  doResolutions: boolean;

  maxStep: ChromaticInterval | undefined;

  nearStepsGen: NearStepsGen | undefined;

  restingNotesStepsGen: RestingNotesStepsGen | undefined;

  filterFunction: FilterStepFunction | undefined;

  requireFunctions: RequireFunction[] | undefined;

  intervalsToFind: ChromaticVoicingArray;

  voicingsToFind: ChromaticVoicingArray;

  constructor() {
    this.doResolutions = true;

    this.intervalsToFind = [
      fromRootIntervals(0, 6),
      fromRootIntervals(0, 2),
      fromRootIntervals(0, 10),
    ];
    this.voicingsToFind = [
      TRIAD_AUGMENTED,
    ];
  }

  private _calculateAndGetIntraIntervals(): IntraVoicing[] {
    return IntraVoicingsFinder.create()
      .notes(...this._getValidNotes())
      .referenceVoicings(...this.intervalsToFind)
      .find();
  }

  private _calculateAndGetIntraVoicings(): IntraVoicing[] {
    if (!this.notes)
      throw new Error();

    return IntraVoicingsFinder.create()
      .notes(...this.notes)
      .referenceVoicings(...this.voicingsToFind)
      .find();
  }

  private _genResolutions(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    this._genIntraIntervals(combiner, reasonsMap);

    this._genIntraVoicings(combiner, reasonsMap);

    this._genRestingNotes(combiner, reasonsMap);
  }

  private _genIntraIntervals(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    const intraIntervals = this._calculateAndGetIntraIntervals();

    for (const intraInterval of intraIntervals) {
      const bottomIndex = intraInterval.notesIndex[0];
      const topIndex = intraInterval.notesIndex[1];
      const stepsGen = IntervalStepsGen.create()
        .notes(...this._getValidNotes())
        .indexes(bottomIndex, topIndex);

      if (this.filterFunction)
        stepsGen.filter(this.filterFunction);

      const steps: StepOrNull[] = stepsGen.generateSteps();
      const { voicing } = <VoicingResults>stepsGen.results;
      const reason: StepReasonVoicing = {
        type: StepType.RESOLUTION_PATTERN,
        voicing,
      };

      if (!this.requireFunctions || !this._checkRequireFunctions(reason, steps))
        steps.push(null);

      if (steps.length === 0)
        continue;

      combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
      const validSteps = nonNullSteps(steps);

      if (validSteps.length > 0)
        reasonsMap.add(reason, ...<StepArray>validSteps);
    }
  }

  private _checkRequireFunctions(reason: StepReason, steps: StepOrNull[]): boolean {
    if (!this.requireFunctions)
      return false;

    for (const f of this.requireFunctions) {
      if (!f(reason, steps))
        return false;
    }

    return true;
  }

  private _getValidNotes(): SPNArray {
    if (!this.notes)
      throw new Error();

    return this.notes;
  }

  private _genIntraVoicings(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    const intraVoicings = this._calculateAndGetIntraVoicings();

    for (const intraVoicing of intraVoicings) {
      const stepsGen = IntervalStepsGen.create()
        .notes(...this._getValidNotes())
        .indexes(...intraVoicing.notesIndex);

      if (this.filterFunction)
        stepsGen.filter(this.filterFunction);

      const steps: StepOrNull[] = stepsGen.generateSteps();
      const { voicing } = <VoicingResults>stepsGen.results;
      const reason: StepReasonVoicing = {
        type: StepType.RESOLUTION_PATTERN,
        voicing,
      };

      if (!this._checkRequireFunctions(reason, steps))
        steps.push(null);

      if (steps.length === 0)
        continue;

      combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
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

    const steps: StepOrNull[] = this.restingNotesStepsGen.generateSteps();
    const reason: StepReasonRestNotes = {
      type: StepType.RESOLUTION_KEY,
    };

    if (!this._checkRequireFunctions(reason, steps))
      steps.push(null);

    if (steps.length === 0)
      return;

    combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
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
      type: StepType.NEAR,
    };

    if (!this._checkRequireFunctions(reason, steps))
      steps.push(null);

    if (steps.length === 0)
      return;

    combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
    const validSteps = nonNullSteps(steps);

    if (validSteps.length > 0)
      reasonsMap.add(reason, ...<StepArray>validSteps);
  }

  initialize() {
    const stepCombiner = StepCombiner.create();
    const reasonsMap = ReasonStepMap.create();

    if (this.maxStep)
      stepCombiner.filter(maxDistanceFilterFunction(this.maxStep));

    if (this.doResolutions)
      this._genResolutions(stepCombiner, reasonsMap);

    this._genNear(stepCombiner, reasonsMap);

    return {
      combiner: stepCombiner,
      reasonsMap,
    };
  }
}
