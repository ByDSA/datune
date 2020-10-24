export abstract class Backtracking<D, T> {
    private bt(c: T) {
        if (this.reject(this._P, c))
            return;
        if (this.accept(this._P, c))
            this.output(this._P, c);
        let s = this.first(this._P, c);
        while (s != null) {
            this.bt(s);
            s = this.next(this._P, s);
        }
    }

    protected abstract root(P: D): T;
    protected abstract reject(P: D, c: T): boolean;
    protected abstract accept(P: D, c: T): boolean;
    protected abstract first(P: D, c: T): T;
    protected abstract next(P: D, c: T): T;
    protected abstract output(P: D, c: T): void;

    private _P: D;

    start(P: D): void {
        this._P = P;
        let node: T = this.root(P);
        this.bt(node);
    }
}