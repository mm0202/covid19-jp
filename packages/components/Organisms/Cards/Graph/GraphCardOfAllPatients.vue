<template>
  <GraphCard
    title="陽性患者数"
    title-id="graph-card-of-all-patients"
    chart-id="chart_graph-card-of-all-patients"
    unit="人"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :graph-data="graphData"
    :md="md"
  >
    <template v-slot:description>
      ※ PCR検査陽性者
    </template>
  </GraphCard>
</template>

<script>
import { mapState } from 'vuex'
import GraphCard from '@/packages/components/Organisms/Cards/Graph/GraphCard.vue'
import JgJpnDataManager from '~/packages/extensions/Domain/DataManager/JgJpnDataManager'

export default {
  components: { GraphCard },
  props: {
    manager: {
      type: JgJpnDataManager,
      required: true
    },
    md: {
      type: Number,
      default: 6
    }
  },
  computed: {
    ...mapState('data/jgJpn', ['date']),
    graphData() {
      return this.manager.createGraphData()
    }
  }
}
</script>
