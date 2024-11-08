'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import Input from '../common/Input'
import Loading from '../common/Loading'
import { Textarea } from '../common/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Project } from '@payload-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
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

import List from './List'
import { ProjectSchema, ProjectSchemaType } from './validator'

const DashboardView = () => {
  const [open, setOpen] = useState(false)

  const { ref, inView } = useInView({
    threshold: 1,
  })

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
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    status,
    refetch,
  } = trpc.project.getProjects.useInfiniteQuery(
    {
      limit: 12,
    },
    {
      getNextPageParam: lastPage => lastPage.meta.nextCursor,
    },
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  const allProjects = projects?.pages?.map(page => page?.projects).flat()

  const { mutate: getLatestProject } =
    trpc?.project?.getLatestProject?.useMutation()

  const {
    mutate: createProject,
    isPending: isProjectCreationPending,
    isError: isProjectCreationError,
  } = trpc.project?.createProject.useMutation({
    onSuccess: data => {
      console.log('Project Created data', data)
      getLatestProject({
        id: data?.id,
      })

      let count = 0
      const intervalId = setInterval(() => {
        if (count < 5) {
          getLatestProject({
            id: data?.id,
          })
          count++
        } else {
          clearInterval(intervalId) // Stop the interval after 5 iterations
        }
      }, 10000) // 10 seconds

      toast?.success(`Project created successfully`)
      refetch()

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
    <Container>
      <div className='relative space-y-4 px-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-left text-2xl font-bold'>Your blog sites</h2>
          <Button onClick={() => setOpen(true)}>Create new site</Button>
        </div>
        <List projects={allProjects as Project[]} />
        <div className='mt-4 w-full' ref={ref}>
          {isFetchingNextPage && (
            <div className=' inset-0 flex w-full items-center justify-center'>
              <Loading />
            </div>
          )}
        </div>
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
                  {isProjectCreationPending
                    ? 'Creating site ...'
                    : 'Create site'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  )
}

export default DashboardView
