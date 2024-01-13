import { expect, test } from "vitest";
import { convertToDiscordPayload } from "./discord.ts";

test("convertToDiscordPayload", () => {
  const actual = convertToDiscordPayload({
    title: "sample",
    url: "localhost",
    entries: [{ title: "sample", url: "localhost", published: new Date(0) }],
  });
  const expected = [
    {
      content: "**sample** (localhost) [1/1]",
      embeds: [
        {
          title: ":memo: sample",
          url: "localhost",
        },
      ],
    },
  ];
  expect(actual).toEqual(expected);
});
