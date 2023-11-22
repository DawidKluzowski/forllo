'use client'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    //add all your reducers here
})

export const store = configureStore({
    reducer: rootReducer,
})
