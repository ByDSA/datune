import { SPNs } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { generate } from "./generate";

TestInit.loadAll();
const { C5, E5, G5 } = SPNs;

it("near motion C5-E5-G5 in C", () => {
  const fromNotes = [C5, E5, G5];
  const { groups } = generate( {
    arrayLength: fromNotes.length,
    maxInterval: 2,
  } );

  expect(groups).toHaveLength(3);
  expect(groups[0]).toHaveLength(5);
  expect(groups[1]).toHaveLength(5);
  expect(groups[2]).toHaveLength(5);
} );
