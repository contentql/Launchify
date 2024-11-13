import { zodResolver } from '@hookform/resolvers/zod'
import { Service } from '@payload-types'
import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
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
    formState: { errors },
  } = useForm<DomainIntegrationFormDataType>({
    resolver: zodResolver(DomainIntegrationFormSchema),
  })

  const trpcUtils = trpc.useUtils()

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
            <Trash2
              aria-disabled={isPending}
              onClick={() => deleteCustomDomain()}
              size={14}
              className='hidden cursor-pointer group-hover:block'
            />
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
          <div className='mt-2 flex items-center justify-end gap-x-2'>
            <Button type='submit' size={'sm'} disabled={isPending}>
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
