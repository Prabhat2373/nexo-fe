import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
    }),
    getAuthorProfile: builder.query({
      query: (id) => ({
        url: `/author/profile/${id}`,
      }),
    }),
    followUser: builder.mutation({
      query: (author) => ({
        url: `/follow/${author}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (author) => ({
        url: `/unfollow/${author}`,
        method: "POST",
      }),
    }),
    getAllAuthors: builder.query({
      query: () => ({
        url: `/authors/all`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useLazyGetAuthorProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useLazyGetAllAuthorsQuery,
  useGetAllAuthorsQuery,
} = profileApi;
