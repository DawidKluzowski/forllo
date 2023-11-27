import { AcivitiesList } from '@/types';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
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
    FormLabel,
    FormDescription,
    FormMessage,
} from '../ui/form';

interface ActivityListProps {
    activitiesList: AcivitiesList;
    removeTable: () => void;
}

const formSchema = z.object({
    activityName: z.string().min(2).max(50),
});

const ActivityList = ({
    activitiesList: table,
    removeTable,
}: ActivityListProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activityName: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Card className="w-48 bg-slate-500">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    <span className="text-lg">{table.name}</span>
                </CardTitle>
                <Button onClick={removeTable}>RM</Button>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                {table.activities.map((activity) => (
                    <div key={activity.id}>{activity.name}</div>
                ))}
            </CardContent>
            <CardFooter>
                {!isEdit ? (
                    <Button onClick={() => setIsEdit(true)}>+</Button>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="activityName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>asd</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="activity"
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
                            <div className="flex">
                                <Button type="submit">Add Activity</Button>
                                <Button onClick={() => setIsEdit(false)}>
                                    x
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardFooter>
        </Card>
    );
};

export default ActivityList;
