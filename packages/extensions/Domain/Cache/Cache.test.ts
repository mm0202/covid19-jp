import Cache from './Cache'

describe('Cacheクラスのテスト', () => {
  const key1 = 'test1'
  const key2 = 'test2'
  const data1 = 'data1'
  const data2 = { title: 'data2' }

  beforeEach(() => {
    // キャッシュの初期化
    Cache.list = {}
  })

  test('データ追加に成功', () => {
    Cache.add(key1, data1)
    expect(Cache.size()).toBe(1)

    Cache.add(key2, data2)
    expect(Cache.size()).toBe(2)
  })

  describe('初期データ付きテスト', () => {
    beforeEach(() => {
      Cache.add(key1, data1)
      Cache.add(key2, data2)
    })
    test('データリセットに成功', () => {
      Cache.reset()
      expect(Cache.size()).toBe(0)
    })

    test('データ取得に成功', () => {
      expect(Cache.get(key1)).toEqual(data1)
      expect(Cache.get(key2)).toEqual(data2)
    })
  })
})
