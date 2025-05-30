'use client'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'
import React from 'react'

// import config from '@/payload.config'

export default function HomePage() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.auth.session.queryOptions())

  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })
  return (
    <div>
      {data?.user && (
        <>
          <p>Login Session</p>
          <p>Email : {data?.user?.email}</p>
        </>
      )}
    </div>
  )
}
