import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from '@reduxjs/toolkit/query'
import { animalsApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [animalsApi.reducerPath]:animalsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalsApi.middleware),

});

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;