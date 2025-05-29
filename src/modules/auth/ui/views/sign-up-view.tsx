'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { registredSchema } from '../../schemas'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SignUpView = () => {
  const router = useRouter()
  const trpc = useTRPC()
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        router.push('/')
      },
    }),
  )

  const form = useForm<z.infer<typeof registredSchema>>({
    resolver: zodResolver(registredSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registredSchema>) => {
    register.mutate(values)
  }

  const username = form.watch('username')
  const usernameErrors = form.formState.errors.username
  const showPreview = username && !usernameErrors

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form className="flex flex-col gap-8 p-4 lg:p-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span className={cn('text-2xl font-semibold')}>Shopbuzz</span>
              </Link>
              <Button asChild variant="ghost" size="sm" className="text-base border-none underline">
                <Link prefetch href="/sign-in">
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1,580 creators earning money on shopbuzz
            </h1>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={cn('hidden', showPreview && 'block')}>
                    Your store will be available at &nbsp;
                    <strong>{username}</strong>.shopbuzz.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={register.isPending}
              type="submit"
              size="lg"
              variant="elevated"
              className="bg-black text-white hover:bg-pink-400 hover:text-white"
            >
              Create account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  )
}

export default SignUpView
