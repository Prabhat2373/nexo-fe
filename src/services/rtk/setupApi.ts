import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const setupApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "setupApi",
  endpoints: (builder) => ({
    getAllTables: builder.query({
      query: (params) => ({
        url: `/restaurants/${params.restaurantId}/tables`,
        params,
      }),
    }),
    addNewTable: builder.mutation({
      query: (params) => ({
        url: `restaurants/${params?.restaurant}/tables/${params?.quantity}`,
      }),
    }),
  }),
});

export const { useLazyGetAllTablesQuery, useAddNewTableMutation } = setupApi;
