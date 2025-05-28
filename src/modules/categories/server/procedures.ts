import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { Category } from '@/payload-types'

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: 'categories',
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    })
    const formattedData = categories.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Beasuse of "depth:1" we are confident "doc" will be type of "Category"
        ...(doc as Category),
      })),
    }))
    return formattedData
  }),
})
