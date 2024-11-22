import { Block } from 'payload'

const FaqsConfig: Block = {
  slug: 'FaqsBlock',
  // imageURL: '',
  interfaceName: 'FaqsType',
  labels: {
    singular: 'FAQS Block',
    plural: 'FAQS Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      type: 'array',
      name: 'faqs',
      fields: [
        {
          type: 'text',
          label: 'Question',
          required: true,
          name: 'question',
        },
        {
          type: 'textarea',
          label: 'Answer',
          required: true,
          name: 'answer',
        },
      ],
    },
  ],
}

export default FaqsConfig
