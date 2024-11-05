import Image from 'next/image'

import Button from '@/components/common/Button'
import Highlighter, { HighlighterItem } from '@/components/common/Highlighter'

export const IntegrationCard = ({
  integration,
}: {
  integration: {
    name: string
    description: string
    image: string
  }
}) => {
  return (
    <Highlighter>
      <HighlighterItem>
        <div className='relative z-20 flex h-full w-full flex-col justify-between rounded-md border border-solid border-[#eceff133] p-6'>
          <div className='flex  items-start gap-5 '>
            <Image
              src={integration?.image}
              alt='image'
              width={56}
              height={56}
            />
            <div className='space-y-2 text-left'>
              <h3 className='text-lg font-semibold'>{integration?.name}</h3>
              <p>{integration?.description}</p>
            </div>
          </div>
          <div className=' flex items-end justify-end'>
            <Button variant={'outline'}>Configure</Button>
          </div>
        </div>
      </HighlighterItem>
    </Highlighter>
  )
}
