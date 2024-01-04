import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Boards } from '@/types';
import { useDispatch } from 'react-redux';
import { renameBoard } from '@/app/GlobalRedux/Features/boards';

interface BoardNameInputProps {
    boards: Boards;
}

const BoardNameInput = ({ boards }: BoardNameInputProps) => {
    const dispatch = useDispatch();
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    const [boardNameInput, setBoardNameInput] = useState(boards.name);
    const inputRef =
        useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            const inputClicked = inputRef?.current?.contains(
                evt.target as HTMLElement
            );

            if (!inputClicked) {
                setIsInputEnabled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                <Button
                    onClick={() => setIsInputEnabled(true)}
                    className="w-full justify-start"
                >
                    {boards.name}
                </Button>
            )}
        </>
    );
};

export default BoardNameInput;
