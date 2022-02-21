export class PostQuery {
  skip?: number;
  take?: number;
  title?: string;
  content?: string;
  authorName?: string;
  published?: boolean;
  orderBy?: string;
  orderWith?: string;
}
