import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import { all, next, react } from './configs'

interface CustomConfig { all?: boolean, next?: boolean }

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

  if (options.next ?? false)
    configs.push(next())

  return antfu(
    options,
    ...configs,
    ...userConfigs,
  )
}
