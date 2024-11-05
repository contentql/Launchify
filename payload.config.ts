import { env } from '@env'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { RichTextAdapterProvider, buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '@/payload/collections/Media'
import { Users } from '@/payload/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const editor = slateEditor({
  admin: {
    leaves: [
      {
        Button: 'src/payload/slate/strong/Button',
        Leaf: 'src/payload/slate/strong/Leaf',
        name: 'strong',
      },
      {
        Button: 'src/payload/slate/pre/Button',
        Leaf: 'src/payload/slate/pre/Leaf',
        name: 'pre',
      },
      {
        Button: 'src/payload/slate/mark/Button',
        Leaf: 'src/payload/slate/mark/Leaf',
        name: 'mark',
      },
      {
        Button: 'src/payload/slate/kbd/Button',
        Leaf: 'src/payload/slate/kbd/Leaf',
        name: 'kbd',
      },
      {
        Button: 'src/payload/slate/custom-iframe/Button',
        Leaf: 'src/payload/slate/custom-iframe/Leaf',
        name: 'custom-iframe',
      },
      {
        Button: 'src/payload/slate/italic/Button',
        Leaf: 'src/payload/slate/italic/Leaf',
        name: 'italic',
      },
      {
        Button: 'src/payload/slate/Strikethrough/Button',
        Leaf: 'src/payload/slate/Strikethrough/Leaf',
        name: 'strikethrough',
      },
      {
        Button: 'src/payload/slate/underline/Button',
        Leaf: 'src/payload/slate/underline/Leaf',
        name: 'underline',
      },
    ],
  },
}) as unknown as RichTextAdapterProvider<any, any, any>

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media],
  db: mongooseAdapter({
    url: env.DATABASE_URI,
  }),
  email: resendAdapter({
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
    apiKey: env.RESEND_API_KEY,
  }),

  sharp,
  editor,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: env.PAYLOAD_SECRET,
})
