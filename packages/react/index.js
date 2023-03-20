/** @type {import('./node_modules/eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: '17.0',
    },
  },
  rules: {
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
    'react/prop-types': 'warn',
    'react/jsx-equals-spacing': 2,
    'react/jsx-indent':
      [2, 2,
        {
          checkAttributes: true, indentLogicalExpressions: true,
        },
      ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-curly-newline': 2,
    'react/jsx-curly-spacing': [2, { when: 'never' }],
    'react/jsx-first-prop-new-line': 2,
    // 'react/jsx-space-before-closing': 2,
    'react/jsx-tag-spacing': [1, {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'proportional-always',
    }],
    'react/jsx-wrap-multilines': [2, {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
    }],

    // off
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
}
