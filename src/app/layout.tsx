'use client';

import { Libre_Franklin } from 'next/font/google';
import { Providers } from './StoreProvider';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

const libreFranklin = Libre_Franklin({
    subsets: ['latin'],
    variable: '--font-franklin',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={libreFranklin.className}>
                <ClerkProvider>
                    <Providers>
                        <Navbar />
                        {children}
                    </Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
