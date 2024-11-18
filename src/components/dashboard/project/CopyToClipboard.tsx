import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { FC, useState } from 'react'

import { cn } from '@/utils/cn'

const CopyToClipboard: FC<{
  textData: string
  children?: React.ReactNode
  className?: string
  hoverHidden?: boolean
}> = ({ textData, children, className, hoverHidden }) => {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    setCopied(true)
    navigator.clipboard.writeText(textData).then(
      () => {
        // console.log('copied');
      },
      err => {
        console.error(err)
      },
    )
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <div
      className={cn(
        'cursor-pointer group-hover:block ',
        hoverHidden ? 'block' : 'md:hidden',
        className,
      )}>
      {copied ? (
        <motion.div
          key='check-icon'
          initial={{ opacity: 0, y: '10px' }}
          animate={{ opacity: 1, y: '0px' }}
          exit={{ opacity: 0, y: '10px' }}
          transition={{ duration: 0.2 }}>
          <Check size={14} />
        </motion.div>
      ) : (
        <motion.div
          key='check-copy'
          initial={{ opacity: 0, y: '-10px' }}
          animate={{ opacity: 1, y: '0px' }}
          exit={{ opacity: 0, y: '-10px' }}
          transition={{ duration: 0.2 }}>
          <Copy size={14} onClick={copyToClipboard} />
        </motion.div>
      )}
    </div>
  )
}
export default CopyToClipboard
