<template>
  <GraphCard
    title="退院者数"
    title-id="graph-card-of-discharge"
    chart-id="chart_graph-card-of-discharge"
    unit="人"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :graph-data="graphData"
    :md="md"
  >
    <!--        <template v-slot:description>-->
    <!--        </template>-->
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
      graphData: this.manager.createGraphDataByCumulative('退院数累計')
    }
  },
  computed: {
    ...mapState('data/jgJpn', ['date'])
  }
}
</script>
