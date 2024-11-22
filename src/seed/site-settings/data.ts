import path from 'path'
import { SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Ygency',
    description: 'Ygency is a theme part of contentql',
    faviconUrl: '',
    ogImageUrl: '',
  },
  navbar: {
    logo: {
      imageUrl: '',
      height: 40,
      width: 40,
    },
    menuLinks: [
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
    ],
  },

  footer: {
    logo: {
      imageUrl: '',
      description: '',
      height: 40,
      width: 40,
    },
    footerLinks: [
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
      {
        group: false,
        menuLink: {
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
          },
        },
      },
    ],
    copyright: '© Lauchify - All rights reserved.',
  },
}

export const logo: ImageType = {
  alt: 'log0',
  filePath: path.join(process.cwd(), '/public/logo.png'),
}
