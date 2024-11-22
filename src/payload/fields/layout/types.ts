import type { CustomField } from '../slug/utils/payload-overrides'

export type LayoutField = (overrides?: Partial<CustomField>) => CustomField
