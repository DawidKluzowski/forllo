'use client';
import {
    AnyAction,
    Dispatch,
    Middleware,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import boards from './Features/boards';
import { logger } from 'redux-logger';

const rootReducer = combineReducers({
    boards: boards,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            logger as Middleware<any, any, Dispatch<AnyAction>>
        ),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
