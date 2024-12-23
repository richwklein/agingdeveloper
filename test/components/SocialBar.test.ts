import SocialBar from '@components/SocialBar.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'

describe('socialBar', () => {
  type RenderOptions = { className?: string }

  const socials = [
    { name: 'Twitter', url: 'https://twitter.com/faker' },
    { name: 'Facebook', url: 'https://www.facebook.com/faker' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/faker/' },
  ]
  let socialBar: string

  beforeAll(async () => {
    socialBar = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(SocialBar, {
      props: {
        socials: socials,
        class: className,
      },
    })
  }

  test('that social bar renders with nav and ol', async () => {
    expect(socialBar).toContain('<nav')
    expect(socialBar).toContain('<ol')
  })

  test('that it contains the links', async () => {
    socials.forEach((social) => {
      expect(socialBar).toContain(
        `<a data-link="external" target="_blank" rel="noopener noreferrer" href="${social.url}"`
      )
    })
  })

  test('that it contains titles for each social', async () => {
    socials.forEach((social) => {
      expect(socialBar).toContain(`title="${social.name}"`)
    })
  })

  test('that it contains an icon for each social', async () => {
    socials.forEach((social) => {
      expect(socialBar).toContain(
        `<svg width="1em" height="1em" class="h-6 w-6 text-primary-main" data-icon="mdi:${social.name.toLowerCase()}"`
      )
    })
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
