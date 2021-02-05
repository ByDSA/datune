import { ImmutableTime } from "../../../../time/ImmutableTime";
import { TemporalNode } from "../TemporalNode";

export class TemporalNodeBuilder<E, T extends ImmutableTime> {
    private _from: T | undefined;
    private _to: T | undefined;
    private _event: E | undefined;

    constructor() {
    }

    from(from: T): TemporalNodeBuilder<E, T> {
        this._from = from;
        return this;
    }

    to(to: T): TemporalNodeBuilder<E, T> {
        this._to = to;
        return this;
    }

    event(e: E): TemporalNodeBuilder<E, T> {
        this._event = e;
        return this;
    }

    create(): TemporalNode<E, T> {
        if (this._event === null || this.event === undefined)
            throw new Error("Event not defined.");
        if (!this._from)
            throw new Error("'From' time not defined.");
        if (!this._to)
            throw new Error("'To' time not defined.");

        return (<any>TemporalNode)._create(this._event, this._from, this._to);
    }
}