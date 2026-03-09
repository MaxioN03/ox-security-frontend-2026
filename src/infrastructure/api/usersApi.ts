import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type EmployeeStatus =
  | 'Working'
  | 'OnVacation'
  | 'LunchTime'
  | 'BusinessTrip';

export interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  img: string;
}

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
