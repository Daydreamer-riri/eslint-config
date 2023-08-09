# eslint-config
Riri's ESLint config presets

## Feature

- Based [standard](https://github.com/standard/eslint-config-standard), single quotes, no semi
- Auto fix for formatting
- Designed to work with TypeScript, **React** out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas

## Usage

### Install

```bash
pnpm add -D eslint @ririd/eslint-config
```

### Config

```json
// .eslintrc
{
  "extends": "@ririd"
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "markdown",
    "css",
    "json"
    // ...
  ]
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env. 

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@ririd',
}
```

## Other config

### about `semi`

standard style default no semicolon, if you need a semicolon can define the rules as follows

```js
module.exports = {
  rules: {
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi', requireLast: ture } }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
  }
}
```

### about `brace-style`

```js
module.exports = {
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: true }]
  }
}
```

## Thanks 

This project is heavily based on [antfu](https://github.com/antfu/)'s template, with a certain degree of customization and more rules regarding React.