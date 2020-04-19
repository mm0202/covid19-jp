import _ from 'lodash'
import Utils from '~/packages/utils/Utils'
import JgJpnDataManager from '~/packages/extensions/Domain/DataManager/JgJpnDataManager'
import JgJpnJson from '~/packages/extensions/Domain/RemoteFile/JgJpnJson'

export type JgJpnState = {
  manager: JgJpnDataManager | {}
  loaded: boolean
  date: string
  count: number
  isFiltered: boolean
}

export const state = (): JgJpnState => ({
  manager: {},
  loaded: false,
  date: '',
  count: 0,
  isFiltered: false
})

export const mutations = {
  setLoaded(state: JgJpnState, loaded: boolean) {
    state.loaded = loaded
  },
  setDataManager(state: JgJpnState, dataManager: JgJpnDataManager) {
    state.manager = _.cloneDeep(dataManager)
    state.date = Utils.getFormattedDate(dataManager.getRecent('確定日'))
    state.count = dataManager.count()
    state.isFiltered = dataManager.isFiltered()
  }
}

export const actions = {
  async LOAD_DATA({ commit }: any) {
    const jgJpnJson = new JgJpnJson()
    const result = await jgJpnJson.get()
    const jgJpnDataManager = new JgJpnDataManager(result.response.data)
    commit('setDataManager', jgJpnDataManager)

    commit('setLoaded', true)
  }
}
