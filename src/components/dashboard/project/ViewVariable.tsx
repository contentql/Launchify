import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import Input from '@/components/common/Input'

export const ViewVariable = ({ variable }: { variable: string }) => {
  const [hidden, setHidden] = useState(false)

  return (
    <div className='inline-flex items-center gap-x-2 transition-all duration-300'>
      {hidden ? (
        <p className='text-sm font-semibold text-base-content'>
          {variable ? (
            <Input
              className='focus:ring:0 h-6 w-full border-none px-1 hover:ring-0'
              readOnly
              value={variable}
            />
          ) : (
            <p className='text-sm font-normal text-base-content/80'>
              {'<empty string>'}
            </p>
          )}
        </p>
      ) : (
        <p className='inline-flex items-center'>******</p>
      )}
      <div className='cursor-pointer group-hover:block md:hidden'>
        {hidden ? (
          <motion.div
            key='check-icon'
            initial={{ opacity: 0, y: '10px' }}
            animate={{ opacity: 1, y: '0px' }}
            exit={{ opacity: 0, y: '10px' }}
            transition={{ duration: 0.2 }}>
            <EyeOff size={14} onClick={() => setHidden(!hidden)} />
          </motion.div>
        ) : (
          <motion.div
            key='check-copy'
            initial={{ opacity: 0, y: '10px' }}
            animate={{ opacity: 1, y: '0px' }}
            exit={{ opacity: 0, y: '-10px' }}
            transition={{ duration: 0.2 }}>
            <Eye size={14} onClick={() => setHidden(!hidden)} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
