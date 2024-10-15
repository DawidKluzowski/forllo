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
    setNewBoardIndex,
} from '../lib/Features/boards';
import { RootState } from '../lib/store';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from 'react';

export default function Home() {
    // const [activeItem, setActiveItem] = useState<any>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const boards = useSelector((state: RootState) => state.boards);
    const dispatch = useDispatch();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 0, tolerance: 10 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const boardsIds = boards.map((board) => {
        return board.id;
    });

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        console.log('over');
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        console.log('start');

        const activeId = boards
            .map((board) => board.activities)
            .find((activities) =>
                activities.find((activity) => activity.id === event.active.id)
            );
        setIsDragActive(true);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;

        const oldBoardId = active.data.current?.sortable?.containerId as string;
        const newBoardId = over?.data.current?.sortable?.containerId as string;
        const oldIndex = over?.data.current?.sortable?.index;
        const newIndex = active?.data.current?.sortable?.index;
        const board = boards.find((board) =>
            board.activities.find((activity) => activity.id === active.id)
        );
        const movedElement = board?.activities?.find(
            (activity) => activity.id === active.id
        );
        const activeElementType = active.data.current?.type;
        const isOverABoard = over?.data.current?.type === 'Board';
        const isOverActivity = over?.data.current?.type === 'Activity';

        if (movedElement && activeElementType === 'Activity') {
            console.log(oldIndex);
            console.log(newIndex);
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

        if (activeElementType === 'Board' && isOverABoard) {
            console.log(oldIndex);
            console.log(newIndex);
            // dispatch(
            //     setNewBoardIndex({ oldBoardId, newBoardId, newIndex, oldIndex })
            // );
        }
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
                    id="BoardsDndContext"
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <SortableContext
                        items={boards.map((d) => d.id)}
                        strategy={rectSortingStrategy}
                        id={'dupa'}
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
                                        removeTable={() =>
                                            onRemoveBoard(board.id)
                                        }
                                        board={board}
                                    />
                                </SortableContext>
                            );
                        })}
                    </SortableContext>
                    <Button className="min-w-[340px]" onClick={onAddBoard}>
                        + Add Table
                    </Button>

                    {/* <DragOverlay>
                        {activeItem ? <div>kurwaaa penisy </div> : null}
                    </DragOverlay> */}
                </DndContext>
            </div>
        </main>
    );
}
