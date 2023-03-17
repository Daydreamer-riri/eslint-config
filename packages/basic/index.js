// @ts-check
const { isPackageExists } = require('local-pkg')

const isTS = isPackageExists('typescript')
const isReact = isPackageExists('react')

if (!isTS)
  console.warn('[@ririd/eslint-confit] Typescript is not install, fallback to JS only.')

/** @type {import('./node_modules/eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    isTS ? '@ririd/eslint-config-ts' : '@ririd/eslint-config-js',
    ...(isReact ? ['@ririd/eslint-config-react'] : []),
  ],
}
