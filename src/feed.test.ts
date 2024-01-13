import fs from "fs/promises";
import { expect, test } from "vitest";
import { parseFeed } from "./feed.ts";

test("parseFeed", async () => {
  const xml = await fs
    .readFile("./src/feed.test.xml")
    .then((v) => v.toString());
  const actual = await parseFeed(xml, new Date("2022-02-22T22:22:22Z"));
  const expected = {
    entries: [
      {
        published: new Date("2022-02-22T22:22:22.000Z"),
        title: "Scrapbox Help - Scrapbox",
        url: "https://scrapbox.io/help/%E6%97%A5%E6%9C%AC%E8%AA%9E",
      },
    ],
    title: "Scrapbox Help",
    url: "https://scrapbox.io/help",
  };
  expect(actual).toEqual(expected);
});
