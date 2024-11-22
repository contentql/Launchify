'use client'

import Container from '../common/Container'
import Loading from '../common/Loading'
import { Project, SiteSetting } from '@payload-types'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { trpc } from '@/trpc/client'

import CreateNewProject from './CreateNewProject'
import List from './List'

const DashboardView = ({ metadata }: { metadata: SiteSetting }) => {
  const { ref, inView } = useInView({
    threshold: 1,
  })

  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
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
  console.log('all projects', allProjects)
  const isProjectsEmpty = projects?.pages?.at(0)?.projects?.length === 0

  return (
    <Container>
      <div className='relative space-y-4 px-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-left text-2xl font-bold'>Your blog sites</h2>
          <CreateNewProject metadata={metadata} />
        </div>
        <List
          projects={allProjects as Project[]}
          isLoading={isLoading}
          isProjectsEmpty={isProjectsEmpty}
        />
        <div className='mt-4 w-full' ref={ref}>
          {isFetchingNextPage && (
            <div className=' inset-0 flex w-full items-center justify-center'>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default DashboardView
