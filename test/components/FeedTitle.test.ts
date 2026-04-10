import FeedTitle from '@components/FeedTitle.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'

describe('feedTitle', () => {
  let title: string

  beforeAll(async () => {
    title = await render()
  })

  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(FeedTitle, {
      props: {
        title: 'Title',
        description: 'Description',
      },
    })
  }

  test('that it contains correct tags', async () => {
    expect(title).toContain('<h2')
    expect(title).toContain('<p')
  })

  test('that it contains the title', async () => {
    expect(title).toContain('>Title</h2>')
  })

  test('that it contains the description', async () => {
    expect(title).toContain('>Description</p>')
  })

  test('that it does not include article title presentation classes', async () => {
    expect(title).not.toContain('text-5xl')
    expect(title).not.toContain('text-lg')
    expect(title).not.toContain('leading-snug')
    expect(title).not.toContain('leading-tight')
  })
})
