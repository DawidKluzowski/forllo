'use client';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Boards } from '@/types';
import { useDispatch } from 'react-redux';
import { renameBoard } from '@/lib/Features/boards';
import { IoClose } from 'react-icons/io5';
import { useClickOutsideElementHandler } from '@/hooks';

interface BoardNameInputProps {
    boards: Boards;
    removeTable: () => void;
}

const BoardNameInput = ({ boards, removeTable }: BoardNameInputProps) => {
    const dispatch = useDispatch();
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    const [boardNameInput, setBoardNameInput] = useState(boards.name);
    const inputRef =
        useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>;

    useClickOutsideElementHandler(inputRef, setIsInputEnabled);

    useEffect(() => {
        dispatch(
            renameBoard({ boardId: boards.id, boardName: boardNameInput })
        );
    }, [isInputEnabled]);

    return (
        <>
            {isInputEnabled ? (
                <div ref={inputRef}>
                    <Input
                        className=" w-[320px]"
                        placeholder="Name this activity"
                        value={boardNameInput}
                        onChange={(e) => setBoardNameInput(e.target.value)}
                    />
                </div>
            ) : (
                <>
                    <Button
                        onClick={() => setIsInputEnabled(true)}
                        className="relative w-full justify-start"
                    >
                        <p className="font-bold">{boards.name}</p>
                        <a
                            className="absolute left-[90%] z-10 cursor-pointer text-xl text-neutral-50 hover:text-red-600"
                            onClick={removeTable}
                        >
                            <IoClose />
                        </a>
                    </Button>
                </>
            )}
        </>
    );
};

export default BoardNameInput;
