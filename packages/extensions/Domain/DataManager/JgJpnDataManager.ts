import * as _ from 'lodash'
import {DataManager} from '@mm0202/data-manager'
import {
  Field,
  FieldOfCumulative,
  FieldOfDate,
  FieldOfDateForCumulative
} from '@/packages/extensions/Domain/DataManager/_JgJpnDataManager'
// import JgJpnJson from '@/packages/extensions/Domain/RemoteFile/JgJpnJson'
import data from '@/static/data/jg-jpn.json'

export interface HeaderForTableData {
  value: Field
  text?: any
  align?: any
  formatType?: any | 'date' | 'age'
  primary?: any
}

export default class JgJpnDataManager extends DataManager {
  constructor() {
    // const jgJpnJson = new JgJpnJson()
    super(data)
    // super(data || jgJpnJson.getFromCache().response.data)
  }

  filter(key: Field, value: string): JgJpnDataManager {
    super.filter(key, value)
    return this
  }

  filterByArray(key: Field, values: string[]): JgJpnDataManager {
    super.filterByArray(key, values)
    return this
  }

  getFieldValueCandidates(field: Field): string[] {
    return super.getFieldValueCandidates(field)
  }

  countFieldValues(field: Field): Object {
    return super.countFieldValues(field)
  }

  getHistory(field: Field): any[] {
    return this.data.filter((datum: any) => datum[field])
  }

  getRecent(field: Field) {
    const recent = this.getHistory(field).pop()
    if (!recent) {
      return null
    }

    return recent[field]
  }

  createBoxDataOfStatus() {
    const total = parseInt(this.getRecent('累計'))
    const discharge = parseInt(this.getRecent('退院数累計'))
    const dead = parseInt(this.getRecent('死者合計'))
    const pcrTotal = parseInt(this.getRecent('PCR検査実施人数'))
    return {
      'PCR検査実施(累計)': pcrTotal,
      '感染者数(累計)': {
        退院: discharge,
        死亡: dead,
        その他: total - dead - discharge
      }
    }
  }

  createBoxDataOfTheDayBeforeRatio() {
    const pcrToday = parseInt(this.getRecent('PCR検査前日比'))
    return {
      PCR検査前日比: pcrToday,
      感染者数: parseInt(this.getRecent('前日比')),
      退院数: parseInt(this.getRecent('退院数'))
    }
  }

  createBoxDataOfOthers() {
    return {
      発症数: parseInt(this.getRecent('発症数')),
      人数: parseInt(this.getRecent('人数'))
    }
  }

  createTableData(headers: HeaderForTableData[]) {
    const primary: HeaderForTableData | undefined = _.find(headers, {
      primary: true
    })
    if (!primary) {
      return []
    }

    return _.map(this.getHistory(primary.value), datum => {
      const newDatum: any = {}
      _.forEach(headers, header => {
        const targetValue = datum[header.value]

        if (header.formatType === 'date') {
          newDatum[header.value] = this.getDate(targetValue)
          return
        }

        if (header.formatType === 'age') {
          if (/^\d+$/.test(targetValue)) {
            newDatum[header.value] = targetValue + '代'
            return
          }
          if (targetValue === '0-10') {
            newDatum[header.value] = '10歳未満'
            return
          }
        }

        newDatum[header.value] = targetValue
      })

      return newDatum
    }).reverse()
  }

  createGraphData(fieldOfDate: FieldOfDate = '確定日'): any[] {
    const data = this.getHistory(fieldOfDate)
    const reducedData: any = {}
    _.forEach(data, (datum: any) => {
      reducedData[datum[fieldOfDate]] =
        (reducedData[datum[fieldOfDate]] || 0) + 1
    })

    return _.map(reducedData, (value, key) => {
      return {
        小計: value,
        日付: new Date(key).toISOString()
      }
    })
  }

  createGraphDataByCumulative(
    fieldOfCumulative: FieldOfCumulative,
    fieldOfDate: FieldOfDateForCumulative = '確定日'
  ): any[] {
    let previousCumulative = 0
    return _.map(this.getHistory(fieldOfCumulative), datum => {
      const cumulative = parseInt(datum[fieldOfCumulative])
      const subtotal = cumulative - previousCumulative
      previousCumulative = cumulative
      return {
        小計: subtotal,
        日付: new Date(datum[fieldOfDate]).toISOString()
      }
    })
  }

  private getDate(dateString: string) {
    const zeroPad = (num: number, length: number) =>
      (Array(length).join('0') + num).slice(-length)

    const date = new Date(dateString)
    return zeroPad(date.getMonth() + 1, 2) + '/' + zeroPad(date.getDate(), 2)
  }
}
