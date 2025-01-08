import { Block } from 'payload'

const InsuranceConfig: Block = {
  slug: 'Insurance',
  interfaceName: 'InsuranceType',
  labels: {
    singular: 'Insurance Block',
    plural: 'Insurance Blocks',
  },
  //   imageURL: '/images/blocks/hero-block.png',
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
    },
    {
      name: 'citizenship',
      type: 'array',
      label: 'Citizenship',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          label: 'Country',
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          label: 'Country Code',
          admin: {
            description: 'E.g: IN',
          },
        },
      ],
    },
    {
      name: 'destination',
      type: 'array',
      label: 'Destination',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Location',
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Value',
        },
      ],
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
  ],
}

export default InsuranceConfig
