import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import * as _ from 'lodash'
import './CountBox.scss'

const Props = Vue.extend()

@Component({
  props: {
    countData: {
      type: Object,
      required: true
    }
  }
})
export default class CountBox extends Props {
  private countData: any

  render(): VNode {
    return (
      <ul class={'container'}>{this.createCountBoxes(this.countData, true)}</ul>
    )
  }

  private createCountBoxes(countData: Object | number, isRoot?: boolean): any {
    if (_.isNumber(countData)) {
      return
    }

    const childCount = this.countChildren(countData)
    let index = 0
    return _.map(countData, (value, key): VNode | VNode[] => {
      const box = this.createBox(childCount, index, key, value, isRoot)
      index++
      return box
    })
  }

  private createBox(
    parentChildCount: number,
    index: number,
    key: string,
    value?: Object,
    isRoot?: Boolean
  ) {
    const hasChildren = _.isObject(value) && _.size(value) > 0
    const familyCount = this.countChildren(value) + 1

    return (
      <li
        class={[
          'box',
          `pcc${parentChildCount}`,
          `fc${familyCount}`,
          hasChildren && 'parent',
          isRoot ? 'root' : 'nonroot',
          `child${index}`
        ]}
      >
        <div class={'pillar'}>
          <div class={'content'}>
            <span>{key}</span>
            <span>
              <strong>{this.countValues(value)}</strong>
              <span class="unit">人</span>
            </span>
          </div>
        </div>
        {_.isObject(value) && (
          <ul class={'group'}>{this.createCountBoxes(value)}</ul>
        )}
      </li>
    )
  }

  private countValues(countData: any): any {
    let total = 0
    const count = (countData: any): any => {
      if (_.isNumber(countData)) {
        return (total = total + countData)
      }

      _.forEach(countData, childData => count(childData))
      return total
    }

    return count(countData)
  }

  private countChildren(countData: any): any {
    let total = 0
    const count = (countData: any): any => {
      _.forEach(countData, childData => count(childData))
      return total++
    }

    return count(countData)
  }
}
