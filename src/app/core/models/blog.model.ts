export interface BlogFeed {
  url: string;
  title?: string;
  link?: string;
  author?: string;
  description?: string;
  image?: string;
}

export interface BlogItem {
  title?: string;
  pubDate?: string;
  link?: string;
  guid?: string;
  author?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  enclosure?: object;
  categories?: [];
}
