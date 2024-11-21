import { Block } from 'payload'

const FeaturesConfig: Block = {
  slug: 'FeaturesBlock',
  interfaceName: 'FeaturesType',
  labels: {
    singular: 'Features Block',
    plural: 'Features Blocks',
  },
  fields: [
    {
      type: 'array',
      name: 'features',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
}

export default FeaturesConfig
