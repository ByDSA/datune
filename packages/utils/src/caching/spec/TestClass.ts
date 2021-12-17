import PrecalcCache from "../PrecalcCache";

export type H = {
  a: number;
  b: number;
};

export default class TestClass {
  private params: H;

  // eslint-disable-next-line no-use-before-define
  static cache: PrecalcCache<TestClass, H>;

  constructor(params: H) {
    this.params = params;
  }

  // eslint-disable-next-line accessor-pairs
  get hashingObject(): H {
    return this.params;
  }
}

export function from(params: H) {
  return TestClass.cache.getOrCreate(params);
}
