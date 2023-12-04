export interface Activity {
    id: string;
    name: string;
    description: string;
}

export interface Boards {
    id: string;
    name: string;
    activities: Activity[];
}
