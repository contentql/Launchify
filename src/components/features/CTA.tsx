import Button from '../common/Button'

export default function CTA() {
  return (
    <section>
      <div className='mt-20 px-2'>
        <div className='relative overflow-hidden rounded-[3rem] px-8 py-12 md:py-20'>
          {/* Radial gradient */}
          <div
            className='pointer-events-none absolute left-1/2 top-0  flex aspect-square w-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center'
            aria-hidden='true'>
            <div className='translate-z-0 absolute inset-0 rounded-full bg-primary opacity-70 blur-[120px]' />
            <div className='translate-z-0 absolute h-1/4 w-1/4 rounded-full bg-primary/90 blur-[40px]' />
          </div>

          <div className='relative mx-auto max-w-3xl text-center'>
            <h2 className='font-semibold text-base-content sm:text-5xl lg:text-2xl'>
              Start your Ghost blog
            </h2>
            <p className='mb-8 text-lg text-base-content/80'>
              Tell your story with your own Ghost blog Terms
            </p>
            <div>
              <Button>Sign up for a free blog</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
