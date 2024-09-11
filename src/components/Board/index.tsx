'use client';

import { Boards } from '@/types';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
} from '../ui/form';
import { addActivity } from '@/lib/Features/boards';
import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import BoardNameInput from '../BoardNameInput';
import ActivityItem from '../ActivityItem';
import { useDroppable } from '@dnd-kit/core';

interface BoardProps {
    board: Boards;
    removeTable: () => void;
}

const formSchema = z.object({
    activityName: z.string().min(1).max(50),
});

const Board = ({ board, removeTable }: BoardProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activityName: '',
        },
    });
    // const { isOver, setNodeRef } = useDroppable({
    //     id: board.id,
    // });
    // const style = {
    //     color: isOver ? 'green' : undefined,
    // };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch(
            addActivity({
                boardId: board.id,
                activityName: values.activityName,
            })
        );
        setIsEdit(false);
        form.reset();
    };

    useEffect(() => {
        form.setFocus('activityName');
    }, [isEdit]);

    return (
        // <div ref={setNodeRef} style={style}>
        <Card className="h-fit min-w-[370px] bg-gray-500">
            <CardHeader className="flex h-20 flex-row items-center justify-between align-middle">
                <CardTitle className="w-full">
                    <BoardNameInput removeTable={removeTable} boards={board} />
                </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
                {board.activities?.map((activity) => (
                    <ActivityItem
                        name={board.name}
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </CardContent>
            <CardFooter>
                {!isEdit ? (
                    <Button
                        className="w-[340px] "
                        onClick={() => setIsEdit(true)}
                        variant="secondary"
                    >
                        <span className="text-xs">
                            <FaPlus />
                        </span>
                        <span> Add Activity</span>
                    </Button>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="activityName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...form.register(
                                                    'activityName'
                                                )}
                                                className="w-[320px]"
                                                placeholder="Name this activity"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center">
                                <Button className="mr-4" type="submit">
                                    Add Activity
                                </Button>
                                <a
                                    className="cursor-pointer text-xl"
                                    onClick={() => setIsEdit(false)}
                                >
                                    <IoClose />
                                </a>
                            </div>
                        </form>
                    </Form>
                )}
            </CardFooter>
        </Card>
        // </div>
    );
};

export default Board;
