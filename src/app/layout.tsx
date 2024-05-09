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
    const { NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY } = process.env;

    return (
        <html lang="en">
            <body className={libreFranklin.className}>
                <ClerkProvider
                    publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
                >
                    <Providers>
                        <Navbar />
                        {children}
                    </Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
