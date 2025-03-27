import { EventTest } from "../../../node/tests/EventTest";
import { ParallelTimeline } from "../Parallel";

export class ParallelTimelineTest extends ParallelTimeline<EventTest> {
  constructor() {
    super( {
      startTime: 0,
      cellSize: 10,
    } );
  }
}
