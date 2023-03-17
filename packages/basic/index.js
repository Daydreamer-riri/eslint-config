// @ts-check
const { isPackageExists } = require('local-pkg')

const isTS = isPackageExists('typescript')
const isReact = isPackageExists('react')

if (!isTS)
  console.warn('[@riri/eslint-confit] Typescript is not install, fallback to JS only.')

/** @type {import('./node_modules/eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    isTS ? '@riri/eslint-config-ts' : '@riri/eslint-config-js',
    ...(isReact ? ['@riri/eslint-config-react'] : []),
  ],
}
