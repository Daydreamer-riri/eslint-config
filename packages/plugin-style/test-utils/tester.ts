import type { InvalidTestCase, ValidTestCase } from '@typescript-eslint/utils/ts-eslint'
// import globals from 'globals'
import type { Rule } from 'eslint'
import tsEsLintParser from '@typescript-eslint/parser'

import { RuleTester } from '@typescript-eslint/utils/ts-eslint'
import { it } from 'vitest'

const tester = new RuleTester({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parser: tsEsLintParser,
    globals: {
      // ...globals.browser,
    },
    parserOptions: {
      // tsconfigRootDir: path.join(__dirname, '..', 'tests', 'fixtures'),
      // project: true,
      ecmaFeatures: { jsx: true },
    },
  },

  // https://github.com/typescript-eslint/typescript-eslint/issues/8211
  // TODO: remove this any once ts-eslint v7 has implemented type for the ESLint v9 FlatRuleTester
} as any)

type TestCaseGenerator<T, R = T> = (cast: (input: T) => T) => Generator<R>

interface RunOptions<TOptions extends readonly unknown[], TMessageIds extends string> {
  valid?: TestCaseGenerator<ValidTestCase<TOptions>, string | ValidTestCase<TOptions>>
  invalid?: TestCaseGenerator<InvalidTestCase<TMessageIds, TOptions>>
}

export function runTest<TOptions extends readonly unknown[], TMessageIds extends string>(
  name: string,
  rule: Rule.RuleModule,
  options: RunOptions<TOptions, TMessageIds>,
) {
  const { valid, invalid } = options
  it(name, () => {
    // @ts-expect-error - this is a hack to get around the fact that the ESLint v9 RuleTester
    tester.run(name, rule, {
      valid: Array.from(valid?.(identifier) ?? []).flat(),
      invalid: Array.from(invalid?.(identifier) ?? []).flat(),
    })
  })
}

function identifier<T>(input: T): T {
  return input
}
