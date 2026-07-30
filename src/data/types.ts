export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  headings: string[];
  endCtaTool: string;
  endCtaAnchor: string;
  content: string;
}

export interface JobData {
  slug: string;
  readableTitle: string;
  paragraphs: string[];
  bullets: string[];
}
