import { TEAM_ID, TEMPLATE_ID } from '@/utils/railwayConstants'

export const getQueryVariables = ({
  projectId,
  template,
  environmentId,
}: {
  projectId: string
  template: string
  environmentId: string
}) => {
  const variableSets = {
    GHOST: {
      input: {
        projectId: projectId,
        environmentId: environmentId,
        templateId: TEMPLATE_ID,
        teamId: TEAM_ID,
        serializedConfig: {
          services: {
            '488d104a-7fa8-4007-82c2-23eb2a3c0af5': {
              icon: 'https://devicons.railway.app/i/mysql.svg',
              name: 'MySQL',
              build: {},
              deploy: {
                startCommand:
                  'docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0',
                healthcheckPath: null,
              },
              source: {
                image: 'mysql',
              },
              variables: {
                MYSQLHOST: {
                  isOptional: false,
                  description: 'Railway TCP Proxy Domain.',
                  defaultValue: '${{RAILWAY_TCP_PROXY_DOMAIN}}',
                },
                MYSQLPORT: {
                  isOptional: false,
                  description: 'MySQL TCP Proxy port.',
                  defaultValue: '${{RAILWAY_TCP_PROXY_PORT}}',
                },
                MYSQLUSER: {
                  isOptional: false,
                  description: 'MySQL user, used for the Data panel.',
                  defaultValue: 'root',
                },
                MYSQL_URL: {
                  isOptional: false,
                  description:
                    'URL to connect to MySQL DB, used for Data panel.',
                  defaultValue:
                    'mysql://${{ MYSQLUSER }}:${{ MYSQL_ROOT_PASSWORD }}@${{ RAILWAY_TCP_PROXY_DOMAIN }}:${{ RAILWAY_TCP_PROXY_PORT }}/${{ MYSQL_DATABASE }}',
                },
                MYSQLDATABASE: {
                  isOptional: false,
                  description: 'Default database, used for Data panel.',
                  defaultValue: '${{ MYSQL_DATABASE }}',
                },
                MYSQLPASSWORD: {
                  isOptional: false,
                  description: 'Root password, used for Data panel.',
                  defaultValue: '${{ MYSQL_ROOT_PASSWORD }}',
                },
                MYSQL_DATABASE: {
                  isOptional: false,
                  description: 'Database to be created on image startup.',
                  defaultValue: 'railway',
                },
                MYSQL_PRIVATE_URL: {
                  isOptional: false,
                  description:
                    'URL to connect to MySQL DB, used for Data panel.',
                  defaultValue:
                    'mysql://${{ MYSQLUSER }}:${{ MYSQL_ROOT_PASSWORD }}@${{ RAILWAY_PRIVATE_DOMAIN }}:3306/${{ MYSQL_DATABASE }}',
                },
                MYSQL_ROOT_PASSWORD: {
                  isOptional: false,
                  description: 'Root password for MySQL DB.',
                  defaultValue:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                },
              },
              networking: {
                tcpProxies: {
                  '3306': {},
                },
                serviceDomains: {},
              },
              volumeMounts: {
                '488d104a-7fa8-4007-82c2-23eb2a3c0af5': {
                  mountPath: '/var/lib/mysql',
                },
              },
            },
            '5944d643-ffdd-4738-8fb5-37043559cc9b': {
              name: 'Ghost',
              build: {},
              deploy: {},
              source: {
                image: 'ghost:alpine',
              },
              variables: {
                url: {
                  isOptional: true,
                  defaultValue: 'https://${{RAILWAY_STATIC_URL}}',
                },
                PORT: {
                  isOptional: true,
                  defaultValue: '2368',
                },
                mail__from: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__transport: {
                  isOptional: true,
                  description: '',
                  defaultValue: 'SMTP',
                },
                database__client: {
                  isOptional: true,
                  defaultValue: 'mysql',
                },
                mail__options__host: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__port: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__auth__pass: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__auth__user: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                database__connection__host: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLHOST}}',
                },
                database__connection__port: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLPORT}}',
                },
                database__connection__user: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLUSER}}',
                },
                database__connection__database: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLDATABASE}}',
                },
                database__connection__password: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLPASSWORD}}',
                },
              },
              networking: {
                tcpProxies: {},
                serviceDomains: {
                  '<hasDomain>': {},
                },
              },
              volumeMounts: {
                '5944d643-ffdd-4738-8fb5-37043559cc9b': {
                  mountPath: '/var/lib/ghost/content',
                },
              },
            },
          },
        },
      },
    },
    STRAPI: {
      input: {
        projectId: projectId,
        environmentId: environmentId,
        templateId: '01789257-f94c-4c1a-b39c-afbafdbafa78',
        teamId: TEAM_ID,
        serializedConfig: {
          services: {
            'af8dc6fe-9a39-4d0c-a454-ebc916790599': {
              name: 'Postgres',
              build: {},
              deploy: {
                startCommand:
                  '/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"',
              },
              networking: {
                tcpProxies: {
                  5432: {},
                },
                serviceDomains: {},
              },
              source: {
                image: 'postgres:14-alpine',
              },
              variables: {
                DATABASE_PRIVATE_URL: {
                  isOptional: false,
                  description: 'Private database URL',
                  defaultValue:
                    'postgres://${{POSTGRES_USER}}:${{POSTGRES_PASSWORD}}@${{PGHOST_PRIVATE}}:${{PGPORT_PRIVATE}}/${{POSTGRES_DB}}',
                },
                DATABASE_URL: {
                  isOptional: false,
                  description: 'URL to connect to Postgres database',
                  defaultValue:
                    'postgres://${{POSTGRES_USER}}:${{POSTGRES_PASSWORD}}@${{PGHOST}}:${{PGPORT}}/${{POSTGRES_DB}}',
                },
                PGDATA: {
                  isOptional: false,
                  description:
                    'Location where the database will be initialized',
                  defaultValue: '/var/lib/postgresql/data/pgdata',
                },
                PGHOST: {
                  isOptional: false,
                  description: 'Public host',
                  defaultValue: '${{RAILWAY_TCP_PROXY_DOMAIN}}',
                },
                PGHOST_PRIVATE: {
                  isOptional: false,
                  description: 'Private host',
                  defaultValue: '${{RAILWAY_PRIVATE_DOMAIN}}',
                },
                PGPORT: {
                  isOptional: false,
                  description: 'Public port',
                  defaultValue: '${{RAILWAY_TCP_PROXY_PORT}}',
                },
                PGPORT_PRIVATE: {
                  isOptional: false,
                  description: 'Private port',
                  defaultValue: '5432',
                },
                POSTGRES_DB: {
                  isOptional: false,
                  description: 'Default database created when image is started',
                  defaultValue: 'railway',
                },
                POSTGRES_PASSWORD: {
                  isOptional: false,
                  description: 'Password to connect to DB',
                  defaultValue:
                    '${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}}',
                },
                POSTGRES_USER: {
                  isOptional: false,
                  description: 'User to connect to Postgres DB',
                  defaultValue: 'railway',
                },
              },
              volumeMounts: {
                'af8dc6fe-9a39-4d0c-a454-ebc916790599': {
                  mountPath: '/var/lib/postgresql/data',
                },
              },
            },
            'ed4781fc-1561-4c84-a378-2f519cf63f58': {
              name: 'Strapi',
              build: {},
              deploy: {
                healthcheckPath: '/admin',
              },
              networking: {
                tcpProxies: {},
                serviceDomains: {
                  '<hasDomain>': {},
                },
              },
              source: {
                repo: 'https://github.com/railwayapp-templates/strapi',
              },
              variables: {
                URL: {
                  isOptional: false,
                  description: 'Public URL of the server',
                  defaultValue: 'https://${{RAILWAY_PUBLIC_DOMAIN}}',
                },
                ADMIN_JWT_SECRET: {
                  isOptional: false,
                  description: 'Secret used to encode JWT tokens',
                  defaultValue: '${{secret()}}',
                },
                API_TOKEN_SALT: {
                  isOptional: false,
                  description: 'Hash salt used to generate API tokens',
                  defaultValue: '${{secret()}}',
                },
                APP_KEYS: {
                  isOptional: false,
                  description:
                    'Declare session keys, which is used by the session middleware for the Users & Permissions plugin and the Documentation plugin',
                  defaultValue: '${{secret()}}',
                },
                BROWSER: {
                  isOptional: false,
                  description:
                    'Open the admin panel in the browser after startup',
                  defaultValue: 'false',
                },
                CLOUDINARY_KEY: {
                  isOptional: true,
                  description:
                    'Only required if you want images to be persisted.',
                },
                CLOUDINARY_NAME: {
                  isOptional: true,
                  description:
                    'Only required if you want images to be persisted.',
                },
                CLOUDINARY_SECRET: {
                  isOptional: true,
                  description:
                    'Only required if you want images to be persisted.',
                },
                DATABASE_PRIVATE_URL: {
                  isOptional: false,
                  description: 'Private database URL',
                  defaultValue: '${{Postgres.DATABASE_PRIVATE_URL}}',
                },
                DATABASE_URL: {
                  isOptional: false,
                  description: 'Public database URL',
                  defaultValue: '${{Postgres.DATABASE_URL}}',
                },
                HOST: {
                  isOptional: false,
                  description: '',
                  defaultValue: '::',
                },
                JWT_SECRET: {
                  isOptional: false,
                  description: 'A random string used to create new JWTs',
                  defaultValue: '${{secret()}}',
                },
                STRAPI_DISABLE_UPDATE_NOTIFICATION: {
                  isOptional: false,
                  description:
                    "Don't show the notification message about updating strapi in the terminal",
                  defaultValue: 'true',
                },
                STRAPI_TELEMETRY_DISABLED: {
                  isOptional: false,
                  description: "Don't send telemetry usage data to Strapi",
                  defaultValue: 'true',
                },
                TRANSFER_TOKEN_SALT: {
                  isOptional: false,
                  description: 'Salt used to generate Transfer tokens',
                  defaultValue: '${{secret()}}',
                },
              },
              volumeMounts: {},
            },
          },
        },
      },
    },
    WORDPRESS: {
      input: {
        projectId: '7ce3439b-73ed-4da0-ad36-237150da1f42',
        templateId: '292dbcfa-eb54-4b29-b934-4db92865e86b',
        environmentId: '04dd1cd5-5132-4ca2-988b-9e681059680d',
        serializedConfig: {
          services: {
            '25f6a837-0069-445c-87fe-b2712dba75ab': {
              icon: 'https://img.icons8.com/color/48/maria-db.png',
              name: 'MariaDB',
              build: {},
              deploy: {},
              networking: {
                tcpProxies: {},
                serviceDomains: {},
              },
              source: {
                image: 'mariadb',
              },
              variables: {
                MARIADB_DATABASE: {
                  isOptional: false,
                  description: 'Database name - default: railway',
                  defaultValue: 'railway',
                },
                MARIADB_HOST: {
                  isOptional: false,
                  description:
                    'Database host - default: ${{RAILWAY_TCP_PROXY_DOMAIN}}',
                  defaultValue: '${{RAILWAY_TCP_PROXY_DOMAIN}}',
                },
                MARIADB_PASSWORD: {
                  isOptional: false,
                  description:
                    'Database password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}}',
                  defaultValue:
                    '${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}}',
                },
                MARIADB_PORT: {
                  isOptional: false,
                  description:
                    'Database port - default: ${{RAILWAY_TCP_PROXY_PORT}}',
                  defaultValue: '${{RAILWAY_TCP_PROXY_PORT}}',
                },
                MARIADB_PRIVATE_HOST: {
                  isOptional: false,
                  description:
                    'Database host (private) - default: ${{RAILWAY_PRIVATE_DOMAIN}}',
                  defaultValue: '${{RAILWAY_PRIVATE_DOMAIN}}',
                },
                MARIADB_PRIVATE_PORT: {
                  isOptional: false,
                  description: 'Database port (private) - default: 3306',
                  defaultValue: '3306',
                },
                MARIADB_PRIVATE_URL: {
                  isOptional: false,
                  description:
                    'Database url (private) - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_PRIVATE_HOST}}:${{MARIADB_PRIVATE_PORT}}/${{MARIADB_DATABASE}}',
                  defaultValue:
                    'mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_PRIVATE_HOST}}:${{MARIADB_PRIVATE_PORT}}/${{MARIADB_DATABASE}}',
                },
                MARIADB_ROOT_PASSWORD: {
                  isOptional: false,
                  description:
                    'Database root password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}}',
                  defaultValue:
                    '${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}}',
                },
                MARIADB_URL: {
                  isOptional: false,
                  description:
                    'Database url - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_HOST}}:${{MARIADB_PORT}}/${{MARIADB_DATABASE}}',
                  defaultValue:
                    'mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_HOST}}:${{MARIADB_PORT}}/${{MARIADB_DATABASE}}',
                },
                MARIADB_USER: {
                  isOptional: false,
                  description: 'Database user - default: railway',
                  defaultValue: 'railway',
                },
              },
              volumeMounts: {
                '25f6a837-0069-445c-87fe-b2712dba75ab': {
                  mountPath: '/var/lib/mysql',
                },
              },
            },
            '55aa8f0e-3c88-4a53-81cc-5ad9d1af0e7f': {
              icon: 'https://img.icons8.com/color/48/000000/wordpress.png',
              name: 'Primary',
              build: {},
              deploy: {
                startCommand:
                  "/bin/bash -c \"echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh apache2-foreground\"",
              },
              networking: {
                tcpProxies: {},
                serviceDomains: {
                  '<hasDomain>': {},
                },
              },
              source: {
                image: 'wordpress',
              },
              variables: {
                PORT: {
                  isOptional: false,
                  description:
                    'The HTTP port the application runs on. (temporarily unchangeable)',
                  defaultValue: '80',
                },
                WORDPRESS_AUTH_KEY: {
                  isOptional: false,
                  description: 'WordPress auth key - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_AUTH_SALT: {
                  isOptional: false,
                  description: 'WordPress auth salt - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_CONFIG_EXTRA: {
                  isOptional: false,
                  description:
                    "Extra configurations - default: define('DOMAIN_CURRENT_SITE','${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_HOME','https://${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_SITEURL','https://${{RAILWAY_PUBLIC_DOMAIN}}');",
                  defaultValue:
                    "define('DOMAIN_CURRENT_SITE','${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_HOME','https://${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_SITEURL','https://${{RAILWAY_PUBLIC_DOMAIN}}');",
                },
                WORDPRESS_DB_HOST: {
                  isOptional: false,
                  description:
                    'Database host - default: ${{MariaDB.MARIADB_PRIVATE_HOST}}:${{MariaDB.MARIADB_PRIVATE_PORT}}',
                  defaultValue:
                    '${{MariaDB.MARIADB_PRIVATE_HOST}}:${{MariaDB.MARIADB_PRIVATE_PORT}}',
                },
                WORDPRESS_DB_NAME: {
                  isOptional: false,
                  description:
                    'Database type - default: ${{MariaDB.MARIADB_DATABASE}}',
                  defaultValue: '${{MariaDB.MARIADB_DATABASE}}',
                },
                WORDPRESS_DB_PASSWORD: {
                  isOptional: false,
                  description:
                    'Database password - default: ${{MariaDB.MARIADB_PASSWORD}}',
                  defaultValue: '${{MariaDB.MARIADB_PASSWORD}}',
                },
                WORDPRESS_DB_USER: {
                  isOptional: false,
                  description:
                    'Database user - default: ${{MariaDB.MARIADB_USER}}',
                  defaultValue: '${{MariaDB.MARIADB_USER}}',
                },
                WORDPRESS_LOGGED_IN_KEY: {
                  isOptional: false,
                  description:
                    'WordPress logged in key - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_LOGGED_IN_SALT: {
                  isOptional: false,
                  description:
                    'WordPress logged in salt - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_NONCE_KEY: {
                  isOptional: false,
                  description: 'WordPress nonce key - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_NONCE_SALT: {
                  isOptional: false,
                  description:
                    'WordPress nonce salt - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_SECURE_AUTH_KEY: {
                  isOptional: false,
                  description:
                    'WordPress secure auth key - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
                WORDPRESS_SECURE_AUTH_SALT: {
                  isOptional: false,
                  description:
                    'WordPress secure auth salt - default: ${{secret(32)}}',
                  defaultValue: '${{secret(32)}}',
                },
              },
              volumeMounts: {
                '55aa8f0e-3c88-4a53-81cc-5ad9d1af0e7f': {
                  mountPath: '/var/www/html',
                },
              },
            },
          },
        },
      },
    },
  }

  const queryVariables = (variableSets as any)[template]
  if (!queryVariables) {
    throw new Error(`No configuration found for source: ${template}`)
  }

  return queryVariables
}
