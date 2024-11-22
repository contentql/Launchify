import path from 'path'
import { Page } from 'payload-types'

export type FeaturesPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type FeatureImageType = {
  alt: string
  filePath: string
}

export const featuresPageData: FeaturesPageDataType = {
  title: 'Features',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'HeroBlock',
      title: 'Features',
      description:
        'Powerful blog to create and publish content for your readers. Customize Ghost blog as much as you want and tell your story.',
      image: '',
      primaryButton: 'Start your blog',
      primaryButtonLink: '#',
    },
    {
      blockType: 'FeaturesBlock',
      features: [
        {
          title: 'Rich content',
          description:
            'When creating or editing content you have the option to easily embed content from other sites. Create a deeper relationship with your audience by publishing YouTube videos, music from Spotify, podcasts, tweets or other rich content.',
        },
        {
          description:
            'Create content in advance and schedule it for publishing on your blog. You can schedule publication of a series of posts over the course of multiple weeks for example, to provide your readers content regularly every week.',
          title: 'Schedule content publishing',
        },
        {
          title: 'Custom domain',
          description:
            'Make your blog truly yours. Use your own domain for a blog with just a few clicks in our web dashboard. We will automatically enable secure SSL connections for your domain and make your site available at the new address.',
        },
        {
          title: 'Mobile friendly',
          description:
            'Your blog is optimized both for desktop and mobile audiences. Ghost blog works on any device and makes sure that your readers have a pleasant experience from visiting your blog.',
        },
        {
          title: 'Static pages',
          description:
            "Ghost blog is not just for blogs. Publish static web pages with content you want your readers to have access to. Static pages such as About You page or Contact Information can be added to the navigation of the site to that they're readily available to your readers.",
        },
        {
          title: 'Themes',
          description:
            'Select from a wide range of themes available for your Ghost blog. Hundreds of beautiful themes have been created by authors from around the world which can be used on your blog.',
        },
        {
          title: 'Team accounts',
          description:
            'Invite your team to create and publish content on your Ghost blog. Each team member can be have a role assigned such as author, editor or administrator to manage level of access to your blog.',
        },
      ],
    },
  ],
}

//images

export const featurePageHeroImageData: FeatureImageType = {
  alt: 'hero',
  filePath: path.join(process.cwd(), '/public/images/home/cracking-egg.png'),
}
