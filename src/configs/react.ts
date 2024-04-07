import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_JSX, GLOB_TSX } from '@antfu/eslint-config'

export async function react(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      name: 'ririd:react',
      rules: {
        'react/prop-types': 'warn',
        'react/jsx-no-leaked-render': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
        'react/no-unknown-property': 'off',
        'react/display-name': 'off',
        'react-refresh/only-export-components': 'off',
      },
    },
  ]
}
