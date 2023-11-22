export interface Activity {
    id: string;
    name: string;
    description: string;
}

export interface AcivitiesList {
    id: string;
    name: string;
    activities: Activity[];
}
