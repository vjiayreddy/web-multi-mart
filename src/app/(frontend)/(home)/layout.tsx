import { Categories } from '@/components/shared/categories/Categories'
import Footer from '@/components/shared/footer/Footer'
import NavBar from '@/components/shared/navigation/navbar'
import SearchFilters from '@/components/shared/search-filters/SearchFilters'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <div className="px-4 lg:px-12 py-8  flex flex-col gap-4 w-full border-b">
              <SearchFilters disable={true} />
              <div className="hidden: lg:block">
                <div className="h-10"></div>
              </div>
            </div>
          }
        >
          <div className="px-4 lg:px-12 py-8  flex flex-col gap-4 w-full border-b">
            <SearchFilters />
            <div className="hidden lg:block">
              <Categories />
            </div>
          </div>
        </Suspense>
      </HydrationBoundary>

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}
