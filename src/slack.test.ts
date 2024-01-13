import { expect, test } from "vitest";
import { convertToSlackPayload } from "./slack.ts";

test("convertToSlackPayload", () => {
  const actual = convertToSlackPayload({
    title: "sample",
    url: "localhost",
    entries: [{ title: "sample", url: "localhost", published: new Date(0) }],
  });
  const expected = {
    blocks: [
      {
        text: {
          text: "sample",
          type: "plain_text",
        },
        type: "header",
      },
      {
        text: {
          text: ":memo: <localhost|sample>",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        elements: [
          {
            text: "localhost",
            type: "mrkdwn",
          },
        ],
        type: "context",
      },
    ],
  };
  expect(actual).toEqual(expected);
});
