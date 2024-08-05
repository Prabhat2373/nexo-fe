import { baseQuery } from '@/utils/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: '/blogs',
        method: 'POST',
        body
      })
    }),
    getPostComments: builder.query({
      query: (id) => ({
        url: `/posts/comments/${id}`
      })
    }),
    getAllPosts: builder.query({
      query: (args) => ({
        url: `/blogs`,
        params: args
      })
    }),
    getFollowingPosts: builder.query({
      query: (params) => ({
        url: `/blogs/following`,
        params
      })
    }),
    getPostOverview: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`
      })
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/blogs/like/${id}`,
        method: 'POST'
      })
    }),
    commentOnPost: builder.mutation({
      query: ({ blogId, body }) => ({
        url: `/blogs/comment/${blogId}`,
        method: 'POST',
        body
      })
    }),
    sharePost: builder.mutation({
      query: (id) => ({
        url: `/blogs/share/${id}`,
        method: 'POST'
      })
    }),
    saveDrafts: builder.mutation({
      query: (body) => ({
        url: `/posts/drafts`,
        method: 'POST',
        body
      })
    }),
    getSavedDrafts: builder.query({
      query: () => ({
        url: `/posts/drafts`
      })
    }),
    replyToComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/comment/${id}/reply`,
        method: 'POST',
        body
      })
    }),
    getCommentReplies: builder.query({
      query: (id) => ({
        url: `/comment/${id}/replies`
      })
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/posts/comments/${id}`,
        method: 'DELETE'
      })
    }),
    deleteReply: builder.mutation({
      query: (id) => ({
        url: `/comment/replies/${id}`,
        method: 'DELETE'
      })
    }),
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body
      })
    }),
    getBlogTopics: builder.query({
      query: (args) => ({
        url: `/topics`,
        params: args
      })
    }),
    togglePostSave: builder.mutation({
      query: ({ postId, action }) => ({
        url: `/blogs/posts/${postId}/${action}`,
        method: 'PUT'
      })
    }),
    getAccountPosts: builder.query({
      query: () => ({
        url: '/account/posts'
      })
    })
  })
});

export const {
  useCommentOnPostMutation,
  useCreatePostMutation,
  useLazyGetPostOverviewQuery,
  useLikePostMutation,
  useSharePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useSaveDraftsMutation,
  useLazyGetSavedDraftsQuery,
  useGetSavedDraftsQuery,
  useLazyGetPostCommentsQuery,
  useReplyToCommentMutation,
  useLazyGetCommentRepliesQuery,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
  useUpdateBlogMutation,
  useLazyGetBlogTopicsQuery,
  useLazyGetFollowingPostsQuery,
  useTogglePostSaveMutation,
  useLazyGetAccountPostsQuery
} = postsApi;
