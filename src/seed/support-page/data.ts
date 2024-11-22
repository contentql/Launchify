import path from 'path'
import { Page } from 'payload-types'

export type SupportPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type SupportImageType = {
  alt: string
  filePath: string
}

export const SupportPageData: SupportPageDataType = {
  title: 'Support',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'HeroBlock',
      title: 'Support',
      description:
        'Learn more about TranquilTech through in-depth documentation and helpful guides. Join community forums to connect with other users, share insights, and find support. Maximize your experience with all that TranquilTech has to offer!',
      image: '',
      primaryButton: 'Contact us',
      primaryButtonLink: '#',
    },
    {
      blockType: 'ContactBlock',
      title: 'Contact us',
    },
    {
      blockType: 'FaqsBlock',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          answer:
            "Yes. Our free plan completely free of charge. You will not be charged for running your blog. We don't even require a credit card to sign up.",
          question: 'Is Launchify really free?',
        },
        {
          answer:
            'No. You can sign up for monthly billing and cancel, upgrade or downgrade at any time. You can also pick plans with annual billing with ~15% discount.',
          question: 'Do I have to sign a long-term contract?',
        },
        {
          answer:
            'Yes. We give you a full refund if you are not completely happy within 30 days of the purchase.',
          question: 'Do you have a refund policy?',
        },
        {
          answer:
            'After your plan expires or you delete your blog we delete all your data. This action is irreversible.',
          question: 'What happens to my data once I delete my blog?',
        },
        {
          answer:
            "No. Launch your blog without providing a credit card. Once you decide to upgrade your plan, we'll ask for your preferred payment method.",
          question: 'Do I need a credit card to sign up?',
        },
        {
          answer:
            "The prices are exclusive of VAT. In case you're in based in European Union and don't provide a valid VAT number, we charge your local VAT rate.",
          question: 'Is VAT included?',
        },
      ],
    },
  ],
}

export const supportPageHeroImageData: SupportImageType = {
  alt: 'hero',
  filePath: path.join(process.cwd(), '/public/images/home/support.png'),
}
