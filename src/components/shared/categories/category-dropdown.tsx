'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'
import { useDropdownPosition } from './use-dropdown-position'
import SubcategoryMenu from './SubcategoryMenu'
import Link from 'next/link'
import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface CategoryDropDownProps {
  category: CategoriesGetManyOutput[1]
  isActive?: boolean
  isNavigationHovered?: boolean
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({
  category,
  isActive,
  isNavigationHovered,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropDownPosition } = useDropdownPosition(dropdownRef)
  const dropDownPosition = getDropDownPosition()
  const onMouseLeave = () => {
    setIsOpen(false)
  }

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
            isActive && !isNavigationHovered && 'bg-white border-primary',
            isOpen &&
              'bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px]  -translate-y-[4px] translate-all',
          )}
        >
          <Link href={`/${category.slug === 'all' ? '' : category.slug}`}>{category.name}</Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent  border-b-black left-1/2 -traslate-x-1/2',
              isOpen && 'opacity-100',
            )}
          ></div>
        )}
      </div>
      <SubcategoryMenu isOpen={isOpen} category={category} position={dropDownPosition} />
    </div>
  )
}

export default CategoryDropDown
