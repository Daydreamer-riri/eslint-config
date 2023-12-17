import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import { all, react } from './configs'
import { combine } from './utils'

interface CustomConfig { all?: boolean }

/**
 * 构建一个 ESLint 平面配置项数组。
 */
export async function ririd(
  options: OptionsConfig & CustomConfig & FlatConfigItem = {},
  ...userConfigs: (UserConfigItem | UserConfigItem[])[]
): Promise<UserConfigItem[]> {
  const configs: Awaitable<FlatConfigItem[]>[] = []

  options = {
    ...options,
    react: options.react ?? true,
    vue: options.vue ?? false,
  }

  if (options.react ?? true)
    configs.push(react())

  if (options.all ?? true)
    configs.push(all())

  const merged = combine(
    ...(await antfu(options)),
    ...configs,
    ...userConfigs,
  )

  return merged
}
