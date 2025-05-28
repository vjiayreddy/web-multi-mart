'use client'
import { useTRPC } from '@/trpc/client'
//import { getQueryClient, trpc } from '@/trpc/server'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AboutPage = () => {
  //const queryClient = getQueryClient()
  //const categories = await queryClient.fetchQuery(trpc.categories.getMany.queryOptions())
  const trpc = useTRPC()
  const categories = useQuery(trpc.categories.getMany.queryOptions())
  return (
    <div>
      <p>Is Loading :{categories.isLoading}</p>
      {JSON.stringify(categories.data)}
    </div>
  )
}

export default AboutPage
