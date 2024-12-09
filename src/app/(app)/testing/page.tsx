'use client'

import { MultiStepLoader as Loader } from '../../../components/MultiStepLoader'
import { X } from 'lucide-react'
import { useState } from 'react'

const loadingStates = [
  {
    status: 'DEPLOYING',
    text: 'Buying a condo',
  },
  {
    status: 'PENDING',
    text: 'Travelling in a flight',
  },
  {
    status: 'DEPLOYING',
    text: 'Meeting Tyler Durden',
  },
  {
    status: 'SUCCESS',
    text: 'He makes soap',
  },
  {
    status: 'ERROR',
    text: 'We goto a bar',
  },
  {
    status: 'SUCCESS',
    text: 'Start a fight',
  },
  {
    status: 'ERROR',
    text: 'We like it',
  },
  {
    status: 'DEPLOYING',
    text: 'Welcome to F**** C***',
  },
  {
    status: 'ERROR',
    text: 'We like it',
  },
]

function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <div className='flex h-[60vh] w-full items-center justify-center'>
      {/* Core Loader Modal */}
      <Loader
        loadingStates={loadingStates as any}
        loading={loading}
        duration={2000}
      />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
      <button
        onClick={() => setLoading(true)}
        className='mx-auto flex h-10 items-center justify-center rounded-lg bg-[#39C3EF] px-8 text-sm font-medium text-black transition duration-200 hover:bg-[#39C3EF]/90 md:text-base'
        style={{
          boxShadow:
            '0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset',
        }}>
        Click to load
      </button>

      {loading && (
        <button
          className='fixed right-4 top-4 z-[120] text-black dark:text-white'
          onClick={() => setLoading(false)}>
          <X className='h-10 w-10' />
        </button>
      )}
    </div>
  )
}
export default MultiStepLoaderDemo
