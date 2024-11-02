import Alert from '@components/Alert.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { children?: Record<string, any>; severity?: string; className?: string }
let alert: string

beforeAll(async () => {
  alert = await render({ children: { default: 'test message' } })
})

const render = async ({ children, severity, className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(Alert, {
    slots: children,
    props: {
      severity: severity,
      class: className,
    },
  })
}
test('that it contains alert role', async () => {
  expect(alert).toContain('role="alert"')
})

test('that default severity contains the success icon and is green', async () => {
  expect(alert).toContain('mdi:success-circle-outline')
  expect(alert).toContain('bg-green-100')
  expect(alert).toContain('text-green-600')
})

test('that error severity contains the error icon and is red', async () => {
  const result = await render({ severity: 'error' })
  expect(result).toContain('mdi:error-outline')
  expect(result).toContain('bg-red-100')
  expect(result).toContain('text-red-600')
})

test('that warning severity contains the warning icon and is orange', async () => {
  const result = await render({ severity: 'warning' })
  expect(result).toContain('mdi:warning-outline')
  expect(result).toContain('bg-orange-100')
  expect(result).toContain('text-orange-600')
})

test('that info severity contains the info icon and is blue', async () => {
  const result = await render({ severity: 'info' })
  expect(result).toContain('mdi:information-outline')
  expect(result).toContain('bg-blue-100')
  expect(result).toContain('text-blue-600')
})

test('that success severity contains the success icon and is green', async () => {
  const result = await render({ severity: 'success' })
  expect(result).toContain('mdi:success-circle-outline')
  expect(result).toContain('bg-green-100')
  expect(result).toContain('text-green-600')
})

test('that invalid severity throws an error', async () => {
  await expect(render({ severity: 'invalid' })).rejects.toThrowError(
    /Invalid severity value: "invalid"/
  )
})

test('that it contains the children', async () => {
  const result = await render({ children: { default: 'new test message' } })
  expect(result).toContain('new test message')
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
