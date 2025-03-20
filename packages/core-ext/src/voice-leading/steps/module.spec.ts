import { expectExportModulesAsync } from "../../../../core/tests/modules";
import { Steps } from ".";

const vars: string[] = [
  // Composite
  "CS_D1_D1",
  "CS_D1_D2",
  "CS_D1_KEEP",
  "CS_D1_NULL",
  "CS_D1_U1",
  "CS_D1_U2",
  "CS_D2_D1",
  "CS_D2_D2",
  "CS_D2_KEEP",
  "CS_D2_NULL",
  "CS_D2_U1",
  "CS_D2_U2",
  "CS_KEEP_D1",
  "CS_KEEP_D2",
  "CS_KEEP_NULL",
  "CS_KEEP_U1",
  "CS_KEEP_U2",
  "CS_NONE",
  "CS_NULL_D1",
  "CS_NULL_D2",
  "CS_NULL_KEEP",
  "CS_NULL_U1",
  "CS_NULL_U2",
  "CS_U1_D1",
  "CS_U1_D2",
  "CS_U1_KEEP",
  "CS_U1_NULL",
  "CS_U1_U1",
  "CS_U1_U2",
  "CS_U2_D1",
  "CS_U2_D2",
  "CS_U2_KEEP",
  "CS_U2_NULL",
  "CS_U2_U1",
  "CS_U2_U2",

  // Single
  "SS_0_1",
  "SS_0_2",
  "SS_0_S1",
  "SS_0_S2",
  "SS_1_1",
  "SS_1_2",
  "SS_1_S1",
  "SS_1_S2",
  "SS_2_1",
  "SS_2_2",
  "SS_2_S1",
  "SS_2_S2",
];
const functions: string[] = [
  // Composite: building
  Steps.compositeStepFromIntervals.name,
  Steps.compositeStepFromSingleSteps.name,

  // Flatten
  Steps.flattenStep.name,
  Steps.flattenStepArray.name,

  // Single Step: building
  Steps.singleStepFrom.name,

  // Single Step: modifiers
  Steps.singleStepReIndex.name,
  Steps.singleStepReInterval.name,

  // Single Steps: others
  Steps.singleStepsSortByIndex.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Steps,
    modules: [
      "./single/building",
      "./single/modifiers",
      "./single/constants",
      "./single/Array",
      "./composite/building",
      "./composite/constants",
      "./flattenSteps",
      "./id",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
