import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Menu } from '@/types/menu';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Menu'],
  endpoints: (builder) => ({
    getMenus: builder.query<Menu[], void>({
      query: () => '/menus',
      providesTags: ['Menu'],
    }),
    createMenu: builder.mutation<Menu, Partial<Menu>>({
      query: (body) => ({
        url: '/menus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Menu'],
    }),
    updateMenu: builder.mutation<Menu, { id: string; name: string }>({
      query: ({ id, ...patch }) => ({
        url: `/menus/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Menu'],
    }),
    deleteMenu: builder.mutation<void, string>({
      query: (id) => ({
        url: `/menus/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Menu'],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi; 