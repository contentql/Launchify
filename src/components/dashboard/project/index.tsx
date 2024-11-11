'use client'

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

import Services from './Services'

const ProjectDetailsView = ({ slug }: { slug: any }) => {
  const [open, setOpen] = useState(slug?.length > 1)
  const router = useRouter()
  return (
    <Container className='relative'>
      <Services setOpen={setOpen} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          onEscapeKeyDown={event => event.preventDefault()}
          onCloseAutoFocus={() => router?.replace('/dashboard/project/i')}
          onInteractOutside={() => router?.replace('/dashboard/project/i')}
          className='hide-scroll-bar min-w-[70%] overflow-scroll'>
          <SheetHeader>
            <SheetTitle className='inline-flex items-center gap-x-2'>
              <DatabaseZap size={20} />
              <span> Mysql Database</span>
            </SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you`re done.
            </SheetDescription> */}
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
              <iframe
                className='mx-auto h-[100%] w-full rounded-md shadow-xl md:w-[800px]'
                src={''}
                allowFullScreen></iframe>
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
