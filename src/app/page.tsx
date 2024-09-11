'use client';

import Board from '@/components/Board';
import { Button } from '@/components/ui/button';
import { Boards } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    addBoard,
    removeBoard,
    setNewActivityIndex,
} from '../lib/Features/boards';
import { RootState } from '../lib/store';
import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';

export default function Home() {
    const [activeItem, setActiveItem] = useState<any>(null);
    const boards = useSelector((state: RootState) => state.boards);
    // const selectedActivityItem = useSelector((state: RootState) =>
    //     state.boards.map((board) => {
    //         return board.activities;
    //     })
    // );
    const dispatch = useDispatch();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragOverEvent) => {
        const { active, over } = event;

        if (active && over) {
            const oldBoardId = active.data.current?.sortable
                ?.containerId as string;
            const newBoardId = over?.data.current?.sortable
                ?.containerId as string;
            const oldIndex = over?.data.current?.sortable?.index;
            const newIndex = active?.data.current?.sortable?.index;
            const board = boards.find((board) =>
                board.activities.find((activity) => activity.id === active.id)
            );
            const movedElement = board?.activities?.find(
                (activity) => activity.id === active.id
            );

            // console.log('oooooooo');
            // console.log(over?.data.current?.sortable);
            // console.log('oooooooo');
            // console.log('aaaaaaaaaa');
            // console.log(active?.data.current?.sortable);
            // console.log('aaaaaaaaaa');
            console.log(movedElement);

            if (movedElement) {
                dispatch(
                    setNewActivityIndex({
                        newBoardId,
                        oldBoardId,
                        movedElement,
                        oldIndex,
                        newIndex,
                    })
                );
            }
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const activeId = boards
            .map((board) => board.activities)
            .find((activities) =>
                activities.find((activity) => activity.id === event.active.id)
            );
        setActiveItem(activeId);
    };

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
            <div className="flex h-screen flex-nowrap gap-3 overflow-auto pt-8 ">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragOver={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    {boards.map((board) => {
                        return (
                            <SortableContext
                                key={board.id}
                                items={board.activities}
                                strategy={rectSortingStrategy}
                                id={board.id}
                            >
                                <Board
                                    removeTable={() => onRemoveBoard(board.id)}
                                    board={board}
                                />
                            </SortableContext>
                        );
                    })}
                    <Button className="min-w-[340px]" onClick={onAddBoard}>
                        + Add Table
                    </Button>

                    <DragOverlay>
                        {activeItem ? <div>kurwaaa penisy </div> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </main>
    );
}
