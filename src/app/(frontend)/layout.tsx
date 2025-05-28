import React from 'react'
import './styles.css'
import { TRPCReactProvider } from '@/trpc/client'

export const metadata = {
  description: "we're more than an e-commerce store",
  title: 'Multi Mart',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
