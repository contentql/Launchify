// Exporting an array that consolidates all block configurations
import { AboutConfig } from './About'
import { FeatureConfig } from './Feature'
import { HeroConfig } from './Hero'
import { ThemesConfig } from './Themes'

// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [HeroConfig, FeatureConfig, AboutConfig, ThemesConfig]
