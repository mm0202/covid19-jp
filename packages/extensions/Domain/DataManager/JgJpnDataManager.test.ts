import _ from 'lodash'
import JgJpnDataManager, {
  HeaderForTableData
} from '@/packages/extensions/Domain/DataManager/JgJpnDataManager'
// import jgJpnJson from '@/static/data/jg-jpn.json'

describe('JgJpnDataManagerクラスのテスト', () => {
  let dataManager: JgJpnDataManager

  beforeEach(() => {
    dataManager = new JgJpnDataManager()
    // dataManager = new JgJpnDataManager(jgJpnJson)
  })

  describe('累計データのグラフ用データの生成', () => {
    test('生成に成功', () => {
      const actualData: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )

      expect(actualData).toBeInstanceOf(Array)
      expect(actualData.length).toBe(
        _.size(
          _.uniq(_.map(dataManager.getHistory('PCR検査実施人数'), '確定日'))
        )
      )
    })

    test('フォーマットチェック', () => {
      const actualData: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )

      actualData.forEach(actualDatum => {
        const keys = Object.keys(actualDatum)
        expect(keys).toContain('小計')
        const subtotal = actualDatum.小計
        expect(typeof subtotal).toBe('number')
        expect(subtotal).toBeLessThan(64387)

        expect(keys).toContain('日付')
        const date = actualDatum.日付
        expect(typeof date).toBe('string')
        expect(date).toMatch(
          /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(?:(2[0-3])|([0-1][0-9])):([0-5][0-9]):([0-5][0-9])\.000Z$/
        )
      })
    })

    test('フィルタに成功', () => {
      const actualData: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )

      dataManager.filter('性別', '男性')
      const actualData2: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )
      expect(actualData2.length).toBeLessThan(actualData.length)
    })

    test('日付キーの指定チェック', () => {
      const actualData: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )

      const actualData2: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日YYYYMMDD'
      )
      expect(actualData2.length).toBe(actualData.length)
    })

    test('累計キーの違いで結果が異なる', () => {
      const actualData: any[] = dataManager.createGraphDataByCumulative(
        'PCR検査実施人数',
        '確定日'
      )

      const actualData2: any[] = dataManager.createGraphDataByCumulative(
        '退院数累計',
        '確定日'
      )
      expect(actualData2.length).not.toBe(actualData.length)
    })
  })

  describe('テーブル用データの生成', () => {
    const headers: HeaderForTableData[] = [
      {value: '確定日', formatType: 'date', primary: true},
      {value: '居住都道府県'},
      {value: '居住市区町村'},
      {value: '年代', formatType: 'age'},
      {value: '性別', text: 'テスト用追加キー', align: 'テスト用追加キー'}
    ]
    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/

    test('生成に成功', () => {
      const actualData: any[] = dataManager.createTableData(headers)

      expect(actualData).toBeInstanceOf(Array)
      expect(actualData.length).toBeGreaterThan(_.size(dataManager.get()) * 0.5)
    })

    test('フォーマットチェック', () => {
      const actualData: any[] = dataManager.createTableData(headers)

      actualData.forEach(actualDatum => {
        expect(_.size(actualDatum)).toBe(headers.length)

        const actualKeys = Object.keys(actualDatum)
        const expectedKeys = headers.map(header => header.value)
        actualKeys.forEach(actualKey => {
          expect(expectedKeys).toContain(actualKey)
        })

        expect(actualDatum.確定日).toMatch(dateFormat)
        expect(typeof actualDatum.居住都道府県).toBe('string')
        expect(typeof actualDatum.居住市区町村).toBe('string')
        expect([
          '10歳未満',
          '10代',
          '20代',
          '30代',
          '40代',
          '50代',
          '60代',
          '70代',
          '80代',
          '90代',
          '100代',
          '不明'
        ]).toContain(actualDatum.年代)
        expect(['男性', '女性', '不明']).toContain(actualDatum.性別)
      })
    })

    test('フィルタに成功', () => {
      const actualData: any[] = dataManager.createTableData(headers)

      dataManager.filter('性別', '男性')
      const actualData2: any[] = dataManager.createTableData(headers)
      expect(actualData2.length).toBeLessThan(actualData.length)
      actualData2.forEach(actualDatum => {
        expect(actualDatum.性別).toContain('男性')
      })
    })

    test('primaryキーチェック', () => {
      const actualData: any[] = dataManager.createTableData(headers)

      headers[0].value = '確定日YYYYMMDD'
      const actualData2: any[] = dataManager.createTableData(headers)
      expect(actualData2.length).toBe(actualData.length)

      headers[0].value = '発症日'
      const actualData3: any[] = dataManager.createTableData(headers)
      expect(actualData3.length).not.toBe(actualData.length)
    })
  })

  describe('グラフ用データの生成', () => {
    test('生成に成功', () => {
      const actualData: any[] = dataManager.createGraphData('確定日')

      expect(actualData).toBeInstanceOf(Array)
      expect(actualData.length).toBeGreaterThan(
        _.size(_.uniq(_.map(dataManager.get(), '確定日'))) * 0.9
      )
    })

    test('フォーマットチェック', () => {
      const actualData: any[] = dataManager.createGraphData('確定日')

      actualData.forEach(actualDatum => {
        const keys = Object.keys(actualDatum)
        expect(keys).toContain('小計')
        const subtotal = actualDatum.小計
        expect(typeof subtotal).toBe('number')

        expect(keys).toContain('日付')
        const date = actualDatum.日付
        expect(typeof date).toBe('string')
        expect(date).toMatch(
          /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(?:(2[0-3])|([0-1][0-9])):([0-5][0-9]):([0-5][0-9])\.000Z$/
        )
      })
    })

    test('フィルタに成功', () => {
      const actualData: any[] = dataManager.createGraphData('確定日')

      dataManager.filter('性別', '男性')
      const actualData2: any[] = dataManager.createGraphData('確定日')
      expect(actualData2.length).toBeLessThan(actualData.length)
    })

    test('日付キーの指定チェック', () => {
      const actualData: any[] = dataManager.createGraphData('確定日')

      const actualData2: any[] = dataManager.createGraphData('確定日YYYYMMDD')
      expect(actualData2.length).toBe(actualData.length)

      const actualData3: any[] = dataManager.createGraphData('発症日')
      expect(actualData3.length).not.toBe(actualData.length)
    })
  })
})
