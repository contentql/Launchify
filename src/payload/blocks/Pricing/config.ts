import { Block } from 'payload'

const PricingConfig: Block = {
  slug: 'PricingBlock',
  interfaceName: 'PricingType',
  labels: {
    singular: 'Pricing Block',
    plural: 'Pricing Blocks',
  },
  fields: [
    {
      name: 'badge',
      label: 'Badge',
      type: 'text',
      required: true,
    },
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
    },
    {
      name: 'pricing',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'text',
          label: 'Type',
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'text',
          required: true,
        },
        {
          name: 'subscription',
          label: 'Subscription',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'buttonText',
          label: 'Button Name',
          type: 'text',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature',
              required: true,
            },
          ],
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Active',
          defaultValue: false,
        },
      ],
    },
  ],
}
export default PricingConfig
