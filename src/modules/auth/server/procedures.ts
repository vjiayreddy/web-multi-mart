import z from 'zod'
import { headers as getHeaders } from 'next/headers'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { loginSchema, registredSchema } from '../schemas'
import { generateAuthCookies } from '../utils'

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()
    const session = await ctx.payload.auth({ headers })
    return session
  }),
  register: baseProcedure.input(registredSchema).mutation(async ({ input, ctx }) => {
    const existingData = await ctx.payload.find({
      collection: 'users',
      limit: 1,
      where: {
        username: {
          equals: input.username,
        },
      },
    })

    const existingUser = existingData.docs[0]

    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Username already taken',
      })
    }

    await ctx.payload.create({
      collection: 'users',
      data: {
        email: input.email,
        username: input.username,
        password: input.password,
      },
    })
    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })
    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Faild to login',
      })
    }
    await generateAuthCookies({
      prefix: ctx.payload.config.cookiePrefix,
      value: data.token,
    })
  }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })
    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Faild to login',
      })
    }
    await generateAuthCookies({
      prefix: ctx.payload.config.cookiePrefix,
      value: data.token,
    })
    return data
  }),
})
