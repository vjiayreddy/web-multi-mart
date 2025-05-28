'use client'
import React from 'react'
import SearchInput from './search-input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

interface SearchFiltersProps {
  disable?: boolean
}

const SearchFilters = ({ disable }: SearchFiltersProps) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())
  return <SearchInput disable={disable} data={data} />
}

export default SearchFilters
