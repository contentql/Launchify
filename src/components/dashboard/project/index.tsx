'use client'

import { Service } from '@payload-types'
import { DatabaseZap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Container from '@/components/common/Container'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/common/Sheet'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/Tabs'
import { trpc } from '@/trpc/client'

import Services from './Services'
import Variables from './Variables'

const ProjectDetailsView = ({ slug }: { slug: any }) => {
  const [open, setOpen] = useState(slug?.length > 1)
  const router = useRouter()

  const {
    data,
    isLoading: isServicesLoading,
    isFetching,
  } = trpc.service.getServicesByProjectId.useQuery({
    id: slug?.at(0),
  })

  const { data: service, isLoading: isServiceLoading } =
    trpc?.service.getServiceById.useQuery({
      id: slug?.at(-1),
    })
  return (
    <Container className='relative'>
      <Services
        open={open}
        services={data?.services as Service[]}
        setOpen={setOpen}
        slug={slug}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          onEscapeKeyDown={event => event.preventDefault()}
          onCloseAutoFocus={() =>
            router?.replace(`/dashboard/project/${slug?.at(0)}`)
          }
          onInteractOutside={() =>
            router?.replace(`/dashboard/project/${slug?.at(0)}`)
          }
          className='hide-scroll-bar min-w-[100%] overflow-scroll md:min-w-[64%] lg:min-w-[66%] xl:min-w-[66%]'>
          <SheetHeader>
            <SheetTitle className='inline-flex items-center gap-x-2'>
              <DatabaseZap size={20} />
              <span> Mysql Database</span>
            </SheetTitle>
          </SheetHeader>
          <Tabs defaultValue='details' className='pt-6'>
            <div className='relative'>
              <TabsList className=' bg-base-300'>
                <TabsTrigger
                  className='data-[state=active]:rounded-md data-[state=active]:bg-base-200'
                  value='details'>
                  Details
                </TabsTrigger>
                <TabsTrigger
                  className='data-[state=active]:rounded-md data-[state=active]:bg-base-200'
                  value='variables'>
                  Variables
                </TabsTrigger>
                <TabsTrigger
                  className='data-[state=active]:rounded-md data-[state=active]:bg-base-200'
                  value='settings'>
                  Settings
                </TabsTrigger>
              </TabsList>
              <div className='w-full border-b border-base-content/40 pt-2' />
            </div>
            <TabsContent className='h-[100%] w-full' value='details'>
              <iframe
                className='h-[100%] w-[100%] rounded-md shadow-xl'
                src={''}
                allowFullScreen></iframe>
            </TabsContent>
            <TabsContent className='h-[100%] w-full' value='variables'>
              <Variables
                variables={
                  service?.variables as { key: string; value: string }[]
                }
              />
            </TabsContent>
            <TabsContent className='h-[100%] w-full' value='mobile'>
              <iframe
                className='mx-auto h-[100%] w-full rounded-md shadow-xl md:w-[400px]'
                src={''}
                allowFullScreen></iframe>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </Container>
  )
}

export default ProjectDetailsView
