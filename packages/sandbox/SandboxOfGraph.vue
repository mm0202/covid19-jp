<template>
  <GraphCard
    title="退院者数"
    title-id="graph-card-of-discharge"
    chart-id="chart_graph-card-of-discharge"
    unit="人"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :graph-data="graphData"
  >
    <!--        <template v-slot:description>-->
    <!--        </template>-->
  </GraphCard>
</template>

<script lang="ts">
import JgJpnDataManager from '@/packages/extensions/Domain/DataManager/JgJpnDataManager'
import GraphCard from '@/packages/components/Organisms/Cards/Graph/GraphCard.vue'

export default {
  components: { GraphCard },
  data() {
    const dataManager = new JgJpnDataManager()
    const graphData = dataManager.createGraphDataByCumulative('退院数累計')

    return {
      graphData
    }
  }
}
</script>
