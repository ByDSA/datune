import type { Time } from "../../../../time";
import type { TimelineNode } from "../..";
import type { Timeline } from "../Timeline";

export interface ISequentialTimeline<E> extends Timeline<E> {
    removeAt(at: Time): TimelineNode<E> | undefined;

    getAt(time: Time): TimelineNode<E> | undefined;
}
