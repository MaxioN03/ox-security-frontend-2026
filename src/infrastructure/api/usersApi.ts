import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Employee } from '../../domain/employee';
import type { EmployeeStatus } from '../../domain/status';

interface UpdateUserStatusRequest {
  userId: number;
  status: EmployeeStatus;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    updateUserStatus: builder.mutation<Employee[], UpdateUserStatusRequest>({
      query: ({ userId, status }) => ({
        url: `/users/${userId}`,
        method: 'POST',
        body: { status },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserStatusMutation } = usersApi;
