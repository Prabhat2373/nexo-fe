import { useEffect, useState } from 'react';
import { useLazyGetAllPostsQuery, useLazyGetFollowingPostsQuery } from '@/services/rtk/postsApi';

export const usePosts = (options) => {
  const [getPosts, { data }] = useLazyGetAllPostsQuery();
  const [getFollowingPosts, { data: followingPosts }] = useLazyGetFollowingPostsQuery();

  useEffect(() => {
    getPosts(options);
    getFollowingPosts(options);
  }, [options, getPosts, getFollowingPosts]);

  return { data, followingPosts };
};
