import { configureStore } from '@reduxjs/toolkit';
import { employeesUiReducer } from '../features/employees/model/uiSlice';
import { usersApi } from '../infrastructure/api/usersApi';

export const store = configureStore({
  reducer: {
    employeesUi: employeesUiReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
