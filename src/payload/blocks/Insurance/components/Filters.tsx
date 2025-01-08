'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InsuranceType } from '@payload-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select'
import { Skeleton } from '@/components/common/Skeleton'
import { trpc } from '@/trpc/client'
import { convertDateRange } from '@/utils/dateRangeFormatter'

import InsuranceCard from './InsuranceCard'
import { InsuranceFilterSchema, InsuranceFilterType } from './validator'

function Filters({ block }: { block: InsuranceType }) {
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<InsuranceFilterType>({
    resolver: zodResolver(InsuranceFilterSchema),
    defaultValues: {
      age: block?.age || 18,
      citizenship: block?.citizenship?.at(0)?.code || 'IN',
      destination: block?.destination?.at(0)?.value || 0,
      endDate: block?.endDate ? new Date(block.endDate) : undefined,
      startDate: block?.startDate ? new Date(block.startDate) : undefined,
    },
  })

  console.log('errors', block)

  const {
    data: insuranceData,
    mutate: getInsuranceDetails,
    isPending: isInsurancePending,
  } = trpc.public.getInsuranceDetails.useMutation({
    onSuccess: () => {
      toast.success(`success`)
    },
    onError: () => {
      toast.error(`error`)
    },
  })

  console.log('Insurance data', insuranceData)
  const onSubmit = (data: InsuranceFilterType) => {
    const traveldates = convertDateRange(data?.startDate, data?.endDate)

    const dataFetched = getInsuranceDetails({
      age: data?.age,
      citizenship: data?.citizenship,
      destination: data?.destination,
      traveldates,
    })
    console.log('dataFetched', dataFetched, traveldates)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-10 flex flex-col items-center gap-2 md:flex-row md:rounded-md md:bg-base-300 md:p-4'>
        <Controller
          name='citizenship'
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Citizenship' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className='text-base-content/40'>
                    Citizenship
                  </SelectLabel>
                  {block?.citizenship?.map((country, index) => (
                    <SelectItem value={country?.code} key={index}>
                      {country?.country}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name='destination'
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={val => field.onChange(Number(val))}
              value={field.value?.toString() || ''}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Destination' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className='text-base-content/40'>
                    Destination
                  </SelectLabel>
                  {block?.destination?.map((location, index) => (
                    <SelectItem value={index.toString()} key={index}>
                      {location?.location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Input
          {...register('age', { valueAsNumber: true })}
          type='number'
          required
          placeholder='Age'
          className={errors.age ? 'border-red-500' : ''}
        />
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <DatePicker
              className='file:text-accent-content focus-visible:ring-offset-primary-focus flex h-10 w-full min-w-44 rounded-md border border-base-content/20 bg-base-200 px-3 py-2 text-sm text-base-content file:text-sm file:font-medium  placeholder:text-base-content/80 focus:border-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
              selected={field.value}
              onChange={field.onChange}
              selectsStart
              startDate={watch('startDate')}
              endDate={watch('endDate')}
              maxDate={watch('endDate')}
              placeholderText='Start Date'
            />
          )}
        />
        <DatePicker
          className='file:text-accent-content focus-visible:ring-offset-primary-focus flex h-10 w-full min-w-44 rounded-md border border-base-content/20 bg-base-200 px-3 py-2 text-sm text-base-content file:text-sm file:font-medium  placeholder:text-base-content/80 focus:border-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
          selected={watch('endDate')}
          onChange={date => setValue('endDate', date!)}
          selectsEnd
          startDate={watch('startDate')}
          endDate={watch('endDate')}
          minDate={watch('startDate')}
          placeholderText='End Date'
        />

        <Button
          className='h-10 w-full'
          type='submit'
          disabled={isInsurancePending}>
          {isInsurancePending ? 'Submitting...' : '  Submit'}
        </Button>
      </form>
      <div className='mt-12'>
        {isInsurancePending ? (
          <div className='z-10 grid grid-cols-1 items-center gap-4 md:grid-cols-2 '>
            <Skeleton className='h-48 w-full' />
            <Skeleton className='h-48 w-full' />
            <Skeleton className='h-48 w-full' />
            <Skeleton className='h-48 w-full' />
          </div>
        ) : insuranceData && !insuranceData?.status ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>
              Invalid data. please choose any other dates
            </AlertDescription>
          </Alert>
        ) : insuranceData &&
          insuranceData?.status &&
          insuranceData?.list?.length <= 0 ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              No insurance policy found. choose any other destination or dates
            </AlertDescription>
          </Alert>
        ) : (
          <div className='z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-2'>
            {insuranceData &&
              insuranceData?.status &&
              insuranceData?.list &&
              insuranceData?.list?.length > 0 &&
              insuranceData?.list?.map((item: any, index: number) => (
                <InsuranceCard item={item} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters
