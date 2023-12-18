import type { FlatConfigItem } from '@antfu/eslint-config'

export async function all(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'ririd:all',
      rules: {
        'antfu/no-cjs-exports': 'off',

        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'no-restricted-globals': 'off',

        'node/prefer-global/process': 'off',

        'jsonc/comma-dangle': 'off',
        'style/jsx-quotes': ['error', 'prefer-double'],
        'style/jsx-one-expression-per-line': 'off',
        'style/arrow-parens': ['error', 'as-needed'],

        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
  ]
}
