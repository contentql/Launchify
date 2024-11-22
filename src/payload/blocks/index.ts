// Exporting an array that consolidates all block configurations
import { AboutConfig } from './About'
import { ContactConfig } from './Contact'
import { FaqsConfig } from './Faqs'
import { FeatureConfig } from './Feature'
import { FeaturesConfig } from './Features'
import { HeroConfig } from './Hero'
import { PricingConfig } from './Pricing'
import { ThemesConfig } from './Themes'

// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [
  HeroConfig,
  FeatureConfig,
  AboutConfig,
  ThemesConfig,
  FaqsConfig,
  PricingConfig,
  FeaturesConfig,
  ContactConfig,
]
