<template>
  <div>
    <AutoCompleteSelectWithVuexStore
      v-for="filter in filters"
      :key="filter.field"
      :options="filter.options"
      :field="filter.field"
      :title="filter.field"
    />
    <div />
    <div class="notation">※ フィルタは複数選択、項目の検索が可能です。</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import _ from 'lodash'
import {
  ages,
  genders,
  prefectures
} from '../components/Organisms/FilterBlock/options'
import AutoCompleteSelectWithVuexStore from '~/packages/extensions/UI/Molecules/AutoCompleteSelect/AutoCompleteSelectWithVuexStore'

export default {
  components: { AutoCompleteSelectWithVuexStore },
  data() {
    return {
      filters: [
        { options: prefectures, field: '居住都道府県' },
        { options: genders, field: '性別' },
        { options: ages, field: '年代' }
      ]
    }
  },
  computed: {
    ...mapState('select', ['selects'])
  },
  watch: {
    selects(val) {
      const initialTime = performance.now()
      const _selects = _.cloneDeep(val)
      const manager = _.cloneDeep(this.$store.state.data.jgJpn.manager)
      manager.reset()
      console.log(performance.now() - initialTime)
      if (!_selects || _selects.length === 0) {
        this.setDataManager(manager)
        return
      }
      console.log(performance.now() - initialTime)

      _.forEach(_selects, (select, key) => {
        if (select.length === 0) {
          return
        }
        manager.filterByArray(key, select)
      })
      console.log(performance.now() - initialTime)
      this.setDataManager(manager)

      console.log(performance.now() - initialTime)
    }
  },
  methods: {
    ...mapMutations('data/jgJpn', ['setDataManager'])
  }
}
</script>

<style type="scss">
.notation {
  color: gray;
}
</style>
