'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import NavBarSideBar from './navbar-sidebar'
import { MenuIcon } from 'lucide-react'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

const navbarItems = [
  {
    href: '/',
    children: 'Home',
  },
  {
    href: '/about',
    children: 'About',
  },
  {
    href: '/features',
    children: 'Features',
  },
  {
    href: '/pricing',
    children: 'Pricing',
  },
  {
    href: '/contact',
    children: 'Contact',
  },
]

interface NavbarItemsProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavItem: React.FC<NavbarItemsProps> = ({ href, children, isActive }) => {
  return (
    <Button
      variant="outline"
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg ',
        isActive && 'bg-black text-white hover:bg-black hover:text-white',
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

const NavBar = () => {
  const pathName = usePathname()
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  return (
    <nav className="h-20 flex border-b justify-between items-center font-medium bg-white">
      <Link href="/" className="pl-6">
        <span className={cn('text-3xl font-bold', poppins.className)}>Shopbuzz</span>
      </Link>
      <NavBarSideBar
        items={navbarItems}
        open={isSideBarOpen}
        onOpenChange={() => {
          setIsSideBarOpen(!isSideBarOpen)
        }}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((navItem) => (
          <NavItem key={navItem.href} href={navItem.href} isActive={pathName === navItem.href}>
            {navItem.children}
          </NavItem>
        ))}
      </div>
      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            variant="secondary"
            className="border-l border-t-0 border-r-0 px-12 h-20 rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link href="/admin">Dashbboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            variant="secondary"
            className="border-l border-t-0 border-r-0 px-12 h-20 rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link prefetch href="/sign-in">
              Login
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="border-l border-t-0 border-r-0 px-12 h-20 rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link prefetch href="/sign-up">
              Start Selling
            </Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSideBarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
