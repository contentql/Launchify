import { Block } from 'payload'

const HeroConfig: Block = {
  slug: 'HeroBlock',
  // imageURL: '',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
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
      type: 'collapsible',
      label: 'Primary Button',
      fields: [
        {
          type: 'text',
          name: 'primaryButton',
          label: 'Primary Button',
        },
        {
          type: 'text',
          name: 'primaryButtonLink',
          label: 'Link',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Secondary Button',
      fields: [
        {
          type: 'text',
          name: 'secondaryButton',
          label: 'Secondary Button',
        },
        {
          type: 'text',
          name: 'secondaryButtonLink',
          label: 'Link',
        },
      ],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default HeroConfig
