import CacheForPage from './CacheForPage'

describe('Cacheクラスのテスト', () => {
  const key1 = 'test1'
  const key2 = 'test2'
  const data1 = 'data1'
  const data2 = { title: 'data2' }

  beforeEach(() => {
    // キャッシュの初期化
    CacheForPage.list = {}
  })

  test('データ追加に成功', () => {
    CacheForPage.add(key1, data1)
    expect(CacheForPage.size()).toBe(1)

    CacheForPage.add(key2, data2)
    expect(CacheForPage.size()).toBe(2)
  })

  describe('初期データ付きテスト', () => {
    beforeEach(() => {
      CacheForPage.add(key1, data1)
      CacheForPage.add(key2, data2)
    })
    test('データリセットに成功', () => {
      CacheForPage.reset()
      expect(CacheForPage.size()).toBe(0)
    })

    test('データ取得に成功', () => {
      expect(CacheForPage.get(key1)).toEqual(data1)
      expect(CacheForPage.get(key2)).toEqual(data2)
    })
  })
})
