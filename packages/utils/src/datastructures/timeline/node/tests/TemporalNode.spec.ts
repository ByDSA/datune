import { intervalBetween } from "datils/math/intervals";
import { EventTest } from "./EventTest";
import { newNode1 } from "./cases";

it("info", () => {
  const node = newNode1();
  const expectedInterval = intervalBetween(0, 1);

  expect(node.interval).toEqual(expectedInterval);
  expect(node.event).toEqual(new EventTest());
} );
