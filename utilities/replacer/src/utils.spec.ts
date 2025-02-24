import { isFromType, isRequireType } from "utils";


describe.each([
  "require(\"asdf\")",
  "require(\".\")",
  "require(\"./\")",
  "require(\"..\")",
  "require(\"../\")",
  "require(\"/home/folder\")",
  "require(\"./adas\")",
  "require(\"../dsb\")",
  "require(\"../dsb/sas\")",
])("isRequireType", (url) => {
  it(`${url}`, () => {
    const actual = isRequireType(url);

    expect(actual).toBeTruthy();
  });
});

it(`from`, () => {
  const url = "from \"asdf\"";

  const actual = isFromType(url);

  expect(actual).toBeTruthy();
});