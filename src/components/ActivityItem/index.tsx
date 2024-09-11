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
import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ActivityItemProps {
    activity: Activity;
    name: string;
}

const ActivityItem = ({ activity, name }: ActivityItemProps) => {
    // const { attributes, listeners, setNodeRef, transform } = useDraggable({
    //     id: activity.id,
    // });
    // const style = transform
    //     ? {
    //           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    //       }
    //     : undefined;

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: activity.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
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
        </div>
    );
};

export default ActivityItem;
