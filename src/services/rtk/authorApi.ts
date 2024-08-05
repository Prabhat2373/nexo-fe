import { baseQuery } from '@/utils/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAuthorPosts: builder.query({
      query: (id) => ({
        url: `/author/${id}/posts`
      })
    })
  })
});

export const { useLazyGetAuthorPostsQuery } = authorApi;
