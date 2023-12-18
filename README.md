# @ririd/eslint-config

[![npm](https://img.shields.io/npm/v/@ririd/eslint-config?color=444&label=)](https://npmjs.com/package/@ririd/eslint-config)

Riri's ESLint config presets

> [!IMPORTANT]
> This project is heavily based on [antfu/eslint-config](https://github.com/antfu/eslint-config), with a certain degree of customization ~~and more rules regarding React~~.
>
> Since v1.0.0, this config is rewritten to the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Usage

### Install

```bash
pnpm i -D eslint @ririd/eslint-config
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import ririd from '@ririd/eslint-config'

export default ririd()
```

With CJS:

```js
// eslint.config.js
const ririd = require('@ririd/eslint-config').default

module.exports = ririd()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml"
  ]
}
```

## Customization

Normally you only need to import the `ririd` preset:

```js
// eslint.config.js
import ririd from '@ririd/eslint-config'

export default ririd()
```

Or you can configure each integration individually, for example:

```js
// eslint.config.js
import ririd from '@ririd/eslint-config'

export default ririd({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // enable nextjs-plugin
  next: true,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

For more advanced usage, see [@antfu/eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file#antfueslint-config).

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Riri](https://github.com/daydreamer-riri)
