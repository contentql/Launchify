import { env } from '@env'
import { CollectionConfig } from 'payload'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'

import { isAdminOrCurrentUser } from './access/isAdminOrCurrentUser'
import { authorAccessAfterUpdate } from './hooks/authorAccessAfterUpdate'
import { handleUserRoles } from './hooks/handleUserRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Auth',
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      secure: true,
      sameSite: 'Lax',
    },
    tokenExpiration: 604800,
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return UserAccountVerification({
          actionLabel: 'verify your account',
          buttonText: 'Verify Account',
          userName: 'user',
          image: user.imageUrl,
          href: `${env.PAYLOAD_URL}/verify?token=${token}&id=${user.id}`,
        })
      },
    },
    forgotPassword: {
      generateEmailHTML: args => {
        return ResetPassword({
          userFirstName: 'User',
          resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
        })
      },
    },
  },
  hooks: {
    beforeChange: [authorAccessAfterUpdate, handleUserRoles],
  },
  access: {
    admin: async ({ req }) => {
      // added author also to access the admin-panel
      if (req.user) {
        const userRole: string[] = req?.user?.role || []

        const hasAccess = userRole.some(role =>
          ['admin', 'author'].includes(role),
        )

        return hasAccess
      }

      return false
    },
    read: () => true,
    create: () => true,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      saveToJWT: true,
      // access: {
      //   update: adminOrCurrentUserFieldAccess,
      // },
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      saveToJWT: true,
      unique: true,
    },
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      // access: {
      //   update: adminOrCurrentUserFieldAccess,
      // },
    },

    {
      name: 'avatar',
      type: 'text',
      label: 'Avatar',
    },
    // only admin can update the role field
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      // access: {
      //   create: isAdminFieldAccess,
      //   update: isAdminFieldAccess,
      // },
      saveToJWT: true,
      defaultValue: 'user',
      required: true,
      hasMany: true,
    },
    {
      name: 'emailVerified',
      type: 'date',
      // access: {
      //   create: isAdminFieldAccess,
      //   update: isAdminFieldAccess,
      // },
    },
  ],
}
