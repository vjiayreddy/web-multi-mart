import React from 'react'
import './styles.css'

export const metadata = {
  description: "we're more than an e-commerce store",
  title: 'Multi Mart',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}
