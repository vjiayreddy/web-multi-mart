'use client'
import { Input } from '@/components/ui/input'
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import CategorySidebar from '../categories/CategorySidebar'
import { Button } from '@/components/ui/button'
import { CategoriesGetManyOutput } from '@/modules/categories/types'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface SearchInputProps {
  disable?: boolean
  data: CategoriesGetManyOutput
}

const SearchInput: React.FC<SearchInputProps> = ({ disable, data }) => {
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)

  return (
    <div className="flex items-center gap-2 w-full">
      <CategorySidebar open={isSideBarOpen} data={data} onOpenChange={setIsSideBarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search products" disabled={disable} />
      </div>
      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSideBarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
    </div>
  )
}

export default SearchInput
