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
import { useState } from 'react';
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
import { addActivity, removeActivity } from '@/app/GlobalRedux/Features/boards';
import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import BoardNameInput from '../BoardNameInput';

interface ActivityListProps {
    boards: Boards;
    removeTable: () => void;
}

const formSchema = z.object({
    activityName: z.string().min(1).max(50),
});

const ActivityList = ({ boards, removeTable }: ActivityListProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activityName: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch(
            addActivity({
                boardId: boards.id,
                activityName: values.activityName,
            })
        );
        setIsEdit(false);
        form.reset();
    };

    const onRemoveActivity = (activityId: string) => {
        dispatch(
            removeActivity({
                activityId: activityId,
            })
        );
    };

    return (
        <Card className="min-w-[370px] bg-gray-500">
            <CardHeader className="flex h-20 flex-row items-center justify-between align-middle">
                <CardTitle className="w-full">
                    <BoardNameInput boards={boards} />
                </CardTitle>
                <a className="cursor-pointer text-xl" onClick={removeTable}>
                    <IoClose />
                </a>
            </CardHeader>
            <CardContent className="w-full">
                {boards.activities.map((activity) => (
                    <div
                        className="mb-2 flex w-full justify-between rounded-lg bg-gray-600 p-2 "
                        key={activity.id}
                    >
                        <span>{activity.name}</span>
                        <a
                            onClick={() => onRemoveActivity(activity.id)}
                            className=" cursor-pointer text-xl"
                        >
                            <MdEdit />
                        </a>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                {!isEdit ? (
                    <Button
                        className="w-[340px]"
                        onClick={() => setIsEdit(true)}
                    >
                        + Add Activity
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
    );
};

export default ActivityList;
