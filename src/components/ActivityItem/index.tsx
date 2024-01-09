'use client';

import {
    changeActivityDescription,
    removeActivity,
} from '@/app/GlobalRedux/Features/boards';
import { Activity } from '@/types';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoClose } from 'react-icons/io5';

interface ActivityItemProps {
    activity: Activity;
}

const formSchema = z.object({
    activityDescription: z.string().min(1).max(50),
});

const ActivityItem = ({ activity }: ActivityItemProps) => {
    const [isEditDescription, setIsEditDescription] = useState(false);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onRemoveActivity = (activityId: string) => {
        dispatch(
            removeActivity({
                activityId: activityId,
            })
        );
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch(
            changeActivityDescription({
                activityId: activity.id,
                activityDescription: values.activityDescription,
            })
        );
        setIsEditDescription(false);
        form.reset();
    };

    const onEditDescriptionCancel = () => {
        setIsEditDescription(false);
        form.reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mb-2 flex w-full justify-between rounded-lg bg-gray-600 p-2 ">
                    <h2>{activity.name}</h2>
                    <a
                        onClick={() => onRemoveActivity(activity.id)}
                        className=" cursor-pointer text-xl"
                    >
                        <MdEdit />
                    </a>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5">{activity.name}</DialogTitle>
                    <div className="mb-5 flex items-center justify-between">
                        <DialogTitle>Desciption:</DialogTitle>
                        <Button onClick={() => setIsEditDescription(true)}>
                            Edit
                        </Button>
                    </div>
                    {isEditDescription ? (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="activityDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
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
                                        onClick={onEditDescriptionCancel}
                                    >
                                        <IoClose />
                                    </a>
                                </div>
                            </form>
                        </Form>
                    ) : (
                        <DialogDescription>
                            <p>{activity.description}</p>
                        </DialogDescription>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityItem;
