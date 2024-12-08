import { createAction } from "@reduxjs/toolkit";

/**
 * Module name to namespace actions.
 * @constant {string}
 */
const MODULE: string = "Activity";

/**
 * Action to reset the activity state.
 * @constant {import('@reduxjs/toolkit').ActionCreatorWithPayload<undefined, string>}
 */
export const $reset = createAction(`${MODULE}/reset`);

/**
 * Action to set the processing state of an activity.
 * @constant {import('@reduxjs/toolkit').ActionCreatorWithPayload<undefined, string>}
 */
export const $processing = createAction<string>(`${MODULE}/processing`);

/**
 * Action to indicate the activity is done.
 * @constant {import('@reduxjs/toolkit').ActionCreatorWithPayload<undefined, string>}
 */
export const $done = createAction<string>(`${MODULE}/done`);
