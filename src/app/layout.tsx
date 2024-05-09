'use client';

import { Libre_Franklin } from 'next/font/google';
import { Providers } from './StoreProvider';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const libreFranklin = Libre_Franklin({
    subsets: ['latin'],
    variable: '--font-franklin',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY } = process.env;

    return (
        <html lang="en">
            <body className={libreFranklin.className}>
                <ClerkProvider
                    publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
                >
                    <Providers>
                        <DndProvider backend={HTML5Backend}>
                            <Navbar />
                            {children}
                        </DndProvider>
                    </Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
