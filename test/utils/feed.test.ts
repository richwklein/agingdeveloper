import { feedInfo } from '@utils/feed'
import { describe, expect, test } from 'vitest'

describe('getFeed', () => {
  test.todo('implement tests for this getFeed function')
})

describe('feedInfo', () => {
  test('should have required feed properties', () => {
    expect(feedInfo).toHaveLength(3)
    feedInfo.forEach((info) => {
      expect(info).toHaveProperty('id')
      expect(info).toHaveProperty('type')
      expect(info).toHaveProperty('path')
    })
  })

  test('should include rss, atom, and feed ids', () => {
    const ids = feedInfo.map((f) => f.id)
    expect(ids).toContain('rss')
    expect(ids).toContain('atom')
    expect(ids).toContain('feed')
  })
})
