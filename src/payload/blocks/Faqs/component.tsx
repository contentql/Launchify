import { Params } from '../types'
import { FaqsType } from '@payload-types'

import Container from '@/components/common/Container'

interface FaqsProps extends FaqsType {
  params: Params
}
const Faqs: React.FC<FaqsProps> = ({ params, ...block }) => {
  return (
    <Container className='mt-20'>
      <h1 className='mb-8 text-center text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
        {block?.title}
      </h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {block?.faqs?.map((faq, index) => (
          <div key={index} className='space-y-2'>
            <h2 className='text-lg  font-semibold text-base-content'>
              {faq?.question}
            </h2>
            <p className='text-md text-base-content/80'>{faq?.answer}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Faqs
