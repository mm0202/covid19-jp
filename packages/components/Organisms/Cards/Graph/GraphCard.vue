<template>
  <v-col cols="12" :md="md" class="DataCard">
    <time-bar-chart
      :title="title"
      :title-id="titleId"
      :chart-id="chartId"
      :chart-data="chartData"
      :date="date"
      :unit="unit"
      :url="url"
    >
      <template v-slot:description>
        <slot name="description" />
      </template>
    </time-bar-chart>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '~/components/TimeBarChart.vue'

export default Vue.extend({
  components: { TimeBarChart },
  props: {
    graphData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    chartId: {
      type: String,
      default: 'time-bar-chart'
    },
    unit: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    md: {
      type: Number,
      default: 6
    }
  },
  computed: {
    ...mapState('data/jgJpn', ['date']),
    chartData() {
      const graphData: any = this.graphData
      return formatGraph(graphData)
    }
  }
})
</script>

<style lang="scss" scoped>
.DataCard {
  width: 0;
}
</style>
