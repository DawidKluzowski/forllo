'use client';

import type { Metadata } from 'next';
import { Libre_Franklin } from 'next/font/google';
import { Providers } from './StoreProvider';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const libreFranklin = Libre_Franklin({
    subsets: ['latin'],
    variable: '--font-franklin',
});

// export const metadata: Metadata = {
//     title: 'Forllo',
//     description: 'like trello but one more',
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={libreFranklin.className}>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
