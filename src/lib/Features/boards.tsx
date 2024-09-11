'use client';

import { Boards, Activity } from '@/types';
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { JSONContent } from '@tiptap/react';
import { v4 as uuidv4 } from 'uuid';

const initialState: Boards[] = [
    {
        id: uuidv4(),
        name: 'To Do',
        activities: [
            {
                id: uuidv4(),
                description: undefined,
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
            const { boardId, activityName } = action.payload;
            const newActivity: Activity = {
                id: uuidv4(),
                name: activityName,
                description: undefined,
            };
            state
                .find((board) => board.id === boardId)
                ?.activities.push(newActivity);
        },
        removeActivity: (
            state,
            action: PayloadAction<{
                activityId: string;
            }>
        ) => {
            const { activityId } = action.payload;

            return state.map((board) => {
                const updatedActivities = board.activities.filter(
                    (activity) => activity.id !== activityId
                );
                return {
                    ...board,
                    activities: updatedActivities,
                };
            });
        },
        renameBoard: (
            state,
            action: PayloadAction<{ boardId: string; boardName: string }>
        ) => {
            return state.map((board) => {
                const { boardId, boardName } = action.payload;

                if (board.id === boardId) {
                    return {
                        ...board,
                        name: boardName,
                    };
                } else {
                    return board;
                }
            });
        },
        changeActivityDescription: (
            state,
            action: PayloadAction<{
                activityId: string;
                activityDescription: JSONContent | undefined;
            }>
        ) => {
            const { activityId, activityDescription } = action.payload;

            state.map((board) => {
                const updatedActivities = board.activities.map((activity) => {
                    if (activity.id === activityId) {
                        activity.description = activityDescription;
                        return activity;
                    }
                    return activity;
                });
                return { ...board, activities: updatedActivities };
            });
        },
        setNewActivityIndex: (
            state,
            action: PayloadAction<{
                oldBoardId: string;
                newBoardId: string;
                movedElement: Activity;
                oldIndex: number;
                newIndex: number;
            }>
        ) => {
            const { newBoardId, oldBoardId, movedElement, newIndex, oldIndex } =
                action.payload;

            const oldBoard = state.find((board) => {
                return board.id === oldBoardId;
            });
            console.log(current(oldBoard));

            const newBoard = state.find((board) => board.id === newBoardId);
            // const activityItem = oldBoard?.activities.find(
            //     (activity) => activity.id === movedElement.id
            // );
            // console.log(current(activityItem));

            if (movedElement && newBoard !== oldBoard) {
                oldBoard?.activities.splice(oldIndex, 1);
                newBoard?.activities.splice(newIndex, 0, movedElement);
            }
            // console.log(current(activityItem));
        },
    },
});

export const {
    addBoard,
    removeBoard,
    addActivity,
    removeActivity,
    renameBoard,
    changeActivityDescription,
    setNewActivityIndex,
} = boardsSlice.actions;

export default boardsSlice.reducer;
