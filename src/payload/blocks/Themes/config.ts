import { Block } from 'payload'

const ThemesConfig: Block = {
  slug: 'ThemesBlock',
  // imageURL: '',
  interfaceName: 'ThemesType',
  labels: {
    singular: 'Themes Block',
    plural: 'Themes Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'Themes',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}

export default ThemesConfig
