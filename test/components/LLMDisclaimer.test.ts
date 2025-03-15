import LLMDisclaimer from '@components/LLMDisclaimer.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'

describe('llmDisclaimer', () => {
  type RenderOptions = { className?: string }
  let disclaimer: string

  beforeAll(async () => {
    disclaimer = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(LLMDisclaimer, {
      props: {
        class: className,
      },
    })
  }

  test('that it contains a disclaimer class', async () => {
    expect(disclaimer).toContain('disclaimer')
  })

  test('that info severity is used', async () => {
    expect(disclaimer).toContain('mdi:information-outline')
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
