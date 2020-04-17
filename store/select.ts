// import * as _ from 'lodash'

export const state = () => ({
  selects: {}
})

export const mutations = {
  updateSelects(
    state: any,
    { field, selects }: { field: string; selects: [] }
  ) {
    // const selectsClone = _.cloneDeep(state.selects)
    // selectsClone[field] = selects
    // state.selects = selectsClone
    state.selects[field] = selects
  }
}
