import path from 'path'
import { Page } from 'payload-types'

export type ThemesPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type ThemeImageType = {
  alt: string
  filePath: string
}

export const themesPageData: ThemesPageDataType = {
  title: 'Themes',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'ThemesBlock',
      title: 'Themes',
      description:
        'Pick from variety of themes. Some themes are included with every Ghost blog automatically. Others are premium themes from various authors.',
      Themes: [
        {
          name: 'Ruby',
          image: '',
          url: 'https://ruby.ghost.io/',
        },
        {
          name: 'Editorial',
          image: '',
          url: 'https://editorial.ghost.io/',
        },
        {
          image: '',
          name: 'London',
          url: 'https://london.ghost.io/author/ghost-themes/',
        },
        {
          image: '',
          name: 'Massively',
          url: 'https://massively.ghost.io/',
        },
      ],
    },
  ],
}

export const themesImageData: ThemeImageType[] = [
  {
    alt: 'theme 1',
    filePath: path.join(process.cwd(), '/public/images/themes/ruby.jpg'),
  },
  {
    alt: 'theme 2',
    filePath: path.join(process.cwd(), '/public/images/themes/editorial.jpg'),
  },
  {
    alt: 'theme 3',
    filePath: path.join(process.cwd(), '/public/images/themes/london.jpg'),
  },
  {
    alt: 'theme 4',
    filePath: path.join(process.cwd(), '/public/images/themes/massively.jpg'),
  },
]
