import { Block } from 'payload'

const AboutConfig: Block = {
  slug: 'AboutBlock',
  // imageURL: '',
  interfaceName: 'AboutType',
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
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
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default AboutConfig
