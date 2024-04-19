'use client';
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export const useClickOutsideElementHandler = (
    elementRef: MutableRefObject<HTMLInputElement>,
    setIsElementEnabled: Dispatch<SetStateAction<boolean>>
) => {
    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            const elementClicked = elementRef?.current?.contains(
                evt.target as HTMLElement
            );

            if (!elementClicked) {
                setIsElementEnabled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
};
