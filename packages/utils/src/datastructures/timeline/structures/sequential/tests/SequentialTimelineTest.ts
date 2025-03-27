import { intervalBetween } from "datils/math/intervals";
import { EventTest } from "../../../node/tests/EventTest";
import { SequentialTimeline } from "../Sequential";

export class SequentialTimelineTest extends SequentialTimeline<EventTest> {
  constructor() {
    super( {
      startTime: 0,
      cellSize: 10,
    } );

    this.add( {
      event: new EventTest(),
      interval: intervalBetween(1, 9),
    } );
  }
}
