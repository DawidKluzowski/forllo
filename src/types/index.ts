'use client';
import { JSONContent } from '@tiptap/react';

export interface Activity {
    id: string;
    name: string;
    description: JSONContent | undefined;
}

export interface Boards {
    id: string;
    name: string;
    activities: Activity[];
}
