export abstract class Backtracking<D, T> {
  private bt(c: T) {
    if (this.reject(<D> this.#P, c))
      return;

    if (this.accept(<D> this.#P, c))
      this.output(<D> this.#P, c);

    let s = this.first(<D> this.#P, c);

    while (s !== null) {
      this.bt(s);
      s = this.next(<D> this.#P, s);
    }
  }

    protected abstract root(P: D): T;

    protected abstract reject(P: D, c: T): boolean;

    protected abstract accept(P: D, c: T): boolean;

    protected abstract first(P: D, c: T): T | null;

    protected abstract next(P: D, c: T): T | null;

    protected abstract output(P: D, c: T): void;

    #P: D | undefined;

    start(P: D): void {
      this.#P = P;
      const node: T = this.root(P);

      this.bt(node);
    }
}
