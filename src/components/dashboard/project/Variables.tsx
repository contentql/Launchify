import { useState } from 'react'

import CopyToClipboard from './CopyToClipboard'
import { ViewVariable } from './ViewVariable'

const Variables = ({
  variables,
}: {
  variables: { key: string; value: string }[]
}) => {
  const [hidden, setHidden] = useState(false)

  return (
    <div className=' pt-8 text-base-content'>
      {variables?.map((variable, index) => (
        <div
          className=' grid grid-cols-3 items-center rounded-md border border-transparent px-2 py-1 hover:border hover:border-primary/25 hover:bg-primary/5'
          key={index}>
          <p className=' col-span-1 text-sm font-semibold text-base-content'>
            {variable?.key}
          </p>
          <div className='group relative col-span-2 inline-flex items-center gap-x-2'>
            {/* {variable?.value} */}
            <ViewVariable variable={variable?.value} />
            <CopyToClipboard textData={variable?.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Variables
