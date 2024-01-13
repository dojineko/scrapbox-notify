import fs from "fs/promises";
import process from "process";
import { convertToDiscordPayload, postToDiscord } from "./discord.ts";
import { getFromUrl, parseFeed } from "./feed.ts";
import { convertToSlackPayload, postToSlack } from "./slack.ts";
import { readLineAndExecute } from "./util.ts";

const feedUrl = process.env.INPUT_FEED_URL;
if (!feedUrl) {
  console.error("FEED_URL is empty");
  process.exit(1);
}

const debug = !!process.env.DEBUG;
const feed = debug
  ? await fs.readFile("./src/feed.test.xml").then((v) => v.toString())
  : await getFromUrl(feedUrl);
const contents = debug
  ? await parseFeed(feed, new Date("2022-02-22T22:22:22Z"))
  : await parseFeed(feed);

if (contents.entries.length <= 0) {
  process.exit(0);
}

const delay = debug ? 0 : 1000;

await readLineAndExecute(
  process.env.INPUT_SLACK_WEBHOOK,
  async (v) => {
    await postToSlack(v, convertToSlackPayload(contents));
  },
  delay,
);

await readLineAndExecute(
  process.env.INPUT_DISCORD_WEBHOOK,
  async (v) => {
    await postToDiscord(v, convertToDiscordPayload(contents));
  },
  delay,
);
