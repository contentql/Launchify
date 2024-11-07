import { Access } from 'payload'

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.role?.includes('admin')) return true

  return {
    'user.value': {
      equals: req?.user?.id,
    },
  }
}
