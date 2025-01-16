import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice.js";
import jobSlice from "../redux/jobSlice.js";
import companySlice from "../redux/companySlice.jsx";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  REGISTER,
  PURGE,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  jobs: jobSlice,
  company: companySlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     jobs: jobSlice,
//   },
// });

export default store;
