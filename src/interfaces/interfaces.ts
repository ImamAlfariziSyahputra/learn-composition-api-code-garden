export interface DadJokeResponse {
  id: string;
  joke: string;
  status: number;
}

export interface Link {
  rel: string;
  render?: string;
  prompt?: string;
  href: string;
}

export interface Image {
  nasa_id: string;
  center: string;
  media_type: string;
  date_created: Date;
  title: string;
  description: string;
  keywords: string[];
  secondary_creator: string;
  description_508: string;
  location: string;
  photographer: string;
  album: string[];
}

export interface Item {
  links: Link[];
  data: Image[];
  href: string;
}

export interface Metadata {
  total_hits: number;
}

export interface Collection {
  items: Item[];
  links: Link[];
  metadata: Metadata;
  version: string;
  href: string;
}

export interface NasaImageResponse {
  collection: Collection;
}

export interface NasaImage {
  caption: string;
  url: string;
}