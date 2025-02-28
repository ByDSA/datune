/* eslint-disable no-continue */
import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { SPNArray } from "@datune/core/spns/chromatic";
import { VoicingArray as ChromaticVoicingArray } from "@datune/core/voicings/chromatic";
import { fromRootIntervals } from "@datune/core/voicings/relative/chromatic/building/rootIntervals";
import { TRIAD_AUGMENTED } from "@datune/core/voicings/relative/chromatic/constants";
import { StepCombiner } from "../../combiner/StepCombiner";
import { NearStepsGen } from "../../generators/others/near/NearStepsGenerator";
import { IntervalResults as VoicingResults, IntervalStepsGen, RestingNotesStepsGen } from "../../generators/resolution";
import { FilterStepFunction, maxDistanceFilterFunction } from "../../generators/StepsGenerator";
import { ReasonStepMap } from "../../reason/ReasonStepMap";
import { StepReason, StepReasonNear, StepReasonRestNotes, StepReasonVoicing } from "../../reason/StepReason";
import { StepType } from "../../reason/StepType";
import { nonNullSteps, Step, StepArray, StepOrNull } from "../../Step";
import { IntraVoicing, IntraVoicingsFinder } from "./IntraVoicingsFinder";
import type { RequireFunction } from "./MultiStepsGen";

export class MultiStepsGenInitializer {
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

  #calculateAndGetIntraIntervals(): IntraVoicing[] {
    return IntraVoicingsFinder.create()
      .notes(...this.#getValidNotes())
      .referenceVoicings(...this.intervalsToFind)
      .find();
  }

  #calculateAndGetIntraVoicings(): IntraVoicing[] {
    if (!this.notes)
      throw new Error();

    return IntraVoicingsFinder.create()
      .notes(...this.notes)
      .referenceVoicings(...this.voicingsToFind)
      .find();
  }

  #genResolutions(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    this.#genIntraIntervals(combiner, reasonsMap);

    this.#genIntraVoicings(combiner, reasonsMap);

    this.#genRestingNotes(combiner, reasonsMap);
  }

  #genIntraIntervals(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    const intraIntervals = this.#calculateAndGetIntraIntervals();

    for (const intraInterval of intraIntervals) {
      const [bottomIndex, topIndex] = intraInterval.notesIndex;
      const stepsGen = IntervalStepsGen.create()
        .notes(...this.#getValidNotes())
        .indexes(bottomIndex, topIndex);

      if (this.filterFunction)
        stepsGen.filter(this.filterFunction);

      const steps: StepOrNull[] = stepsGen.generateSteps();
      const { voicing } = <VoicingResults>stepsGen.results;
      const reason: StepReasonVoicing = {
        type: StepType.RESOLUTION_PATTERN,
        voicing,
      };

      if (!this.requireFunctions || !this.#checkRequireFunctions(reason, steps))
        steps.push(null);

      if (steps.length === 0)
        continue;

      combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
      const validSteps = nonNullSteps(steps);

      if (validSteps.length > 0)
        reasonsMap.add(reason, ...<StepArray>validSteps);
    }
  }

  #checkRequireFunctions(reason: StepReason, steps: StepOrNull[]): boolean {
    if (!this.requireFunctions)
      return false;

    for (const f of this.requireFunctions) {
      if (!f(reason, steps))
        return false;
    }

    return true;
  }

  #getValidNotes(): SPNArray {
    if (!this.notes)
      throw new Error();

    return this.notes;
  }

  #genIntraVoicings(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    const intraVoicings = this.#calculateAndGetIntraVoicings();

    for (const intraVoicing of intraVoicings) {
      const stepsGen = IntervalStepsGen.create()
        .notes(...this.#getValidNotes())
        .indexes(...intraVoicing.notesIndex);

      if (this.filterFunction)
        stepsGen.filter(this.filterFunction);

      const steps: StepOrNull[] = stepsGen.generateSteps();
      const { voicing } = <VoicingResults>stepsGen.results;
      const reason: StepReasonVoicing = {
        type: StepType.RESOLUTION_PATTERN,
        voicing,
      };

      if (!this.#checkRequireFunctions(reason, steps))
        steps.push(null);

      if (steps.length === 0)
        continue;

      combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
      const validSteps = nonNullSteps(steps);

      if (validSteps.length > 0)
        reasonsMap.add(reason, ...<StepArray>validSteps);
    }
  }

  #genRestingNotes(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    if (!this.restingNotesStepsGen)
      return;

    this.restingNotesStepsGen
      .notes(...this.#getValidNotes());

    if (this.maxStep)
      this.restingNotesStepsGen.maxStep(this.maxStep);

    const steps: StepOrNull[] = this.restingNotesStepsGen.generateSteps();
    const reason: StepReasonRestNotes = {
      type: StepType.RESOLUTION_KEY,
    };

    if (!this.#checkRequireFunctions(reason, steps))
      steps.push(null);

    if (steps.length === 0)
      return;

    combiner.addGroup(...<Arrays.NonEmpty<Step>>steps);
    const validSteps = nonNullSteps(steps);

    if (validSteps.length > 0)
      reasonsMap.add(reason, ...<StepArray>validSteps);
  }

  #genNear(combiner: StepCombiner, reasonsMap: ReasonStepMap) {
    if (!this.nearStepsGen)
      return;

    this.nearStepsGen.notesLength(this.#getValidNotes().length);

    if (this.filterFunction)
      this.nearStepsGen.filter(this.filterFunction);

    if (this.maxStep)
      this.nearStepsGen.maxStep(this.maxStep);

    const steps: StepOrNull[] = this.nearStepsGen.generateSteps();
    const reason: StepReasonNear = {
      type: StepType.NEAR,
    };

    if (!this.#checkRequireFunctions(reason, steps))
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
      this.#genResolutions(stepCombiner, reasonsMap);

    this.#genNear(stepCombiner, reasonsMap);

    return {
      combiner: stepCombiner,
      reasonsMap,
    };
  }
}
