import DisplayLimitAlert from '@components/DisplayLimitAlert.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { total?: number; className?: string }
let alert: string

beforeAll(async () => {
  alert = await render()
})

const render = async ({ total = 15, className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(DisplayLimitAlert, {
    props: {
      displayed: 10,
      total: total,
      class: className,
    },
  })
}
test('that it contains alert role', async () => {
  expect(alert).toContain('role="alert"')
})

test('that it contains the info icon', async () => {
  expect(alert).toContain('mdi:information-outline')
})

test('that it contains the alert', async () => {
  expect(alert).toContain('Maximum number of articles displayed, 5 remaining.')
})

test('that it does not show when displayed is more than total', async () => {
  const result = await render({ total: 10 })
  expect(result).not.toContain('Maximum')
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
