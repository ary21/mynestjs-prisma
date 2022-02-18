export class PostQuery {
  skip?: number;
  take?: number;
  title?: string;
  content?: string;
  published?: boolean;
  orderBy?: string;
  orderWith?: string;
}
