import { Page } from 'payload-types'

export type PricingPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const PricingPageData: PricingPageDataType = {
  title: 'Pricing',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'PricingBlock',
      badge: 'Pricing Table',
      title: 'Plans for you',
      description:
        'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.',
      pricing: [
        {
          type: 'Absolutely',
          price: 'Free',
          subscription: 'month',
          description:
            'Perfect for using in a personal website or a client project.',
          buttonText: 'Choose Free',
          active: false,
          features: [
            {
              feature: '1GB storage',
            },
            {
              feature: 'Supported by ads',
            },
            {
              feature: '13 basic themes',
            },
            {
              feature: 'Connect your domain',
            },
          ],
        },
        {
          type: 'Starter',
          price: '$8',
          subscription: 'month',
          description:
            'Perfect for using in a personal website or a client project.',
          buttonText: 'Choose Starter',
          active: false,
          features: [
            {
              feature: 'All Free plan features',
            },
            {
              feature: 'Remove ads',
            },
            {
              feature: 'Lifetime access',
            },
            {
              feature: '10GB storage',
            },
            {
              feature: '11 premium themes',
            },
          ],
        },
        {
          type: 'Standard',
          price: '$14',
          subscription: 'month',
          description:
            'Perfect for using in a personal website or a client project.',
          buttonText: 'Choose Standard',
          active: true,
          features: [
            {
              feature: 'All Starter features',
            },
            {
              feature: 'Use your theme',
            },
            {
              feature: '15GB storage',
            },
          ],
        },
        {
          type: 'Premium',
          price: '$29',
          subscription: 'month',
          description:
            'Perfect for using in a personal website or a client project.',
          buttonText: 'Choose Premium',
          active: true,
          features: [
            {
              feature: 'All Standard features',
            },
            {
              feature: 'Priority support',
            },
            {
              feature: '99.9% SLA',
            },
            {
              feature: '50GB storage',
            },
          ],
        },
      ],
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
