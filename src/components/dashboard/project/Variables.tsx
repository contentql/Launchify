import { EllipsisVertical } from 'lucide-react'

import CopyToClipboard from './CopyToClipboard'
import { ViewVariable } from './ViewVariable'

const Variables = ({
  variables,
}: {
  variables: { key: string; value: string }[]
}) => {
  return (
    <div className=' pt-8 text-base-content'>
      {variables?.map((variable, index) => (
        <div
          className='group grid grid-cols-3 items-center gap-x-2 rounded-md border border-transparent px-2 py-1 hover:border hover:border-primary/25 hover:bg-primary/5'
          key={index}>
          <p className=' col-span-1 line-clamp-1 text-sm font-semibold text-base-content'>
            {variable?.key}
          </p>
          <div className='relative col-span-2 inline-flex items-center justify-between gap-x-2'>
            {/* {variable?.value} */}
            <div className='inline-flex items-center gap-x-2'>
              <ViewVariable variable={variable?.value} />
              <CopyToClipboard textData={variable?.value} />
            </div>
            <EllipsisVertical className='text-base-content/80' size={16} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Variables
