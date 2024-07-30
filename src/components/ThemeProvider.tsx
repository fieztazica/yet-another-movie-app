'use client'

import { Provider } from 'jotai'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <Provider>
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </Provider>
    )
}
