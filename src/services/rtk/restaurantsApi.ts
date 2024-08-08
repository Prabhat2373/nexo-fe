import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const restaurantsApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "restaurantsApi",
  endpoints: (builder) => ({
    fetchRestaurants: builder.query({
      query: (params) => ({
        url: "/restaurants",
        params,
      }),
    }),
    fetchRestaurantTables: builder.query({
      query: (params) => ({
        url: `/restaurants/${params?.restaurant}/tables`,
      }),
    }),
  }),
});

export const {
  useLazyFetchRestaurantsQuery,
  useLazyFetchRestaurantTablesQuery,
} = restaurantsApi;
