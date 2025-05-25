//import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollArea } from '@/components/ui/scroll-area'
import { SheetTitle, Sheet, SheetHeader, SheetContent } from '@/components/ui/sheet'
import React from 'react'
import Link from 'next/link'

interface NavbarItem {
  href: string
  children: React.ReactNode
}

interface Props {
  items: NavbarItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NavBarSideBar: React.FC<Props> = ({ items, open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items?.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              onClick={() => onOpenChange(false)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-in"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign In
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-in"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default NavBarSideBar
