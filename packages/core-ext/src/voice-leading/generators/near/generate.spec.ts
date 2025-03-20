import { Spns as N } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { toNear } from "./generate";

TestInit.loadAll();
const { C5, E5, G5 } = N;

it("near motion C5-E5-G5 in C", () => {
  const fromNotes = [C5, E5, G5];
  const { groups } = toNear( {
    arrayLength: fromNotes.length,
    maxInterval: 2,
  } );

  expect(groups).toHaveLength(3);
  expect(groups[0]).toHaveLength(5);
  expect(groups[1]).toHaveLength(5);
  expect(groups[2]).toHaveLength(5);
} );
