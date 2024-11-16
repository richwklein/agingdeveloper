import { buildUrl, calculateWeight, capitalize, intersection } from '@utils/misc'
import { describe, expect, test } from 'vitest'

describe('calculateWeight', () => {
  test('that lower bound produces 300', () => {
    expect(calculateWeight(1, 5)).toEqual(300)
  })

  test('that upper bound produces 900', () => {
    expect(calculateWeight(5, 5)).toEqual(900)
  })

  test('that numbers are rounded', () => {
    expect(calculateWeight(2, 7)).toEqual(400)
    expect(calculateWeight(2, 6)).toEqual(500)
    expect(calculateWeight(3, 5)).toEqual(600)
    expect(calculateWeight(3, 4)).toEqual(700)
    expect(calculateWeight(4, 5)).toEqual(800)
  })

  test('that a zero value throws', () => {
    expect(() => calculateWeight(0, 5)).toThrowError(/Invalid value/)
  })

  test('that a negative value throws', () => {
    expect(() => calculateWeight(-1, 5)).toThrowError(/Invalid value/)
  })

  test('that a zero total throws', () => {
    expect(() => calculateWeight(5, 0)).toThrowError(/Invalid total/)
  })

  test('that a negative total throws', () => {
    expect(() => calculateWeight(1, -1)).toThrowError(/Invalid total/)
  })
})

describe('capitalize', () => {
  test('that already capitalized works', () => {
    expect(capitalize('First Date Wins')).toEqual('First Date Wins')
  })

  test('that it capitalizes multiple words', () => {
    expect(capitalize('first Date wins')).toEqual('First Date Wins')
  })

  test('empty string does not throw', () => {
    expect(capitalize('')).toEqual('')
    expect(capitalize(' ')).toEqual(' ')
  })
})

describe('intersection', () => {
  test('that only matching items are returned', () => {
    const list1: string[] = ['apple', 'banana', 'cherry']
    const list2: string[] = ['oranges', 'apple', 'strawberries']

    expect(intersection(list1, list2)).toEqual(new Set<string>(['apple']))
  })

  test('that an empty set is returned when nothing matches', () => {
    const list1: string[] = ['apple', 'banana', 'cherry']
    const list2: string[] = ['oranges', 'strawberries']

    expect(intersection(list1, list2)).toEqual(new Set<string>())
  })

  test('empty arrays do not throw', () => {
    expect(intersection([], [])).toEqual(new Set<string>())
  })
})

describe('buildUrl', () => {
  const path: string = '/article/2024-11-11-article'
  const origin: string = 'http://localhost:4321'
  const full: string = origin + path

  test('that it throws on an empty origin', () => {
    expect(() => buildUrl(path, '')).toThrowError(/Invalid URL/)
  })

  test('that it can handle a string origin', () => {
    expect(buildUrl(path, origin).href).toEqual(full)
  })

  test('that it can handle a url origin', () => {
    expect(buildUrl(path, new URL(origin)).href).toEqual(full)
  })

  test('that it can handle an empty path', () => {
    expect(buildUrl('', origin).href).toEqual(origin + '/')
  })
})
