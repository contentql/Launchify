import { Page } from 'payload-types'

export type InsurancePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const InsurancePageData: InsurancePageDataType = {
  title: 'Insurance',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Insurance',
      title: "Treveler's health insurance",
      description: 'We offer reliable and affordable travel insurance service',
      age: 20,
      citizenship: [
        {
          country: 'India',
          code: 'IN',
        },
        {
          country: 'USA',
          code: 'US',
        },
        {
          country: 'Others',
          code: 'CA',
        },
      ],
      destination: [
        {
          location: 'Traveling to USA',
          value: 0,
        },
        {
          location: 'International including USA',
          value: 1,
        },
        {
          location: 'International excluding USA',
          value: 1,
        },
      ],
      startDate: '2025-01-20T11:30:00.000Z',
      endDate: '2025-03-15T11:30:00.000Z',
    },
  ],
}
