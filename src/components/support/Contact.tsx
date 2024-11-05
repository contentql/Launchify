import Button from '../common/Button'
import Input from '../common/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/Select'
import { Textarea } from '../common/Textarea'

const Contact = () => {
  return (
    <section className='mx-auto mt-20 max-w-7xl px-2'>
      <h2 className='pb-8 text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
        Contact Us
      </h2>
      <div className='mx-auto space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <label htmlFor='name'>
              Name <span className='font-medium text-error'>*</span>
            </label>
            <Input className='w-full' placeholder='Enter your name' />
          </div>
          <div className='space-y-2'>
            <label htmlFor='name'>
              Email <span className='font-bold text-error'>*</span>
            </label>
            <Input placeholder='Enter your email' type='email' />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <label htmlFor='name'>Phone Number</label>
            <Input
              className='w-full'
              type='number'
              placeholder='Enter your name'
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='name'>
              Inquiry Type <span className='font-bold text-error'>*</span>
            </label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='general'>General</SelectItem>
                <SelectItem value='support'>Support</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-2'>
          <label htmlFor='subject'>
            Subject <span className='font-medium text-error'>*</span>
          </label>
          <Input type='text' placeholder='Subject' />
        </div>
        <div className='space-y-2'>
          <label htmlFor='message'>
            Message <span className='font-medium text-error'>*</span>
          </label>
          <Textarea placeholder='Enter your issue' />
        </div>
      </div>
      <div className='mt-4 flex items-center justify-end'>
        <Button>Submit</Button>
      </div>
    </section>
  )
}

export default Contact
