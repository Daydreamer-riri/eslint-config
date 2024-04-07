import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { all, markdown, next, react } from './configs'

interface CustomConfig { all?: boolean, next?: boolean }

type UserConfigItem = Parameters<typeof antfu>[1]
type Configs = ReturnType<typeof antfu>
/**
 * 构建一个 ESLint 平面配置项数组。
 */
export function ririd(
  options: OptionsConfig & CustomConfig & TypedFlatConfigItem = {},
  ...userConfigs: UserConfigItem[]
): Configs {
  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  options = {
    ...options,
    react: options.react ?? true,
    vue: options.vue ?? false,
  }

  if (options.react ?? true)
    configs.push(react())

  if (options.all ?? true)
    configs.push(all())

  if (options.next ?? false)
    configs.push(next())

  if (options.markdown ?? true)
    configs.push(markdown())

  return antfu(
    options,
    ...configs,
    ...userConfigs,
  )
}
