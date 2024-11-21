import { Block } from 'payload'

const ContactConfig: Block = {
  slug: 'ContactBlock',
  interfaceName: 'ContactType',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
  ],
}
export default ContactConfig
