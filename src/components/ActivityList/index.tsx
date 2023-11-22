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

interface ActivityListProps {
    activitiesList: AcivitiesList;
    removeTable: () => void;
}

const ActivityList = ({
    activitiesList: table,
    removeTable,
}: ActivityListProps) => {
    const [isEdit, setIsEdit] = useState(false);

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
                    <div className="flex flex-col">
                        <Input />
                        <div className="flex">
                            <Button>Add Activity</Button>
                            <Button onClick={() => setIsEdit(false)}>x</Button>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default ActivityList;
