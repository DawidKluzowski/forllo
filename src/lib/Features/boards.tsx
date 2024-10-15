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
        addBoard: (state, action) => {
            state.push(action.payload);
        },
        removeBoard: (state, action) => {
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
            const newBoard = state.find((board) => board.id === newBoardId);

            if (!oldBoard || !newBoard) return;

            if (movedElement && newBoard.id === oldBoard.id) {
                oldBoard?.activities.splice(
                    newIndex,
                    0,
                    oldBoard?.activities.splice(oldIndex, 1)[0]
                );
            } else if (movedElement && newBoard.id !== oldBoard.id) {
                newBoard?.activities.splice(newIndex, 0, movedElement);
                oldBoard.activities = oldBoard.activities.filter(
                    (a) => a.id !== movedElement.id
                );
            }
        },
        setNewBoardIndex: (
            state,
            action: PayloadAction<{
                oldBoardId: string;
                newBoardId: string;
                newIndex: number;
                oldIndex: number;
            }>
        ) => {
            const { newBoardId, oldBoardId, newIndex, oldIndex } =
                action.payload;

            const movedElement = state.find((s) => s.id === oldBoardId);

            // const asd = state.map((s) => {
            //     return s;
            // });
            // console.log(current(asd));

            if (!movedElement) return;

            state.splice(newIndex, 0, movedElement);
            state.filter((s) => s.id === movedElement.id);
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
    setNewBoardIndex,
} = boardsSlice.actions;

export default boardsSlice.reducer;
