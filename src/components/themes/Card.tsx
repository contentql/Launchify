import { Dialog, DialogContent } from '../common/Dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Card = ({
  theme,
}: {
  theme: {
    name: string
    url: string
    image: string
  }
}) => {
  const { image, name, url } = theme
  const [open, setOpen] = useState(false)
  return (
    <div className='w-full'>
      <div className='h-96 w-full overflow-hidden rounded-md'>
        <Image
          onClick={() => setOpen(true)}
          className='h-full w-full cursor-pointer transition-all  duration-500 hover:scale-110  '
          width={1000}
          height={10000}
          src={image}
          alt='text'
        />
      </div>
      <h4 className='mt-2 text-lg font-semibold text-base-content'>{name}</h4>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='h-[90%] w-full max-w-7xl overflow-hidden  p-4 shadow-none'>
          <div>
            <div className='mt-4 inline-flex w-full items-center justify-between sm:mb-4 md:mb-0'>
              <div className='text space-x-2'>
                <span
                  className='cursor-pointer hover:text-base-content'
                  onClick={() => setOpen(false)}>
                  All Themes /
                </span>
                <span className='font-semibold text-base-content '>{name}</span>
              </div>
              <Link
                className='focus-visible:ring-ring relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded bg-primary px-4 text-sm font-medium text-primary-content ring-offset-base-100 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                href={url}
                target='_blank'>
                Visit Demo
              </Link>
            </div>
            <Tabs defaultValue='desktop' className='h-[85%]'>
              <div className='hidden items-center  justify-center md:flex'>
                <TabsList>
                  <TabsTrigger value='desktop'>Desk</TabsTrigger>
                  <TabsTrigger value='tab'>Tab</TabsTrigger>
                  <TabsTrigger value='mobile'>Mobile</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent className='h-[100%] w-full' value='desktop'>
                <iframe
                  className='h-[100%] w-[100%] rounded-md shadow-xl'
                  src={url}
                  allowFullScreen></iframe>
              </TabsContent>
              <TabsContent className='h-[100%] w-full' value='tab'>
                <iframe
                  className='mx-auto h-[100%] w-full rounded-md shadow-xl md:w-[800px]'
                  src={url}
                  allowFullScreen></iframe>
              </TabsContent>
              <TabsContent className='h-[100%] w-full' value='mobile'>
                <iframe
                  className='mx-auto h-[100%] w-full rounded-md shadow-xl md:w-[400px]'
                  src={url}
                  allowFullScreen></iframe>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Card
