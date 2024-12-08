import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, WebStorage } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

/**
 * Configuration object for Redux Persist.
 * @type {object}
 * @property {string} key - The key to persist the state under.
 * @property {Storage} storage - The storage engine to use (e.g., localStorage).
 * @property {string[]} blacklist - Reducers to exclude from persistence.
 * @property {boolean} debug - Enable debugging mode for persistence.
 */

const persistConfig: {
  key: string;
  storage: WebStorage;
  blacklist: string[];
  debug: boolean;
} = {
  key: "store",
  storage,
  blacklist: ["_persist"],
  debug: true,
};

/**
 * Enhances the root reducer with persistence capabilities.
 * @param {object} persistConfig - Configuration for Redux Persist.
 * @param {function} rootReducer - The root reducer of the application.
 * @returns {function} A persisted reducer function.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures the Redux store with persisted reducers and custom middleware.
 * @returns {object} The configured Redux store.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * Creates a persistor for the Redux store to handle persistence.
 * @param {object} store - The Redux store instance.
 * @returns {object} The persistor instance.
 */
let persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, persistor };
export type { RootState, AppDispatch };
