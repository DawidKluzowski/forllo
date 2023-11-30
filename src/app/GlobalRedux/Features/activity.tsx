'use client';

import { AcivitiesList, Activity } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: AcivitiesList[] = [
    {
        id: uuidv4(),
        name: 'To Do',
        activities: [
            {
                id: uuidv4(),
                description: 'test',
                name: 'dupa',
            },
        ],
    },
    {
        id: uuidv4(),
        name: 'In progress',
        activities: [],
    },
    {
        id: uuidv4(),
        name: 'Done',
        activities: [],
    },
];

export const activityListSlice = createSlice({
    name: 'activityList',
    initialState,
    reducers: {
        addActivityList: (state, action: PayloadAction<AcivitiesList>) => {
            state.push(action.payload);
        },
        removeActivityList: (state, action: PayloadAction<string>) => {
            return state.filter(
                (actionLists) => actionLists.id !== action.payload
            );
        },
        addActivity: (
            state,
            action: PayloadAction<{ id: string; activityName: string }>
        ) => {
            const newActivity: Activity = {
                id: uuidv4(),
                name: action.payload.activityName,
                description: 'do zmiany potem',
            };
            state
                .find((qwe) => qwe.id === action.payload.id)
                ?.activities.push(newActivity);
        },
    },
});

export const { addActivityList, removeActivityList, addActivity } =
    activityListSlice.actions;

export default activityListSlice.reducer;
