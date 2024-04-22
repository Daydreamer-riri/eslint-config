import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_JSX, GLOB_TSX } from '@antfu/eslint-config'

export async function react(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      name: 'ririd:react',
      rules: {
        'react-refresh/only-export-components': 'off',
        'react/no-clone-element': 'off',
        'react/no-missing-component-display-name': 'off',
      },
    },
  ]
}
