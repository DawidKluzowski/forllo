'use client';

import { Boards, Activity } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: Boards[] = [
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

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<Boards>) => {
            state.push(action.payload);
        },
        removeBoard: (state, action: PayloadAction<string>) => {
            return state.filter((board) => board.id !== action.payload);
        },
        addActivity: (
            state,
            action: PayloadAction<{
                boardId: string;
                activityName: string;
            }>
        ) => {
            const newActivity: Activity = {
                id: uuidv4(),
                name: action.payload.activityName,
                description: 'do zmiany potem',
            };
            state
                .find((board) => board.id === action.payload.boardId)
                ?.activities.push(newActivity);
        },
        removeActivity: (
            state,
            action: PayloadAction<{
                activityId: string;
            }>
        ) => {
            return state.map((board) => {
                const updatedActivities = board.activities.filter(
                    (activity) => activity.id !== action.payload.activityId
                );
                return {
                    ...board,
                    activities: updatedActivities,
                };
            });
        },
    },
});

export const { addBoard, removeBoard, addActivity, removeActivity } =
    boardsSlice.actions;

export default boardsSlice.reducer;
