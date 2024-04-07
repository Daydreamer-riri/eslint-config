import { GLOB_MARKDOWN_CODE } from '@antfu/eslint-config'
import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function markdown(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ririd:markdown',
      files: [GLOB_MARKDOWN_CODE],
      rules: {
        'import/no-unresolved': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'antfu/no-cjs-exports': 'off',
        'antfu/no-ts-export-equal': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-var-requires': 'off',
        'ts/consistent-type-imports': 'off',
      },
    },
  ]
}
