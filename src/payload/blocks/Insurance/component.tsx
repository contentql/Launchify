import { Params } from '../types'
import { InsuranceType } from '@payload-types'
import React from 'react'

import Container from '@/components/common/Container'

import Filters from './components/Filters'

interface InsuranceProps extends InsuranceType {
  params: Params
}

const Insurance: React.FC<InsuranceProps> = ({ params, ...block }) => {
  return (
    <Container>
      <div className='mt-4 flex flex-col items-center justify-center gap-y-2'>
        <h2 className='text-2xl font-semibold'>{block?.title}</h2>
        <p className='text-md max-w-lg text-base-content/80'>
          {block?.description}
        </p>
      </div>
      <Filters block={block} />
    </Container>
  )
}

export default Insurance
