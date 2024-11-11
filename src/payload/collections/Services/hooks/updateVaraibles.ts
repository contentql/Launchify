import { CollectionAfterChangeHook } from 'payload'

export const updateVariables: CollectionAfterChangeHook = async ({
  collection,
  doc,
  req,
  operation,
  previousDoc,
}) => {
  if (operation === 'create') {
    const { payload } = req

    await payload?.update({
      collection: 'services',
      where: {
        id: {
          equals: doc?.id,
        },
      },
      data: {
        serviceId: '1234567890',
      },
    })
  }
}
