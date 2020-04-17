<template>
  <v-container>
    <v-row>
      <v-col
        v-for="filter in filters"
        :key="filter.field"
        cols="12"
        md="12"
        class="select"
      >
        <AutoCompleteSelectWithVuexStore
          :options="filter.options"
          :field="filter.field"
          :title="filter.field"
        />
      </v-col>
      <v-col class="notation">
        ※ フィルタは複数選択、項目の検索が可能です。
      </v-col>
      <v-col class="start-button">
        <v-btn
          class="ma-2"
          outlined
          :loading="loading"
          :disabled="loading"
          color="secondary"
          @click="filtering"
        >
          絞り込み
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon> fa-sync-alt </v-icon>
            </span>
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import _ from 'lodash'
import { ages, genders, prefectures } from './options'
import AutoCompleteSelectWithVuexStore from '~/packages/extensions/UI/Molecules/AutoCompleteSelect/AutoCompleteSelectWithVuexStore'

export default {
  components: { AutoCompleteSelectWithVuexStore },
  data() {
    return {
      loading: false,
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
  methods: {
    ...mapMutations('data/jgJpn', ['setDataManager']),
    filtering() {
      this.loading = true

      setTimeout(() => {
        const _selects = _.cloneDeep(this.selects)
        const manager = _.cloneDeep(this.$store.state.data.jgJpn.manager)
        manager.reset()
        if (!_selects || _selects.length === 0) {
          this.setDataManager(manager)
          return
        }

        _.forEach(_selects, (select, key) => {
          if (select.length === 0) {
            return
          }
          manager.filterByArray(key, select)
        })
        this.setDataManager(manager)

        this.loading = false
      }, 300)
    }
  }
}
</script>

<style type="scss">
.notation {
  color: gray;
}

.start-button {
  text-align: right;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.select {
  padding-bottom: 0;
  padding-top: 0;
  margin-bottom: -1rem;
}
</style>
