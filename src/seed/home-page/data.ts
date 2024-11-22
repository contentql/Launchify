import path from 'path'
import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type HomeImageType = {
  alt: string
  filePath: string
}

export const homePageData: HomePageDataType = {
  title: 'Home Page',
  isHome: true,
  _status: 'published',
  layout: [
    {
      blockType: 'HeroBlock',
      title: 'Get your own Ghost blog for free.',
      description:
        'Ghost 5 is here and we support it! Create and publish blog posts with your own Ghost blog. Launch a blog on your domain and publish content easily within seconds.',
      image: '',
      primaryButton: 'Start your blog',
      primaryButtonLink: '#',
      secondaryButton: 'Learn more',
      secondaryButtonLink: '#',
    },
    {
      blockType: 'FeatureBlock',
      title: 'Ghost blog for $0 / mo',
      description:
        'ContentQL is really free. Our ambition is to enable everyone to tell their story without having to think about price. Create and edit content at no cost. Our free plan includes variety of themes and design layouts to show your style. Customize blog with your own cover pictures, embed videos, tweets, music clips and share joy with your readers. Your blog is supported by ads. We pay close attention to pick ads which are relevant to your audience to match your content and their interests.',
      image1: '',
      image2: '',
    },
    {
      blockType: 'AboutBlock',
      title: 'Tell your story with a blog',
      description:
        'Make your blog personal. Express yourself and entertain your readers by sharing thoughts, tips, reviews, jokes or wedding announcements. Share blog posts with family, friends, colleagues or your boss. You`re free to tell your own story. Business or freelancer? Share product announcements, company news, pictures from retreats, conferences or just the office. Build a fan base, create portfolio or share your resume. You can do it all on ContentQL.',
      image: '',
    },
  ],
}

//images

export const homePageHeroImageData: HomeImageType = {
  alt: 'hero',
  filePath: path.join(process.cwd(), '/public/images/home/people-talking.png'),
}
export const homePageFeatureImageData: HomeImageType[] = [
  {
    alt: 'feature 1',
    filePath: path.join(process.cwd(), '/public/images/home/posts-bg.jpg'),
  },
  {
    alt: 'feature 2',
    filePath: path.join(process.cwd(), '/public/images/home/rich-editor.png'),
  },
]
export const homePageAboutImageData: HomeImageType = {
  alt: 'about',
  filePath: path.join(process.cwd(), '/public/images/home/themes-bg.jpg'),
}
