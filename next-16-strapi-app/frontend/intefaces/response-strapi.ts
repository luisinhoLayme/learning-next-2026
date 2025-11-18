export interface ResponseStrapi {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  sections: Section[];
}

export interface Section {
  __component: string;
  id: number;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
}

export interface Link {
  id: number;
  href: string;
  label: string;
  isExternal: null;
}

export interface Meta {
}
