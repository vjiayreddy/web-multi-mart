import Categories from '@/components/shared/categories/Categories'
import Footer from '@/components/shared/footer/Footer'
import NavBar from '@/components/shared/navigation/navbar'
import SearchFilters from '@/components/shared/search-filters/SearchFilters'
import { Category } from '@/payload-types'

import config from '@payload-config'
import { getPayload } from 'payload'

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payloadConfig = await config
  const payload = await getPayload({
    config: payloadConfig,
  })
  const data = await payload.find({
    collection: 'categories',
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  })

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Beasuse of "depth:1" we are confident "doc" will be type of "Category"
      ...(doc as Category),
    })),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="px-4 lg:px-12 py-8  flex flex-col gap-4 w-full border-b">
        <SearchFilters data={data} />
        <Categories data={formattedData} />
      </div>

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}
