'use client';

import ActivityList from '@/components/ActivityList';
import { Button } from '@/components/ui/button';
import { Boards } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBoard, removeBoard } from './GlobalRedux/Features/boards';
import { RootState } from './GlobalRedux/store';

export default function Home() {
    const boards = useSelector((state: RootState) => state.boards);
    const dispatch = useDispatch();

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
        <main className="container">
            <div className="flex flex-nowrap gap-3 overflow-auto whitespace-nowrap pt-8 ">
                {boards.map((board) => {
                    return (
                        <ActivityList
                            removeTable={() => onRemoveBoard(board.id)}
                            key={board.id}
                            boards={board}
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
