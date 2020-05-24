<template>
  <v-col cols="12" :md="md" class="DataCard">
    <DataTableCustom
      title="陽性患者の属性"
      title-id="positive-cases-attributes"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="date"
      :info="sumInfoOfPatients"
      url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    />
  </v-col>
</template>

<script>
import { mapState } from 'vuex'
import formatGraph from '~/utils/formatGraph'
import DataTableCustom from '~/packages/components/Organisms/DataTableCustom'
import JgJpnDataManager from '~/packages/extensions/Domain/DataManager/JgJpnDataManager'

export default {
  components: { DataTableCustom },
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
    patientsTable() {
      const headers = [
        { text: '確定日', value: '確定日', formatType: 'date', primary: true },
        { text: '居住都道府県', value: '居住都道府県' },
        // { text: '居住市区町村', value: '居住市区町村' },
        { text: '年代', value: '年代', formatType: 'age' },
        { text: '性別', value: '性別' }
      ]

      let datasets = this.manager.createTableData(headers)
      if (process.env.NODE_ENV !== 'production') {
        datasets = datasets.slice(0, 10)
      }

      return { datasets, headers }
    },
    sumInfoOfPatients() {
      const patientsGraph = formatGraph(this.manager.createGraphData())
      return {
        lText: patientsGraph[
          patientsGraph.length - 1
        ].cumulative.toLocaleString(),
        sText: '{date}までの累計'.replace(
          '{date}',
          patientsGraph[patientsGraph.length - 1].label
        ),
        unit: this.$t('人')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.DataCard {
  box-sizing: border-box;
}
</style>
