import { Content } from '../posts/posts.types';

export interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  avatar: string;
  followers: any[];
  following: any[];
  articles: Article[];
  __v: number;
  drafts: any[];
}

export interface Article {
  _id: string;
  title: string;
  content: Content;
  author: string;
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
