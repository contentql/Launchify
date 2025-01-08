import Button from '@/components/common/Button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select'

const InsuranceCard = ({ item }: { item: any }) => {
  return (
    <div className='card group relative flex h-auto w-full flex-col items-start gap-y-2 rounded-md bg-base-200 p-4  shadow-lg transition-all duration-300 hover:border-none '>
      <div className='inline-flex items-center gap-x-4'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item?.img_path}
          alt=''
          width={60}
          height={60}
          className='size-12 rounded-full'
        />
        <div>
          <h2 className='text-lg font-semibold'>{item?.product_name}</h2>
          <p className='text-sm text-base-content/80'>By: {item?.by}</p>
        </div>
      </div>
      <div className='space-y-2 pt-4'>
        <h2 className='text-lg font-semibold'>Key Points</h2>
        <ul className='list-disc pl-6 text-sm text-base-content/80 '>
          {item?.key_points &&
            Object.values(item.key_points) // Convert object values to an array
              .filter((point: any) => point.trim() !== '') // Filter out empty strings
              .map((point: any, index: number) => {
                return (
                  <li className=' list-disc' key={index}>
                    {point}
                  </li>
                )
              })}
        </ul>
      </div>
      <div className='inline-flex w-full items-center justify-center gap-x-2'>
        <Select
          defaultValue={
            item?.deduction_default !== undefined &&
            item?.deduction_default !== null
              ? item?.deduction_default
              : ''
          }>
          <SelectTrigger className='mt-2 w-full border border-base-300'>
            <SelectValue placeholder='Select Deduction' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            <SelectGroup>
              <SelectLabel>Select Deduction</SelectLabel>
              {item?.deductions &&
                item?.deductions?.map((deduction: any, index: number) => (
                  <SelectItem
                    className='capitalize'
                    key={index}
                    value={deduction}>
                    <p className='capitalize'>{deduction}</p>
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={
            item?.policy_default !== undefined && item?.policy_default !== null
              ? item?.policy_default
              : ''
          }>
          <SelectTrigger className='mt-2 w-full border border-base-300'>
            <SelectValue placeholder='Select Policy' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            <SelectGroup>
              <SelectLabel>Select Policy</SelectLabel>
              {item?.policy &&
                item?.policy?.map((policyItem: any, index: number) => (
                  <SelectItem
                    className='capitalize'
                    key={index}
                    value={policyItem}>
                    <p className='capitalize'>{policyItem}</p>
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type='button' className='h-10'>
          Buy Now ${item?.quote && item?.quote}
        </Button>
      </div>
    </div>
  )
}

export default InsuranceCard
