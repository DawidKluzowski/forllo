'use client';

import ActivityList from '@/components/ActivityList';
import { Button } from '@/components/ui/button';
import { AcivitiesList } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    addActivityList,
    removeActivityList,
} from './GlobalRedux/Features/activity';
import { RootState } from './GlobalRedux/store';

export default function Home() {
    const activitysLists = useSelector(
        (state: RootState) => state.acvivitiesLists
    );
    const dispatch = useDispatch();

    const removeTable = (id: string) => {
        dispatch(removeActivityList(id));
    };

    const addTable = () => {
        const newTable: AcivitiesList = {
            id: uuidv4(),
            name: 'new table',
            activities: [],
        };
        dispatch(addActivityList(newTable));
    };

    return (
        <main className=" min-w-screen min-h-screen ">
            <div className="flex flex-nowrap gap-8 overflow-auto whitespace-nowrap bg-fuchsia-400 ">
                {activitysLists.map((activity) => {
                    return (
                        <ActivityList
                            removeTable={() => removeTable(activity.id)}
                            key={activity.id}
                            activitiesList={activity}
                        />
                    );
                })}
                <div className=" bg-green-600">
                    <Button onClick={addTable}>Add Table</Button>
                </div>
            </div>
        </main>
    );
}
