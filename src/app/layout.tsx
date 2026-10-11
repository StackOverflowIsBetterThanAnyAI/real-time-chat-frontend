import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { Providers } from '@/app/providers'
import { Footer } from '@/app/components/footer'
import { Navigation } from '@/app/components/navigation'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Dieter Chat',
    description: 'Real-Time Dieter Chat Web Application',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="h-dvh flex flex-col overflow-hidden bg-zinc-700 text-zinc-100 w-full">
                <Providers>
                    <Navigation />
                    <div className="flex-1 min-h-0 w-full">{children}</div>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
