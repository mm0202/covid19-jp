<template>
  <GraphCard
    title="検査実施人数"
    title-id="graph-card-of-inspection-persons"
    chart-id="chart_graph-card-of-inspection-persons"
    unit="人"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :graph-data="graphData"
    :md="md"
  >
    <template v-slot:description>
      <div>※ PCR検査実施人数</div>
      <div>※ 一部、公表データの調整による減少あり</div>
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
  data() {
    return {
      graphData: this.manager.createGraphDataByCumulative('PCR検査実施人数')
    }
  },
  computed: {
    ...mapState('data/jgJpn', ['date'])
  }
}
</script>
