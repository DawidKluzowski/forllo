'use client';
import { Activity } from '@/types';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import ActivityDropdownMenu from './ActivityDropdownMenu';
import RichTextEditor from '../TextEditorComponent';

interface ActivityItemProps {
    activity: Activity;
    name: string;
}

const ActivityItem = ({ activity, name }: ActivityItemProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    className="group mb-2 flex w-full justify-between rounded-lg p-2 text-sm"
                >
                    <p className="text-xs">{activity.name}</p>
                    <ActivityDropdownMenu id={activity.id} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5">
                        <p>{activity.name}</p>
                        <p className="text-sm font-medium">
                            <span>on list&nbsp;</span>
                            <span>{name}</span>
                        </p>
                    </DialogTitle>
                    <div className="mb-5 flex items-center justify-between">
                        <DialogTitle>Desciption:</DialogTitle>
                    </div>
                    <RichTextEditor activity={activity} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityItem;
