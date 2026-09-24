import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/app/providers'
import Footer from '@/app/components/footer/Footer'
import Navigation from '@/app/components/navigation/Navigation'

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
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased flex justify-center`}
        >
            <body className="min-h-full flex flex-col bg-zinc-700 text-zinc-100 w-full items-center">
                <Providers>
                    <Navigation />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
