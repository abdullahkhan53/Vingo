import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ownerSlice from "./ownerSlice";
import mapSlice from "./mapSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        owner: ownerSlice,
        map: mapSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // user.socket path ko non-serializable warning se ignore karain
        ignoredPaths: ['user.socket'],
        ignoredActions: ['user/setUser'],
      },
    }),
    // devTools: true,
})