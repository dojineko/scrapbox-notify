import { Contents } from "./feed.ts";

interface SlackPayload {
  blocks: {
    type: string;
  }[];
}

export const convertToSlackPayload = (contents: Contents): SlackPayload => {
  const headerBlock = {
    type: "header",
    text: {
      type: "plain_text",
      text: contents.title,
    },
  };
  const entiryBlocks = contents.entries.map((v) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `:memo: <${v.url}|${v.title}>`,
    },
  }));
  const dividerBlock = {
    type: "divider",
  };
  const footerBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: contents.url,
      },
    ],
  };

  return {
    blocks: [headerBlock, ...entiryBlocks, dividerBlock, footerBlock],
  };
};

export const postToSlack = async (url: string, payload: SlackPayload) => {
  const res = await fetch(url, {
    method: "post",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`${res.status}: ${res.statusText}`);
  }
};
