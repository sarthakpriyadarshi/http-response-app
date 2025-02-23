import type React from "react"
import { Toaster } from "sonner"
import { Providers } from "@/components/ui/provider"
import '@/app/globals.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "HTTP Response Analyzer",
    description: "Analyze HTTP responses at warp speed",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
            {children}
            <Toaster richColors closeButton />
        </Providers>
        </body>
        </html>
    )
}

