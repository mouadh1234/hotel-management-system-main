import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import { persistReducer, persistStore } from "redux-persist";

import sessionStorage from "redux-persist/es/storage/session";
import RoomReducer from "./RoomSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

// Combine all your reducers here
const rootReducer = combineReducers({
  user: UserReducer,
  rooms: RoomReducer,
  // Add other reducers if you have more
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   middleware: [thunk],
});

export const persistor = persistStore(store);
