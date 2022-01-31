export default abstract class Constraint {
  probability: number; // 0 to 100

  constructor(prob: number) {
    this.probability = prob;
  }

    abstract check(...args: any): boolean;

    protected isMustConstrain(): boolean {
      return this.probability === 100 ? true : Math.random() * 100 < this.probability;
    }
}
