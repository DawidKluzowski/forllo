'use client';

import { MdEdit } from 'react-icons/md';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { removeActivity } from '@/lib/Features/boards';

interface ActivityDropdownMenuProps {
    id: string;
}

const ActivityDropdownMenu = ({ id }: ActivityDropdownMenuProps) => {
    const dispatch = useDispatch();

    const onRemoveActivity = (activityId: string) => {
        dispatch(
            removeActivity({
                activityId: activityId,
            })
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className="invisible cursor-pointer text-lg group-hover:visible">
                    <MdEdit />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => onRemoveActivity(id)}>
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActivityDropdownMenu;
