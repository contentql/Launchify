import {
  Activity,
  CalendarCheck2,
  GlobeLock,
  MonitorSmartphone,
  NotepadText,
  Palette,
  Users,
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Activity />,
      name: 'Rich content',
      description:
        'When creating or editing content you have the option to easily embed content from other sites. Create a deeper relationship with your audience by publishing YouTube videos, music from Spotify, podcasts, tweets or other rich content.',
    },
    {
      icon: <CalendarCheck2 />,
      name: 'Schedule content publishing',
      description:
        'Create content in advance and schedule it for publishing on your blog. You can schedule publication of a series of posts over the course of multiple weeks for example, to provide your readers content regularly every week.',
    },
    {
      icon: <GlobeLock />,
      name: 'Custom domain',
      description:
        'Make your blog truly yours. Use your own domain for a blog with just a few clicks in our web dashboard. We will automatically enable secure SSL connections for your domain and make your site available at the new address.',
    },
    {
      icon: <MonitorSmartphone />,
      name: 'Mobile friendly',
      description:
        'Your blog is optimized both for desktop and mobile audiences. Ghost blog works on any device and makes sure that your readers have a pleasant experience from visiting your blog.',
    },
    {
      icon: <NotepadText />,
      name: 'Static pages',
      description:
        "Ghost blog is not just for blogs. Publish static web pages with content you want your readers to have access to. Static pages such as About You page or Contact Information can be added to the navigation of the site to that they're readily available to your readers.",
    },
    {
      icon: <Palette />,
      name: 'Themes',
      description:
        'Select from a wide range of themes available for your Ghost blog. Hundreds of beautiful themes have been created by authors from around the world which can be used on your blog.',
    },
    {
      icon: <Users />,
      name: 'Team accounts',
      description:
        'Invite your team to create and publish content on your Ghost blog. Each team member can be have a role assigned such as author, editor or administrator to manage level of access to your blog.',
    },
  ]
  return (
    <section className='relative mx-auto mt-20 max-w-7xl px-2'>
      {/* <div
        className='pointer-events-none absolute left-[50%] top-0 -translate-x-1/2 -translate-y-[30%] opacity-50 blur-2xl'
        aria-hidden='true'>
        <svg xmlns='http://www.w3.org/2000/svg' width='434' height='427'>
          <defs>
            <linearGradient
              id='bs5-a'
              x1='19.609%'
              x2='50%'
              y1='14.544%'
              y2='100%'>
              <stop offset='0%' stopColor='#A855F7' />
              <stop offset='100%' stopColor='#6366F1' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path
            fill='url(#bs5-a)'
            fillRule='evenodd'
            d='m0 0 461 369-284 58z'
            transform='matrix(1 0 0 -1 0 427)'
          />
        </svg>
      </div> */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {features?.map((feature, index) => (
          <div className='space-y-2' key={index}>
            <div className='inline-flex items-center gap-x-2 text-lg font-semibold text-base-content'>
              {feature?.icon}
              <h2>{feature?.name}</h2>
            </div>
            <p className='line-clamp-4 text-sm text-base-content/80'>
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
