import { applyFletcherMunsonCurveCorrection, applyLoudnessLevelIso226rev2023 } from "./fletcherMunson";

it("test", () => {
  const f = [
    20,
    25,
    30,
    40,
    50,
    70,
    80,
    100,
    200,
    440,
    500,
    750,
    1000,
    1500,
    2000,
    5000,
    10000,
    12500,
    13000,
    14000,
    15000,
    16000,
    17500,
    18000,
    20000,
  ];

  console.log(f.map(a=>([
    a,
    applyFletcherMunsonCurveCorrection(a),
    applyLoudnessLevelIso226rev2023(a, 75),
  ])));
} );

it("iso226 2023", () => {
  const f = [
    20,
    100,
    440,
    500,
    750,
    1000,
    1500,
    2000,
  ];

  console.log(f.map(a=>([a, applyLoudnessLevelIso226rev2023(a, 75)])));
} );
