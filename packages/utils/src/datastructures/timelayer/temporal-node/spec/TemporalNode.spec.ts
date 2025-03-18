import { intervalOf } from "datils/math";
import { EventTest } from "./EventTest";
import { newNode1 } from "./utils";

it("info", () => {
  const node = newNode1();
  const expectedInterval = intervalOf(0, 1);

  expect(node.interval).toEqual(expectedInterval);
  expect(node.event).toEqual(new EventTest());
} );
