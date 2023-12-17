import type { Awaitable, UserConfigItem } from '@antfu/eslint-config'

export async function combine(...configs: Awaitable<UserConfigItem | UserConfigItem[]>[]): Promise<UserConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
