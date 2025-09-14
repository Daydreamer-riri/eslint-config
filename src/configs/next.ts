import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { interopDefault } from '@antfu/eslint-config'

export async function next(): Promise<TypedFlatConfigItem[]> {
  // @ts-expect-error un typed
  const next = await interopDefault(import('@next/eslint-plugin-next'))

  return [
    {
      name: 'ririd:next',
      plugins: { '@next/next': next },
      rules: {
        '@next/next/google-font-display': 'warn',
        '@next/next/google-font-preconnect': 'warn',
        '@next/next/next-script-for-ga': 'warn',
        '@next/next/no-async-client-component': 'warn',
        '@next/next/no-before-interactive-script-outside-document': 'warn',
        '@next/next/no-css-tags': 'warn',
        '@next/next/no-head-element': 'warn',
        '@next/next/no-html-link-for-pages': 'warn',
        '@next/next/no-img-element': 'warn',
        '@next/next/no-page-custom-font': 'warn',
        '@next/next/no-styled-jsx-in-document': 'warn',
        '@next/next/no-sync-scripts': 'warn',
        '@next/next/no-title-in-document-head': 'warn',
        '@next/next/no-typos': 'warn',
        '@next/next/no-unwanted-polyfillio': 'warn',
        // errors
        '@next/next/inline-script-id': 'error',
        '@next/next/no-assign-module-variable': 'error',
        '@next/next/no-document-import-in-page': 'error',
        '@next/next/no-duplicate-head': 'error',
        '@next/next/no-head-import-in-document': 'error',
        '@next/next/no-script-component-in-head': 'error',
      },
    },
  ]
}
