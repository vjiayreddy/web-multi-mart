import React from 'react'
import SearchInput from './search-input'
import { CustomeCategory } from '@/lib/types'

interface SearchFiltersProps {
  data: CustomeCategory[]
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ data }) => {
  return <SearchInput disable={true} data={data} />
}

export default SearchFilters
