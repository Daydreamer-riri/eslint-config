import type { FlatConfigItem } from '@antfu/eslint-config'
import { GLOB_JSX, GLOB_TSX } from '@antfu/eslint-config'

export async function react(): Promise<FlatConfigItem[]> {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      name: 'ririd:react',
      rules: {
        'react/prop-types': 'warn',
        'react/jsx-no-leaked-render': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
      },
    },
  ]
}
