import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function all(): Promise<TypedFlatConfigItem[]> {
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
        'style/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
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
        '@stylistic/indent': ['error', 2, {
          ArrayExpression: 1,
          CallExpression: {
            arguments: 1,
          },
          flatTernaryExpressions: false,
          FunctionDeclaration: {
            body: 1,
            parameters: 1,
          },
          FunctionExpression: {
            body: 1,
            parameters: 1,
          },
          ignoreComments: false,
          ignoredNodes: [
            'TemplateLiteral *',
            'TSIntersectionType',
            'TSTypeParameterInstantiation',
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true,
          outerIIFEBody: 1,
          SwitchCase: 1,
          VariableDeclarator: 1,
        }],
      },
    },
  ]
}
