import dayjs from "dayjs";
import RssParser from "rss-parser";

export interface Entry {
  title: string;
  url: string;
  published: Date;
}

export interface Contents {
  title: string;
  url: string;
  entries: Entry[];
}

export const getFromUrl = async (url: string) => {
  const response = await fetch(url);
  return await response.text();
};

export const parseFeed = async (
  xml: string,
  now = new Date(),
): Promise<Contents> => {
  const feed = await new RssParser().parseString(xml);
  const entries: Entry[] = feed.items
    .map((v) => ({
      title: v.title?.replace(new RegExp(`\\s*?[-|]\\s*?${feed.title}$`), ""),
      url: v.link,
      published: new Date(v.pubDate || 0),
    }))
    .filter((v) => {
      const n = dayjs(now).locale("ja-jp");
      const published = dayjs(v.published);
      return n.add(-1, "day") <= published && published <= n;
    })
    .map((v) => ({
      title: v.title || "",
      url: v.url || "",
      published: v.published || new Date(0),
    }));

  return {
    title: (feed.title || "").split(" - ")[0],
    url: feed.link || "",
    entries,
  };
};
