/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    projects: Project;
    services: Service;
    templates: Template;
    pages: Page;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'site-settings': SiteSetting;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  displayName?: string | null;
  username?: string | null;
  imageUrl?: (string | null) | Media;
  avatar?: string | null;
  role: ('admin' | 'author' | 'user')[];
  emailVerified?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blog_image_size2?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blog_image_size3?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: string;
  name?: string | null;
  projectDescription?: string | null;
  Services?: {
    docs?: (string | Service)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  user?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  projectId?: string | null;
  environmentId?: string | null;
  project: string | Template;
  deleted?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services".
 */
export interface Service {
  id: string;
  serviceName?: string | null;
  icon?: string | null;
  project?: (string | null) | Project;
  variables?:
    | {
        key?: string | null;
        value?: string | null;
        id?: string | null;
      }[]
    | null;
  railwayVariables?:
    | {
        key?: string | null;
        value?: string | null;
        id?: string | null;
      }[]
    | null;
  projectId?: string | null;
  serviceId?: string | null;
  environmentId?: string | null;
  serviceDomains?:
    | {
        domainUrl?: string | null;
        id?: string | null;
      }[]
    | null;
  customDomain?: string | null;
  deploymentStatus?: ('NOT_YET_DEPLOYED' | 'SUCCESS' | 'ERROR' | 'DEPLOYING') | null;
  deleted?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "templates".
 */
export interface Template {
  id: string;
  title: string;
  services?:
    | {
        type: 'github' | 'docker' | 'database';
        image?: string | null;
        addStartCommand?: boolean | null;
        startCommand?: string | null;
        repo?: string | null;
        databaseType?: ('MONGODB' | 'REDIS' | 'MYSQL' | 'POSTGRESQL' | 'MARIADB') | null;
        name?: string | null;
        icon?: (string | null) | Media;
        environmentVariables?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  layout?:
    | (HeroType | FeatureType | AboutType | ThemesType | FaqsType | PricingType | FeaturesType | ContactType)[]
    | null;
  isHome?: boolean | null;
  isDynamic?: boolean | null;
  slugMode?: ('generate' | 'custom') | null;
  slug?: string | null;
  pathMode?: ('generate' | 'custom') | null;
  path?: string | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroType".
 */
export interface HeroType {
  title: string;
  description: string;
  primaryButton?: string | null;
  primaryButtonLink?: string | null;
  secondaryButton?: string | null;
  secondaryButtonLink?: string | null;
  image: string | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'HeroBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeatureType".
 */
export interface FeatureType {
  title: string;
  description: string;
  image1: string | Media;
  image2: string | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'FeatureBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AboutType".
 */
export interface AboutType {
  title: string;
  description: string;
  image: string | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'AboutBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ThemesType".
 */
export interface ThemesType {
  title: string;
  description: string;
  Themes?:
    | {
        name: string;
        image: string | Media;
        url: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'ThemesBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FaqsType".
 */
export interface FaqsType {
  title: string;
  faqs?:
    | {
        question: string;
        answer: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'FaqsBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PricingType".
 */
export interface PricingType {
  badge: string;
  title: string;
  description?: string | null;
  pricing?:
    | {
        type: string;
        price: string;
        subscription: string;
        description: string;
        buttonText: string;
        features?:
          | {
              feature: string;
              id?: string | null;
            }[]
          | null;
        active?: boolean | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'PricingBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeaturesType".
 */
export interface FeaturesType {
  features?:
    | {
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'FeaturesBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContactType".
 */
export interface ContactType {
  title: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'ContactBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'projects';
        value: string | Project;
      } | null)
    | ({
        relationTo: 'services';
        value: string | Service;
      } | null)
    | ({
        relationTo: 'templates';
        value: string | Template;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: string;
  general: {
    title: string;
    description: string;
    faviconUrl: string | Media;
    ogImageUrl: string | Media;
    keywords?: string[] | null;
  };
  navbar: {
    logo: BrandLogo;
    menuLinks?:
      | {
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            label: string;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  footer: {
    logo: BrandLogo;
    footerLinks?:
      | {
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            label: string;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
    socialLinks?:
      | {
          platform:
            | 'website'
            | 'facebook'
            | 'instagram'
            | 'twitter'
            | 'linkedin'
            | 'youtube'
            | 'tiktok'
            | 'pinterest'
            | 'snapchat'
            | 'reddit'
            | 'tumblr'
            | 'whatsapp'
            | 'telegram'
            | 'github'
            | 'medium'
            | 'quora'
            | 'discord';
          value: string;
          id?: string | null;
        }[]
      | null;
    copyright?: string | null;
  };
  Projects: (string | Template)[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BrandLogo".
 */
export interface BrandLogo {
  imageUrl: string | Media;
  height?: number | null;
  width?: number | null;
  description?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}