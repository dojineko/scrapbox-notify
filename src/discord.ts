import _ from "lodash-es";
import { Contents } from "./feed.ts";

interface DiscordPayload {
  content: string;
  embeds?: { title: string; url: string }[];
}

export const convertToDiscordPayload = (
  contents: Contents,
): DiscordPayload[] => {
  const entryChunks = _.chunk(contents.entries, 10);
  return entryChunks.map(
    (chunk, i): DiscordPayload => ({
      content: `**${contents.title}** (${contents.url}) [${i + 1}/${
        entryChunks.length
      }]`,
      embeds: chunk.map((v) => ({
        title: `:memo: ${v.title}`,
        url: v.url,
      })),
    }),
  );
};

export const postToDiscord = async (
  url: string,
  payloads: DiscordPayload[],
) => {
  for (const i in payloads) {
    const res = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloads[i]),
    });
    if (!res.ok) {
      console.error(
        `${res.status}: ${res.statusText} (${i + 1}/${payloads.length})`,
      );
    }
  }
};
