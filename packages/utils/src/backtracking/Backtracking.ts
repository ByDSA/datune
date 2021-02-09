export abstract class Backtracking<D, T> {
    private bt(c: T) {
        if (this.reject(<D>this._P, c))
            return;
        if (this.accept(<D>this._P, c))
            this.output(<D>this._P, c);
        let s = this.first(<D>this._P, c);
        while (s != null) {
            this.bt(s);
            s = this.next(<D>this._P, s);
        }
    }

    protected abstract root(P: D): T;
    protected abstract reject(P: D, c: T): boolean;
    protected abstract accept(P: D, c: T): boolean;
    protected abstract first(P: D, c: T): T | null;
    protected abstract next(P: D, c: T): T | null;
    protected abstract output(P: D, c: T): void;

    private _P: D | undefined;

    start(P: D): void {
        this._P = P;
        let node: T = this.root(P);
        this.bt(node);
    }
}