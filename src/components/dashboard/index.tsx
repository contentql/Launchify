'use client'

import Button from '../common/Button'
import Input from '../common/Input'
import { Textarea } from '../common/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import { trpc } from '@/trpc/client'

import List from './List'

const schema = z.object({
  name: z.string(),
  description: z.string(),
})

type ProjectData = z.infer<typeof schema>

const DashboardView = () => {
  const [open, setOpen] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProjectData>({
    resolver: zodResolver(schema),
  })

  const { mutate: createProject } = trpc.project?.createProject.useMutation({
    onSuccess: () => {
      toast?.success(`project created successfully`)
    },
    onError: () => {
      toast?.error(`failed to create project`)
    },
  })
  const onsubmit = (data: ProjectData) => {
    console.log('data', data)
    createProject({
      description: data?.description,
      name: data?.name,
    })
  }
  return (
    <div className='relative space-y-4 px-2'>
      <div className='flex items-center justify-between'>
        <h2 className='text-left text-2xl font-bold'>Your blog sites</h2>
        <Button onClick={() => setOpen(true)}>Create new site</Button>
      </div>
      <List />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new blog site</DialogTitle>
            <DialogDescription>
              Pick your blog site address such as <strong>my-blog </strong>{' '}
              which will be used to access your blog. You will receive a free{' '}
              <strong>.contentql.blog</strong> domain which you can later
              redirect to your own domain if you have one.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onsubmit)}
            className='mt-6 flex flex-col gap-y-5'>
            <div>
              <label
                htmlFor='name'
                className='mb-2 text-sm font-medium text-slate-300'>
                Blog name <span className='text-red-500'>*</span>
              </label>
              <Input
                className='mb-4'
                placeholder='Enter your site name'
                type='text'
                {...register('name')}
                required
              />
              <label
                htmlFor='description'
                className='mb-2 text-sm font-medium text-slate-300'>
                Description <span className='text-red-500'>*</span>
              </label>
              <Textarea
                {...register('description')}
                placeholder='Enter description'
                required
              />
            </div>
            <div className='inline-flex w-full justify-end'>
              <Button type='submit'>Create site</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashboardView
