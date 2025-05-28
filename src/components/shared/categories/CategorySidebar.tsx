import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface CategorySidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: CategoriesGetManyOutput
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ open, onOpenChange, data }) => {
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<CategoriesGetManyOutput[1] | null>(
    null,
  )
  const currentCategories = parentCategories ?? data ?? []
  const backgroundColor = selectedCategories?.color || 'white'
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    setSelectedCategories(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategories(category)
    } else {
      if (parentCategories && selectedCategories) {
        router.push(`/${selectedCategories.slug}/${category.slug}`)
      } else {
        if (category.slug === 'all') {
          router.push('/')
        } else {
          router.push(`/${category.slug}`)
        }
      }
      handleOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor,
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {
                if (parentCategories) {
                  setParentCategories(null)
                  setSelectedCategories(null)
                }
              }}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default CategorySidebar
