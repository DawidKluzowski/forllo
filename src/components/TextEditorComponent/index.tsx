'use client';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Strikethrough, Italic, List, ListOrdered } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Toggle } from '../ui/toggle';
import { Separator } from '../ui/separator';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '../ui/form';
import { useDispatch } from 'react-redux';
import { Activity } from '@/types';
import { IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';
import { useEffect, useRef, useState } from 'react';
import { changeActivityDescription } from '@/lib/Features/boards';
import { useClickOutsideElementHandler } from '@/hooks';

interface RichTextEditorProps {
    activity: Activity;
}

const RichTextEditor = ({ activity }: RichTextEditorProps) => {
    const [editable, setEditable] = useState(false);
    const textEditorRef =
        useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>;
    const form = useForm();
    const dispatch = useDispatch();
    const editor = useEditor({
        editable,
        editorProps: {
            attributes: {
                class: 'min-h-[80px] max-h-[180px] w-full rounded-md border border-input bg-transparent px-3 py-2 mb-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
            },
        },
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-4',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-4',
                    },
                },
            }),
        ],
    });
    useClickOutsideElementHandler(textEditorRef, setEditable);

    const onSubmit = () => {
        const activityDescription = editor?.getJSON();
        dispatch(
            changeActivityDescription({
                activityId: activity.id,
                activityDescription: activityDescription,
            })
        );
        setEditable(false);
        form.reset();
    };

    const onEditDescriptionCancel = () => {
        setEditable(false);
        form.reset();
    };

    useEffect(() => {
        if (!editor) {
            return undefined;
        }

        editor.setEditable(editable);
    }, [editor, editable]);

    if (!editor) {
        return null;
    }

    return (
        <>
            {editor ? <RichTextEditorToolbar editor={editor} /> : null}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="activityDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl
                                    ref={textEditorRef}
                                    onClick={() => setEditable(true)}
                                >
                                    <EditorContent editor={editor} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center">
                        <Button className="mr-4" type="submit">
                            Add Activity
                        </Button>
                        <a
                            className="cursor-pointer text-xl"
                            onClick={onEditDescriptionCancel}
                        >
                            <IoClose />
                        </a>
                    </div>
                </form>
            </Form>
        </>
    );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
    return (
        <div className="flex flex-row items-center gap-1 rounded-bl-md rounded-br-md border border-input bg-transparent p-1">
            <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                }
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" className="h-8 w-[1px]" />
            <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
        </div>
    );
};

export default RichTextEditor;
