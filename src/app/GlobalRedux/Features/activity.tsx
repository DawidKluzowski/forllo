'use client';

import { AcivitiesList } from '@/types';
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
        // addActivity: (state, action) => {
        //     state.map((activitiesList) =>
        //         activitiesList.activities.push(action.payload)
        //     );
        // },
        addActivityList: (state, action) => {
            state.push(action.payload);
        },
        // removeAcivityList: (
        //     state,
        //     action: PayloadAction<{ AcivitiesList }>
        // ) => {
        //     state.activitiesLists.filter(
        //         (activityList) => activityList.id !== action.payload
        //     );
        // },
    },
});

export const { addActivityList } = activityListSlice.actions;

export default activityListSlice.reducer;
