/**
 * Configuration and setup for Redux store with persistence using redux-persist.
 *
 * This configuration enhances the Redux store to persist certain parts of the state
 * to local storage, ensuring state is retained even after the user reloads the application.
 *
 * It uses `redux-persist` to automatically save and rehydrate the Redux store's state across sessions.
 *
 * @module Redux Store and Persistence Setup
 */

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

/**
 * Configuration for Redux Persist to manage state persistence.
 *
 * This configuration object defines settings such as the storage engine,
 * which reducers to persist, and if debugging is enabled.
 *
 * @type {object}
 * @property {string} key - The key under which the persisted state will be saved (e.g., "store").
 * @property {WebStorage} storage - The storage engine used to persist the data (default: localStorage).
 * @property {string[]} blacklist - The list of reducers that should not be persisted (e.g., ["_persist"]).
 * @property {boolean} debug - If set to `true`, debug logs for persistence will be enabled.
 */
const persistConfig = {
  key: "store",
  storage,
  blacklist: ["_persist"], // Exclude _persist reducer from persistence.
  debug: true, // Enable debugging mode.
};

/**
 * Persisted reducer that wraps the root reducer with persistence capabilities.
 *
 * This function enhances the root reducer by making it compatible with redux-persist.
 * It automatically handles saving and restoring the state for the persisted reducers.
 *
 * @param {object} persistConfig - Configuration object for redux-persist.
 * @param {function} rootReducer - The root reducer that combines all slice reducers.
 * @returns {function} The persisted reducer function.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures the Redux store, applying the persisted reducer and custom middleware.
 *
 * The store is configured with redux-persist to save certain parts of the state and
 * rehydrate it when the application restarts. Middleware is configured to allow non-serializable values.
 *
 * @returns {object} The configured Redux store instance.
 */
const store = configureStore({
  reducer: persistedReducer, // Apply persisted reducer.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values.
    }),
});

/**
 * Creates a persistor for managing persistence in the Redux store.
 *
 * The persistor is used to manage the state persistence (save and rehydrate) across browser sessions.
 *
 * @param {object} store - The Redux store instance that is persisted.
 * @returns {object} The persistor instance to manage persistence.
 */
let persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Export the configured store and persistor, along with their types for type safety.
export { store, persistor };
export type { RootState, AppDispatch };
