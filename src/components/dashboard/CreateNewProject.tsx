'use client'

import Button from '../common/Button'
import Input from '../common/Input'
import { Textarea } from '../common/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import { trpc } from '@/trpc/client'
import { cn } from '@/utils/cn'

import { ProjectSchema, ProjectSchemaType } from './validator'

const CreateNewProject = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  const trpcUtils = trpc.useUtils()

  const {
    formState: { errors },
    handleSubmit,
    setError,
    register,
    setValue,
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(ProjectSchema),
  })

  const handleServiceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Sanitize and format the project name using slugify
    const value = slugify(event.target.value, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      locale: 'en',
      trim: false,
    })

    // Update the form value with the sanitized project name
    setValue('name', value, {
      shouldValidate: true,
    })
  }
  const {
    mutate: createProject,
    isPending: isProjectCreationPending,
    isError: isProjectCreationError,
  } = trpc.project?.createProject.useMutation({
    onSuccess: data => {
      console.log('Project Created data', data)
      toast?.success(`Project created successfully`)
      trpcUtils.project.getProjects.invalidate()
      setOpen(false)
    },
    onError: error => {
      if (error.data?.code === 'CONFLICT') {
        setError('name', { message: error.message })
      }
      toast?.error(`Failed to create project: ${error?.message}`)
    },
  })
  const onsubmit = (data: ProjectSchemaType) => {
    createProject({
      description: data?.description,
      name: data?.name,
    })
  }
  return (
    <>
      <Button className={cn(className)} onClick={() => setOpen(true)}>
        Create new site
      </Button>

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
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 text-sm font-medium text-slate-300'>
                  Blog name <span className='text-red-500'>*</span>
                </label>
                <Input
                  className='mt-2'
                  placeholder='Enter your site name'
                  type='text'
                  {...register('name', {
                    onChange: handleServiceNameChange,
                  })}
                />
                {errors.name && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='text-sm font-medium text-slate-300'>
                  Description <span className='text-error'>*</span>
                </label>
                <Textarea
                  className='mt-2'
                  {...register('description')}
                  placeholder='Enter description'
                />
                {errors.description && (
                  <p className='mt-1 text-xs text-error'>
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className='inline-flex w-full justify-end'>
              <Button type='submit' disabled={isProjectCreationPending}>
                {isProjectCreationPending ? 'Creating site ...' : 'Create site'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateNewProject
