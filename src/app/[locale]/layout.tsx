import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/utils'
import { AppConfig } from '@/utils/AppConfig'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: {
        template: `${AppConfig.name} | %s`,
        default: AppConfig.name,
    },
    icons: [
        {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
        {
            rel: 'icon',
            url: '/favicon.ico',
        },
    ],
}

export function generateStaticParams() {
    return AppConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout(props: {
    children: React.ReactNode
    params: { locale: string }
}) {
    unstable_setRequestLocale(props.params.locale)

    // Using internationalization in Client Components
    const messages = useMessages()

    return (
        <html lang={props.params.locale}>
            <body
                className={cn(
                    'min-h-dvh bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider
                        locale={props.params.locale}
                        messages={messages}
                    >
                        {props.children}
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
