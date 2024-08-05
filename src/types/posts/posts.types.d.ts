export interface Post {
  _id: string;
  title: string;
  content: Content;
  author: Author;
  thumbnail: string;
  tags: string[];
  likes: any[];
  comments: any[];
  status: string;
  anonymousViews: string[];
  views: any[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Content {
  type: string;
  content: any[];
}
