import { Interval, SimpleTime } from "index";
import EventTest from "./EventTest";
import { newNode1 } from "./utils";

it("info", () => {
  const node = newNode1();
  const expectedInterval = Interval.of(node.from, node.to);

  expect(node.interval).not.toBe(expectedInterval);
  expect(node.interval).toStrictEqual(expectedInterval);
  expect(node.from).not.toBe(new SimpleTime(0));
  expect(node.from).toStrictEqual(new SimpleTime(0));
  expect(node.to).not.toBe(new SimpleTime(1));
  expect(node.to).toStrictEqual(new SimpleTime(1));
  expect(node.event).not.toBe(new EventTest());
  expect(node.event).toStrictEqual(new EventTest());
} );
