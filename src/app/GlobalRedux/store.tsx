'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import activityListReducer from './Features/activity';

const rootReducer = combineReducers({
    //add all your reducers here
    acvivitiesLists: activityListReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
