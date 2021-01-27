import { TemporalNode } from "../../../../datastructures/timelayer/temporalnode/TemporalNode";
import { ImmutableTime } from "../../../../time/ImmutableTime";
import { ParallelSequence } from "../parallel/ParallelSequence";

export class LinearSequence<E, T extends ImmutableTime> extends ParallelSequence<E, T> {
    protected constructor(_startTime: T, _cellSize: T) {
        super(_startTime, _cellSize);
    }

    addNode(node: TemporalNode<E, T>): void {
        this._fixOverlappingNodes(node);
    }

    private _fixOverlappingNodes(node: TemporalNode<E, T>) {
        const previousNodes = this.getNodesAtInterval(node.interval);
        for (const n of previousNodes) {
            if (n.from >= node.from && n.to <= node.to)
                n.remove();
            else if (n.from < node.from && n.to <= node.to)
                n.to = node.from;
            else if (n.from >= node.from && n.to > node.to)
                n.from = node.to;
            else {
                const secondHalf = n.duplicate();
                secondHalf.from = node.to;
                const firstHalf = n;
                firstHalf.to = node.from;
                this.addNode(secondHalf);
            }
        }
    }

    getNodeAt(time: T): TemporalNode<E, T> {
        return super.getNodesAt(time)[0];
    }
}