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
    getRestaurantMenus: builder.query({
      query: (params) => ({
        url: `/restaurants/menu-items`,
        params,
      }),
    }),
    getPredefinedMenus: builder.query({
      query: (params) => ({
        url: `/predefined-menu-items`,
        params,
      }),
    }),
    addMenu: builder.mutation({
      query: (body) => ({
        url: `restaurants/menu-items`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetAllTablesQuery,
  useAddNewTableMutation,
  useLazyGetRestaurantMenusQuery,
  useLazyGetPredefinedMenusQuery,
  useGetPredefinedMenusQuery,
  useAddMenuMutation,
} = setupApi;
