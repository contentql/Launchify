'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Service } from '@payload-types'
import { Box, SquarePen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import Input from '@/components/common/Input'
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

import Details from './Details'
import Services from './Services'
import Variables from './Variables'
import { EditServiceSchemaType, EditServiceScheme } from './validator'

const ProjectDetailsView = ({ slug }: { slug: any }) => {
  const [open, setOpen] = useState(slug?.length > 1)
  const router = useRouter()
  const trpcUtils = trpc.useUtils()

  const [ediServiceName, setEditServiceName] = useState(false)

  const {
    register,
    getValues,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditServiceSchemaType>({
    resolver: zodResolver(EditServiceScheme),
  })

  const {
    data,
    isLoading: isServicesLoading,
    isFetching,
    refetch,
  } = trpc.service.getServicesByProjectId.useQuery({
    id: slug?.at(0),
  })

  const { data: service, isLoading: isServiceLoading } =
    trpc?.service.getServiceById.useQuery(
      {
        id: slug?.at(-1),
      },
      { enabled: open },
    )

  const { mutate: updateServiceName, isPending } =
    trpc.service.updateServiceName.useMutation({
      onSuccess: () => {
        toast.success(`Service name updated successfully`)
        setEditServiceName(false)
        refetch()
        reset()
      },
      onError: error => {
        toast.error(
          `${error?.message ? error?.message : 'Error while updating service name'}`,
        )
      },
    })

  const onsubmit = (data: EditServiceSchemaType) => {
    console.log('data', data)
    updateServiceName({
      id: service?.id,
      serviceName: data.serviceName,
    })
  }

  return (
    <Container className='relative'>
      <Services
        open={open}
        services={data?.services as Service[]}
        setOpen={setOpen}
        slug={slug}
        isServicesLoading={isServicesLoading}
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
          className='hide-scroll-bar min-w-[100%] overflow-scroll pb-24 md:min-w-[64%] lg:min-w-[66%] xl:min-w-[66%]'>
          <SheetHeader>
            <SheetTitle className='inline-flex items-center gap-x-2'>
              {service?.icon ? (
                <Image
                  src={service?.icon || ''}
                  alt=''
                  width={20}
                  height={20}
                />
              ) : (
                <Box className='text-base-content/80' size={20} />
              )}

              <div
                onClick={() => setEditServiceName(true)}
                className='group inline-flex cursor-pointer items-center gap-x-2 rounded-md px-2 py-1 hover:bg-base-300 '>
                {service?.serviceName}
                <SquarePen className='hidden group-hover:block' size={16} />
              </div>
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
              </TabsList>
              <div className='w-full border-b border-base-content/40 pt-2' />
            </div>
            <TabsContent className='h-[100%] w-full' value='details'>
              <Details service={service as Service} />
            </TabsContent>
            <TabsContent className='h-[100%] w-full' value='variables'>
              <Variables
                variables={
                  service?.variables as { key: string; value: string }[]
                }
                id={service?.id as string}
              />
            </TabsContent>
          </Tabs>
          <Dialog modal open={ediServiceName} onOpenChange={setEditServiceName}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update service name</DialogTitle>
                <DialogDescription>
                  Do you want to change the service name.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onsubmit)}>
                <Input
                  id='serviceName'
                  {...register('serviceName')}
                  placeholder={service?.serviceName || 'Enter service name'}
                  // className='h-8 w-2/3 md:w-1/3'
                  type='text'
                />
                <DialogFooter>
                  <Button type='submit' className='mt-4' size='sm'>
                    {isPending ? 'Updating' : 'Update'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </SheetContent>
      </Sheet>
    </Container>
  )
}

export default ProjectDetailsView
