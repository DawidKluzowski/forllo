'use client';

import ActivityList from '@/components/ActivityList';
import { Button } from '@/components/ui/button';
import { AcivitiesList } from '@/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DUMMY_Activities: AcivitiesList[] = [
    {
        id: uuidv4(),
        name: 'todo',
        activities: [
            { id: uuidv4(), description: 'aasdasdasd', name: 'qewqweqweqwe' },
        ],
    },
    {
        id: uuidv4(),
        name: 'active',
        activities: [
            { id: uuidv4(), description: 'aasdasdasd', name: 'qewqweqweqwe' },
            { id: uuidv4(), description: 'jfjfjjfjf', name: 'ueuueueuueue' },
        ],
    },
    {
        id: uuidv4(),
        name: 'done',
        activities: [
            { id: uuidv4(), description: 'aasdasdasd', name: 'qewqweqweqwe' },
        ],
    },
];

export default function Home() {
    const [tables, setTables] = useState<AcivitiesList[]>(DUMMY_Activities);

    const removeTable = (id: string) => {
        setTables(tables.filter((table) => table.id !== id));
    };

    const addTable = () => {
        const newTable: AcivitiesList = {
            id: uuidv4(),
            name: 'new table',
            activities: [],
        };
        setTables((prev) => [...prev, newTable]);
    };

    return (
        <main className="flex min-h-screen flex-col gap-5 p-24">
            <div className="flex gap-8 bg-fuchsia-400">
                {tables.map((table) => {
                    return (
                        <ActivityList
                            removeTable={() => removeTable(table.id)}
                            key={table.id}
                            activitiesList={table}
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
