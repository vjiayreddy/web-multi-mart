import React from 'react'
import SearchInput from './search-input'

interface SearchFiltersProps {
  data: any
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ data }) => {
  return <SearchInput disable={true} />
}

export default SearchFilters
