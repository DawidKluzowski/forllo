'use client';

import Board from '@/components/Board';
import { Button } from '@/components/ui/button';
import { Boards } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBoard, removeBoard } from '../lib/Features/boards';
import { RootState } from '../lib/store';
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import update from 'immutability-helper';

export default function Home() {
    const boards = useSelector((state: RootState) => state.boards);
    const dispatch = useDispatch();
    const [, drop] = useDrop(() => ({ accept: 'board' }));

    const findBoard = useCallback(
        (id: string) => {
            const board = boards.filter((board) => `${board.id}` === id)[0];
            return {
                board,
                index: boards.indexOf(board),
            };
        },
        [boards]
    );

    const moveBoard = useCallback(
        (id: string, atIndex: number) => {
            const { board, index } = findBoard(id);
            console.log(
                update(boards, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, board],
                    ],
                })
            );
        },
        [findBoard, boards]
    );

    const onRemoveBoard = (id: string) => {
        dispatch(removeBoard(id));
    };

    const onAddBoard = () => {
        const newTable: Boards = {
            id: uuidv4(),
            name: 'new table',
            activities: [],
        };
        dispatch(addBoard(newTable));
    };

    return (
        <main className="container relative">
            <div
                ref={drop}
                className="flex h-screen flex-nowrap gap-3 overflow-auto pt-8 "
            >
                {boards.map((board) => {
                    return (
                        <Board
                            removeTable={() => onRemoveBoard(board.id)}
                            key={board.id}
                            board={board}
                            moveBoard={moveBoard}
                            findBoard={findBoard}
                        />
                    );
                })}
                <Button className="min-w-[340px]" onClick={onAddBoard}>
                    + Add Table
                </Button>
            </div>
        </main>
    );
}
