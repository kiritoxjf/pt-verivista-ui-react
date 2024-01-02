import { apiSlice } from '@/services/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    test: builder.mutation({
      query: (body) => ({
        url: '/test/test',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useTestMutation } = userApiSlice;
