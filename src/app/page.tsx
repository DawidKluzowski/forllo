'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const DUMMY_TABLES: Table[] = [
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
]

interface Activity {
    id: string
    name: string
    description: string
}

interface Table {
    id: string
    name: string
    activities: Activity[]
}

export default function Home() {
    const [tables, setTables] = useState<Table[]>(DUMMY_TABLES)

    const addTable = () => {
        const newTable: Table = {
            id: uuidv4(),
            name: 'new table',
            activities: [],
        }
        setTables((prev) => [...prev, newTable])
    }

    const removeTable = (id: string) => {
        setTables(tables.filter((table) => table.id !== id))
    }

    return (
        <main className="flex min-h-screen flex-col gap-5 p-24">
            <div className="flex gap-8 bg-fuchsia-400">
                {tables.map((table) => (
                    <div className=" bg-green-600" key={table.id}>
                        <span>{table.name}</span>
                        <Button onClick={() => removeTable(table.id)}>
                            RM
                        </Button>
                        <div className="bg-sky-600">
                            {table.activities.map((activity) => (
                                <div key={activity.id}>{activity.name}</div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className=" bg-green-600">
                    <Button onClick={addTable}>asd</Button>
                </div>
            </div>
        </main>
    )
}
