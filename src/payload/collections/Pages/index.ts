import type { CollectionConfig } from 'payload'

import { layoutField } from '@/payload/fields/layout'
import { pathField, pathModeField } from '@/payload/fields/path'
import { slugField, slugModeField } from '@/payload/fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt', 'createdAt'],
    group: 'Content',
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              unique: true,
            },
            layoutField({
              blocks: [],
            }),
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isHome',
          label: 'Home Page',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isDynamic',
          label: 'Dynamic Page',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    slugModeField(),
    slugField({ fieldToUse: 'title' }),
    pathModeField(),
    pathField(),
  ],
}
