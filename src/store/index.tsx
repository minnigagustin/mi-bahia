import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

//Cambio immutableCheck y serializableCheck, porque tenia problema cuando habian demasiados componentes para renderizar

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
