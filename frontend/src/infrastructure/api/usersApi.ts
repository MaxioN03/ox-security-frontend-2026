import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Employee } from '@/domain/employee';
import type { EmployeeStatus } from '@/domain/status';

export type GetUsersResponse = Employee[];

export interface UpdateUserStatusRequest {
  userId: number;
  status: EmployeeStatus;
}

export type UpdateUserStatusResponse = Employee[];

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    updateUserStatus: builder.mutation<
      UpdateUserStatusResponse,
      UpdateUserStatusRequest
    >({
      query: ({ userId, status }) => ({
        url: `/users/${userId}`,
        method: 'POST',
        body: { status },
      }),
      async onQueryStarted({ userId, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const emp = draft.find((e) => e.id === userId);
            if (emp) emp.status = status;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserStatusMutation } = usersApi;
