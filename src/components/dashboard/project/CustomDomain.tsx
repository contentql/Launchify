import { zodResolver } from '@hookform/resolvers/zod'
import { Service } from '@payload-types'
import { Ban, Check, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounceValue } from 'usehooks-ts'

import Button from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import Input from '@/components/common/Input'
import Loading from '@/components/common/Loading'
import { trpc } from '@/trpc/client'

import CopyToClipboard from './CopyToClipboard'
import {
  DomainIntegrationFormDataType,
  DomainIntegrationFormSchema,
} from './validator'

const CustomDomain = ({ service }: { service: Service }) => {
  const [hiddenForm, setHiddenForm] = useState(true)
  const { id, customDomain } = service
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<DomainIntegrationFormDataType>({
    resolver: zodResolver(DomainIntegrationFormSchema),
  })

  const trpcUtils = trpc.useUtils()

  const domain = watch('domain')
  const [debouncedDomain, setDebouncedDomain] = useDebounceValue(domain, 1000)

  const { data: domainsAndValidDomain } =
    trpc.railway.getDomainsAndValidDomain.useQuery({ id })

  const { data: availableCustomDomainData, isLoading: isCheckingAvailability } =
    trpc.cloudflare.checkDomainAvailability.useQuery(
      { domain: debouncedDomain },
      { enabled: !!debouncedDomain },
    )
  const { mutate: updateCustomDomain, isPending } =
    trpc.service.updateCustomDomain.useMutation({
      onSuccess: () => {
        reset()
        trpcUtils.service?.getServiceById.invalidate({ id })
        toast.success(`Custom domain updated successfully`)
      },
      onError: error => {
        toast.error(`${error}`)
      },
    })

  const deleteCustomDomain = () => {
    updateCustomDomain({ id, domain: '' })
  }

  const onsubmit = (data: DomainIntegrationFormDataType) => {
    updateCustomDomain({
      id,
      domain: data?.domain,
    })
  }

  const ValidDomain = () => {
    if (!domain) {
      return null
    }
    if (isCheckingAvailability) {
      return <Loading className='absolute right-2 top-2.5 h-4 w-4' />
    }

    if (availableCustomDomainData?.isAvailable) {
      return (
        <Check size={16} className=' absolute right-2 top-2.5 stroke-success' />
      )
    }

    if (errors) {
      return <Ban size={16} className='absolute right-2 top-2.5 stroke-error' />
    }
  }

  const dnsRecordsStatus = domainsAndValidDomain?.domains?.customDomains
    ?.at(0)
    ?.customDomain?.status?.dnsRecords?.every(
      (dnsRecord: any) => dnsRecord.status === 'DNS_RECORD_STATUS_PROPAGATED',
    )

  return (
    <div className='relative'>
      {customDomain ? (
        <div className='group mt-2 flex w-full items-center justify-between rounded-md border border-base-content/20 px-4 py-2 shadow-lg hover:bg-base-300 '>
          <Link
            className='text-sm font-semibold text-base-content '
            href={`https://${service?.customDomain}` || ''}
            target='_blank'>
            {service?.customDomain}
          </Link>
          <div className='inline-flex items-center gap-x-2'>
            <CopyToClipboard textData={service?.customDomain!} />
            {/* <Trash2
              aria-disabled={isPending}
              onClick={() => deleteCustomDomain()}
              size={14}
              className='hidden cursor-pointer group-hover:block'
            /> */}
            <DeleteCustomDomain
              deleteCustomDomain={deleteCustomDomain}
              isPending={isPending}
            />
            {/* {
              !domainsAndValidDomain?.domains?.customDomains?.at(
                0,
              )?.status?.certificates?.length &&
            } */}

            {!dnsRecordsStatus && (
              <CustomDomainInstructions
                id={service?.id}
                customDomain={domainsAndValidDomain?.domains?.customDomains?.at(
                  0,
                )}
              />
            )}
          </div>
        </div>
      ) : hiddenForm ? (
        <Button
          className='mt-2'
          onClick={() => setHiddenForm(false)}
          size={'sm'}
          variant={'outline'}>
          <Plus size={16} />
          Custom Domain
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className='relative'>
            <Input
              {...register('domain', {
                required: true,
              })}
              type='text'
              id='domain'
              name='domain'
              placeholder='e.g., example.com'
              className='mt-2 w-full border-base-content/20'
            />
            <ValidDomain />
          </div>
          <div className='mt-2 flex items-center justify-end gap-x-2'>
            <Button
              type='submit'
              size={'sm'}
              disabled={
                !domain ||
                isCheckingAvailability ||
                isPending ||
                (availableCustomDomainData &&
                  !availableCustomDomainData.isAvailable)
              }>
              {isPending ? 'Creating...' : ' Create'}
            </Button>
            <Button
              onClick={() => setHiddenForm(true)}
              type='button'
              size={'sm'}
              disabled={isPending}
              variant={'destructive'}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CustomDomain

const CustomDomainInstructions = ({
  customDomain,
  id,
}: {
  customDomain: any
  id: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={'link'}
        size={'sm'}
        className='h-5 p-0 text-xs group-hover:block md:hidden'
        onClick={() => {
          setOpen(true)
        }}>
        View Instructions
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure DNS Records</DialogTitle>
            <DialogDescription>
              To finish setting up your custom domain, add the following DNS
              records to{' '}
              <Link
                href={`https://${customDomain?.domain}`}
                target='_blank'
                className='rounded-md bg-base-200 px-2 py-1 text-primary'>
                {customDomain?.domain}
              </Link>
            </DialogDescription>
          </DialogHeader>
          <div className='overflow-x-auto text-base-content'>
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-y-1'>
                  <h3>Type</h3>
                  <div>CNAME</div>
                </div>
                <div className='flex flex-col gap-y-1 '>
                  <h3>Name</h3>
                  {customDomain?.status?.dnsRecords?.map(
                    (dnsRecord: any, index: number) => (
                      <div key={index}>{dnsRecord?.hostlabel}</div>
                    ),
                  )}
                </div>
                <div className='flex flex-col gap-y-1'>
                  <h3>Value</h3>
                  {customDomain?.status?.dnsRecords?.map(
                    (dnsRecord: any, index: number) => (
                      <div
                        className='relative inline-flex w-full items-center gap-x-2 overflow-hidden '
                        key={index}>
                        <p> {dnsRecord?.requiredValue} </p>
                        <CopyToClipboard
                          hoverHidden={true}
                          key={index}
                          textData={dnsRecord?.requiredValue}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className='text-xs text-base-content/40'>
            DNS changes can take up to 72 hours to propagate worldwide
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}

const DeleteCustomDomain = ({
  deleteCustomDomain,
  isPending,
}: {
  deleteCustomDomain: Function
  isPending: boolean
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trash2
        onClick={() => setOpen(true)}
        size={14}
        className='hidden cursor-pointer group-hover:block'
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete domain</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this domain? This action is
              irreversible and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isPending}
              onClick={() => deleteCustomDomain()}
              size={'sm'}>
              {isPending ? 'Deleting' : 'delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
