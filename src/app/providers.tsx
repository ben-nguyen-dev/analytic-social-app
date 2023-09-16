'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [client] = React.useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <NextUIProvider>
        <NextThemesProvider {...themeProps}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
